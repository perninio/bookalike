class Conversation():
    def __init__(self, collection):
        self.collection = collection
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

    def create_conversation(self, conversation_id):
        """ Create conversation for users """
        conversation = {
            'conversation_id': conversation_id,
            'messages': [],
            'users': [],
            'active_users': []
        }

        return self.collection.insert_one(conversation)

    def return_active_users(self, conversation_id):
        """ Returning all active users from conversation"""

        return self.collection.find_one(
            {"conversation_id": conversation_id}
        )['active_users']

    def fetch_conversation(self, conversation_id):
        """ Fetching all messages from conversation """
        messages = self.collection.find_one(
            {"conversation_id": conversation_id}
        )[self.array]
        return messages

    def delete_conversation(self, conversation_id):
        self.collection.delete_one(
            {'conversation_id': conversation_id}
        )
