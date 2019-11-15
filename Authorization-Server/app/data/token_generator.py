import jwt
import datetime
from .rsa_generator import RSA_Generator
from . import DIRECTORY_PATH, PUBLIC_KEY_PATH, PRIVATE_KEY_PATH


class Token_Generator:

    def __init__(self):
        """self.private_key - used for signing signature of JWT token
        self.public_key - used to verify the signature of JWT token
        self.algorithm = 'RS256' - because of RSA algorithm
        (public and private key)
        """
        RSA_Generator().create_keys()

        self.private_key = self.load_key(DIRECTORY_PATH + PRIVATE_KEY_PATH)
        self.public_key = self.load_key(DIRECTORY_PATH + PUBLIC_KEY_PATH)
        self.algorithm = 'RS256'

    def load_key(self, file_name):
        """ Loads key from given file's name to variable """
        with open(file_name) as rsa_key_file:
            key = rsa_key_file.read()
            return key

    def create_token(self, payload):
        """ Creates JWT token with user's data (payload) """
        if payload["role"] != "server":
            payload["exp"] = datetime.datetime.now() + datetime.timedelta(minutes=15)
        token = jwt.encode(payload, self.private_key, algorithm=self.algorithm)
        return token.decode('UTF-8')
