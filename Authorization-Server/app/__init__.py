from app.routes import token
from app.routes import rsa
from flask import Flask
from flask_cors import CORS


def create_app():

    app = Flask(__name__)
    CORS(app)

    app.register_blueprint(token.blueprint)
    app.register_blueprint(rsa.blueprint)

    return app
