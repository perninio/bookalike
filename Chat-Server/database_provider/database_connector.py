from pymongo import MongoClient
from .conversation import Conversation
from .user import User
import os


class MongoDBConnector():
    def __init__(self, collection_names):
        """ Generic MongoDB class
        self.collections -> dictionary of collections from which we fetch data
        and upload to it

        We inherit certain classes and pass the database to object
        """
        self.collections = {}

        client = MongoClient(os.environ["DB_IP_ADDR"], 27017)
        db = client['Messenger']
        for collection_name in collection_names:
            self.collections[collection_name] = db[collection_name]

        self.conversation = Conversation(self.collections['conversations'])
        self.user = User(self.collections['user'])

    # Handling conversation object

    def create_conversation(self, data):
        pass

    def delete_conversation(self, conversation_id):
        self.conversation.delete_conversation(conversation_id)

    def fetch_messages(self, conversation_id, user_id):
        conversation = self.conversation.fetch_conversation(conversation_id)
        print(conversation)

        if user_id in conversation['users']:
            return conversation['messages']
        else:
            raise Exception("Forbidden")

    def add_message_to_conversation(self, message):
        self.conversation.add_message_to_conversation(message)

    def return_active_user(self, conversation_id):
        self.conversation.return_active_users(conversation_id)

    # Handling user object

    def fetch_user_conversation_ids(self, user_id):
        return self.user.fetch_conversation_ids_for_user(user_id)
