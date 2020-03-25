from flask import make_response, jsonify, Blueprint
from . import TOKEN_GENERATOR

blueprint = Blueprint('rsa', __name__)


@blueprint.route('/publickey', methods=['GET'])
def return_public_key():
    """ Returns the public_key in JSON format """
    public_key = TOKEN_GENERATOR.public_key
    return make_response(jsonify({'public_key': public_key}), 200)
