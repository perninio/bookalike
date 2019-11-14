from . import *
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
from flask import make_response, jsonify, Blueprint

from . import constants

blueprint = Blueprint('tfidf_cb', __name__)

# change it so it sends data to DS
@blueprint.route("/recommend/tfidf", methods=['GET'])
def tfidf_recommendations():

    # if 'Authentication' not in request.headers:
    #     abort(403)

    # TODO: jak już będzie logowanie to odkomentuj i dodaj sprawdzanie czy admin to wywołał
    # token = request.headers.get('Authentication')
    # data = decode_message(token)

    # if 'Error' in data:
    #     return make_response(jsonify({'Error': data['Error']}), 401)
    # if 'role' in data:
    #     if data['role'] != 'admin'
    #         return make_response(jsonify({'Error': 'Unauthorized'}, 403)

    full_df = getDataFrame()

    # pobieramy jedynie dlugi opis
    df = preprocessData(full_df)

    # utworzenie tfidf vectorizer obiektu, usuniecie polskich stopwordow
    tfidf = TfidfVectorizer(stop_words=stop_words)

    # utworzenie dwuwymiarowej tablicy ilosc_ksiazek x ilosc_ksiazek
    tfidf_matrix = tfidf.fit_transform(df["description"])

    # obliczenie podobieństwa między książkami
    cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)

    similar_books = getNSimilarBooksIDs(cosine_sim, amount_of_books)

    response = requests.post(
        "http://"+os.environ["DATASERVER_IP"] +
        ":5000/api/books/set-recommendations",
        headers={'Authorization': constants.token,
                 'Content-Type': 'application/json'},
        json={"books": similar_books})

    if response.status_code == 200:
        return make_response("OK", 200)
    else:
        return make_response("ERROR", 402)
