from app.routes import CV_CB
from app.routes import TF_IDF_CB
from flask import Flask
from flask_cors import CORS


def create_app():

    app = Flask(__name__)
    CORS(app)

    app.register_blueprint(CV_CB.blueprint)
    app.register_blueprint(TF_IDF_CB.blueprint)

    return app
