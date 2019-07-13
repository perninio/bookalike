from pymongo import MongoClient


class MongoDBConnector():
    def __init__(self, collection_name):
        """ Generic MongoDB class
        self.collection -> collection from which we fetch data and upload to it
        """
        client = MongoClient('localhost', 27017)
        db = client['Messenger']
        self.collection = db[collection_name]
        self.array = 'messages'

    def add_message_to_conversation(self, data):
        """Add message to existing conversation
        We find the conversation, and push a new message
        to its array 'messages'
        """
        self.collection.find_one_and_update(
                {'conversation_id': data['conversation_id']},
                {
                    '$push': {
                        self.array: {
                            'author': data['author'],
                            'text': data['text'],
                            'date': data['date']
                        }
                    }
                }
        )

    def create_conversation(self, data):
        """ Create conversation for users """
        conversation = {
            'conversation_id': data['conversation_id'],
            'messages': []
        }

        return self.collection.insert_one(conversation)

    def fetch_conversation(self, data):
        """ Fetching all messages from conversation """
        conversation = self.collection.find_one(
            {"conversation_id": data['conversation_id']}
        )

        return conversation
