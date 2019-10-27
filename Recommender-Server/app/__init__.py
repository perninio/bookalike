from app.routes import CV_CB
from app.routes import TF_IDF_CB
from flask import Flask, request, make_response, jsonify
from flask_cors import CORS

publickey = ""
token = ""


def create_app():

    app = Flask(__name__)
    CORS(app)

    @app.route("/server/init", methods=['POST'])
    def initializeData():
        publickey = request.json["publickey"]
        token = request.json["token"]
        print("RECIEVED TOKEN & PUBLIC KEY")
        return make_response(jsonify({"message": "successful"})), 200

    app.register_blueprint(CV_CB.blueprint)
    app.register_blueprint(TF_IDF_CB.blueprint)

    return app
