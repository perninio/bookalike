class User():
    def __init__(self, collection):
        self.collection = collection
        self.array = 'conversations'

    def fetch_conversation_ids_for_user(self, user_id):
        """ Fetching all conversation IDs for a user  """
        conversations = self.collection.find_one(
            {"user_id": user_id}
        )['conversations']

        return conversations
