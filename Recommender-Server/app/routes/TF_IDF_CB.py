from . import *
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel


from flask import make_response, jsonify, Blueprint

blueprint = Blueprint('tfidf_cb', __name__)

# change it so it sends data to DS
@blueprint.route("/recommend/tfidf", methods=['GET'])
def tfidf_recommendations():
    full_df = getDataFrame()

    df = preprocessData(full_df)

    # utworzenie tfidf vectorizer obiektu, usuniecie polskich stopwordow
    tfidf = TfidfVectorizer(stop_words=stop_words)

    # utworzenie dwuwymiarowej tablicy ilosc_ksiazek x ilosc_ksiazek
    tfidf_matrix = tfidf.fit_transform(df["dlugiopis"])

    # obliczenie podobieństwa między książkami
    cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)

    similar_books = getNSimilarBooksDictionary(cosine_sim, amount_of_books)

    return make_response(jsonify({'books': similar_books}), 200)
