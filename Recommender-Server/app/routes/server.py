import sys
from flask import make_response, jsonify, Blueprint, request
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import CountVectorizer
from . import *

from . import constants

blueprint = Blueprint('server', __name__)

@blueprint.route("/server/init", methods=['POST'])
def initializeData():
    constants.publickey = request.json["publickey"]
    constants.token = request.json["token"]
    print("RECIEVED TOKEN & PUBLIC KEY")
    return make_response(jsonify({"message": "successful"})), 200