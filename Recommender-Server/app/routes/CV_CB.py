from . import *
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity


from flask import make_response, jsonify, Blueprint

blueprint = Blueprint('cv_cb', __name__)

# change it so it sends data to DS
@blueprint.route("/recommend/cv", methods=['GET'])
def tfidf_recommendations():
    full_df = getDataFrame()

    # pobieramy jedynie dlugi opis
    df = preprocessData(full_df)

    # utworzenie obiektu count vectorizer, usuniecie polskich stopwordsow
    cv = CountVectorizer(stop_words=stop_words)

    # utworzenie dwuwymiarowej tablicy ilosc_ksiazek x ilosc_ksiazek
    cv_matrix = cv.fit_transform(df["dlugiopis"])

    # obliczenie podobieństwa między książkami
    cosine_sim = cosine_similarity(cv_matrix, cv_matrix)

    similar_books = getNSimilarBooksDictionary(cosine_sim, amount_of_books)

    return make_response(jsonify({'books': similar_books}), 200)
