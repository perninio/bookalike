from Crypto.PublicKey import RSA
from . import DIRECTORY_PATH, PUBLIC_KEY_PATH, PRIVATE_KEY_PATH


class RSA_Generator:

    def create_keys(self):
        """ Creates pair of keys - public and private by using
        asymmetric cryptographic algorithm - RSA
        """
        key = RSA.generate(2048)
        private_key = key.export_key()
        public_key = key.publickey().export_key()

        self.save_key(private_key, DIRECTORY_PATH + PRIVATE_KEY_PATH)
        self.save_key(public_key, DIRECTORY_PATH + PUBLIC_KEY_PATH)

    def save_key(self, key, file_name):
        """ Saves key to given file, if it doesn't exist it creates file first
        """
        file = open(file_name, "wb")
        file.write(key)
        file.close()
