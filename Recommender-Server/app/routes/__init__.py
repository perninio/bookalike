import numpy as np
import pandas as pd
import json
import requests
import os
import jwt
from . import constants
from stop_words import get_stop_words

stop_words = get_stop_words('pl')
amount_of_books = 5


def getDataFrame():
    books_resp = requests.get(
        "http://"+os.environ["DATASERVER_IP"]+":5000/api/books")
    data = books_resp.json()["data"]
    full_df = pd.DataFrame.from_dict(data)
    return full_df


def get_books_string(books):
    books_string = ""
    for book in books:
        number = str(book[0])
        books_string += number+","
    return (books_string.rstrip(','))


def getNSimilarBooksIDs(cosine_sim, N):
    similar_books = {}
    for index, book in enumerate(cosine_sim):
        N_similar_books = get_N_similar_books(book, 5)
        similar_books[index+1] = get_books_string(N_similar_books)
    return similar_books


def getNSimilarBooksDictionary(cosine_sim, N):
    similar_books = {}
    for index, book in enumerate(cosine_sim):
        similar_books[index+1] = get_N_similar_books(book, 5)
    return similar_books


def get_N_similar_books(book_similarities, n):
    similar_books = list(enumerate(book_similarities))
    similar_books = sorted(similar_books, key=lambda x: x[1], reverse=True)
    similar_books = similar_books[1:n+1]
    return similar_books


def preprocessData(full_df):
    # pobieramy jedynie opis
    df = full_df[["description"]]
    # pozbywamy sie znaków interpunkcyjnych
    df = df.replace(r'[,.\-!\?;:\(\)\[\]]', '', regex=True)

    # wszystkie podwójne spacje zastępujemy pojedynczą
    df = df.replace(r'  ', ' ', regex=True)
    # zmieniamy duże litery na małe
    df = df.applymap(lambda s: s.lower() if type(s) == str else s)
    return df


def decode_message(token):
    try:
        data = jwt.decode(token.encode('UTF-8'),
                          constants.publickey, algorithm='RS256')
    except jwt.exceptions.InvalidSignatureError:
        return {"Error": "Signature verification failed"}
    except jwt.exceptions.DecodeError:
        return {"Error": "Invalid header"}
    return data
