import sys
from flask import make_response, jsonify, Blueprint, request

from sklearn.metrics.pairwise import cosine_similarity

from . import *
from . import constants

blueprint = Blueprint('ub_cf', __name__)


@blueprint.route("/recommend/ubcf", methods=['GET'])
def tfidf_recommendations():
    if 'Authorization' not in request.headers:
        abort(403)

    token = request.headers.get('Authorization')
    data = decode_message(token)

    if 'Error' in data:
        return make_response(jsonify({'Error': data['Error']}), 401)

    if 'role' in data:
        if data['role'] == 'server':
            return make_response(jsonify({'Error': 'Unauthorized'}), 403)

    full_df = getRateFrame()

    # zlicz wszystkie wystąpienia danej książki
    occurences = full_df.groupby('bookid')['rate'].count().to_dict()

    # utworz macierz: user:book
    r_matrix = full_df.pivot_table(
        values='rate', index='userid', columns='bookid')

    indexes = r_matrix.index
    indexes_dict = {}

    for index, value in enumerate(indexes):
        indexes_dict[value] = index

    # do obliczenia cosine_sim potrzebne sa wartosci liczbowe
    # utworz macierz która przy braku oceny wpisze "0"
    r_matrix_dummy = r_matrix.copy().fillna(0)
    cosine_sim = cosine_similarity(r_matrix_dummy, r_matrix_dummy)
    cosine_sim = pd.DataFrame(
        cosine_sim, index=r_matrix.index, columns=r_matrix.index)

    # uzyskaj predykcje i posortuje je malejąco
    predictions = get_predictions_for_all_unvoted(
        data["id"], r_matrix, cosine_sim, indexes_dict, occurences, full_df)
    predictions.sort(reverse=True)

    response = requests.get(
        "http://"+os.environ["DATASERVER_IP"] +
        ":5000/api/books/recommended/get-recommended-books",
        headers={'Authorization': constants.token,
                 'Content-Type': 'application/json'},
        json={"predictions": predictions[:30]})

    data = response.json()["data"]

    return make_response(jsonify({"data": data}), 200)


def getRateFrame():
    rates_resp = requests.get(
        "http://"+os.environ["PS_IP_ADDR"]+":5000/api/posts/server/rates",
        headers={'Authorization': constants.token,
                 'Content-Type': 'application/json'})
    data = rates_resp.json()["data"]
    full_df = pd.DataFrame.from_dict(data)
    return full_df


def cf_user_wmean(userid, bookid, r_matrix, cosine_sim, occurences):
    if bookid in r_matrix:
        if occurences[bookid] > 1:
            sim_scores = cosine_sim[userid]
            null_similarity_indexes = sim_scores[sim_scores == 0].index
            sim_scores = sim_scores[sim_scores != 0]

            m_ratings = r_matrix[bookid]
            m_ratings = m_ratings.drop(null_similarity_indexes)
            indexes = m_ratings[m_ratings.isnull()].index
            m_ratings = m_ratings.dropna()

            sim_scores = sim_scores.drop(indexes)
            if sim_scores.sum() > 0:
                wmean_rating = np.dot(sim_scores, m_ratings) / sim_scores.sum()
            else:
                wmean_rating = 3.0

        else:
            wmean_rating = 3.0

    return wmean_rating


def all_unvoted_books_for_user(userid, r_matrix, indexes_dict):
    try:
        user_matrix = r_matrix.iloc[indexes_dict[userid]]
        return np.array(user_matrix.loc[~user_matrix.isin(voting_system_ratings)].index)
    except:
        return []


def weighted_rating(book, m, avg):
    v = book['count']
    R = book['rate']
    return (v/(v+m)*R) + (m/(m+v)*avg)


def get_most_rated(full_df, occurences):
    avg_vote = full_df['rate'].mean()
    minimum_votes = np.quantile(list(occurences.values()), 0.9)
    most_rated_ids = [key for key,
                      value in occurences.items() if value >= minimum_votes]
    most_rated_df = full_df.loc[full_df['bookid'].isin(most_rated_ids)][[
        'bookid', 'rate']]
    most_rated_df_groupby = most_rated_df.groupby(['bookid']).mean()
    most_rated_df_groupby['count'] = np.nan
    most_rated_df_groupby['score'] = np.nan
    for idx in most_rated_ids:
        most_rated_df_groupby.loc[most_rated_df_groupby.index == idx, [
            'count']] = occurences[idx]
    most_rated_df_groupby['score'] = most_rated_df_groupby.apply(
        weighted_rating, axis=1, args=[minimum_votes, avg_vote])
    return most_rated_df_groupby.sort_values('score', ascending=False)['score'].to_dict()


def get_predictions_for_all_unvoted(userid, r_matrix, cosine_sim, indexes_dict, occurences, full_df):
    unvoted_array = all_unvoted_books_for_user(userid, r_matrix, indexes_dict)
    predictions = []
    if unvoted_array == []:
        most_rated = get_most_rated(full_df, occurences)
        for key, value in most_rated.items():
            predictions.append(str(value)+":"+str(key))
    else:
        for bookid in unvoted_array:
            predictions.append(
                str(cf_user_wmean(userid, bookid, r_matrix, cosine_sim, occurences))+":"+str(bookid))

    return predictions
