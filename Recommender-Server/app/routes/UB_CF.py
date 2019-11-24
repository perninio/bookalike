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
        data["id"], r_matrix, cosine_sim, indexes_dict, occurences)
    predictions.sort(reverse=True)

    return make_response(jsonify({"data": predictions[:30]}), 200)


def getRateFrame():
    rates_resp = requests.get(
        "http://"+os.environ["DATASERVER_IP"]+":5000/api/rates",
        headers={'Authorization': constants.token,
                 'Content-Type': 'application/json'})
    data = rates_resp.json()["data"]
    full_df = pd.DataFrame.from_dict(data)
    full_df.to_csv("./rates.csv")
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

            if bookid == 72:
                print(type(wmean_rating))
                print_things(m_ratings, sim_scores, wmean_rating)
        else:
            wmean_rating = 3.0

    return wmean_rating


def all_unvoted_books_for_user(userid, r_matrix, indexes_dict):
    user_matrix = r_matrix.iloc[indexes_dict[userid]]
    return np.array(user_matrix.loc[~user_matrix.isin(voting_system_ratings)].index)


def get_predictions_for_all_unvoted(userid, r_matrix, cosine_sim, indexes_dict, occurences):
    unvoted_array = all_unvoted_books_for_user(userid, r_matrix, indexes_dict)
    unvoted_predictions = []
    for bookid in unvoted_array:
        unvoted_predictions.append(
            str(cf_user_wmean(userid, bookid, r_matrix, cosine_sim, occurences))+":"+str(bookid))
    return unvoted_predictions
