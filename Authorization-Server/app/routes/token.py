from flask import make_response, jsonify, abort, request, Blueprint
from . import TOKEN_GENERATOR

blueprint = Blueprint('token', __name__)


@blueprint.route('/token', methods=['POST'])
def create_token():
    """Creates a JWT token with data given in body (JSON format)
    """

    payload = request.json

    token = TOKEN_GENERATOR.create_token(payload)

    return make_response(jsonify({'token': token}), 200)
