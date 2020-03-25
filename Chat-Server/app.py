from flask import Flask, request, abort, make_response, jsonify
import jwt
from flask_socketio import SocketIO, emit, join_room, leave_room
from flask_cors import CORS
from database_provider.database_connector import MongoDBConnector
from urllib.parse import unquote
import requests
import os
import time
mongoDBConnector = MongoDBConnector(['conversations', 'user'])


app = Flask(__name__)
CORS(app)
socketio = SocketIO(app)

public_key = ""


def get_public_key():
    try:
        print("http://"+os.environ["AUTH_IP_ADDR"] + ':5000/publickey')
        public_key = requests.get(
            "http://"+os.environ["AUTH_IP_ADDR"]+':5000/publickey',
            headers={'Content-Type': 'application/json'}).json()['public_key']
    except Exception:
        time.sleep(5)
        return get_public_key()


def decode_message(token):
    try:
        data = jwt.decode(token.encode('UTF-8'),
                          public_key, algorithm='RS256')
    except jwt.exceptions.InvalidSignatureError:
        return {"Error": "Signature verification failed"}
    except jwt.exceptions.DecodeError:
        return {"Error": "Invalid header"}
    return data


@app.route("/conversations", methods=['GET'])
def fetch_conversations():
    if 'Authentication' not in request.headers:
        abort(400)

    token = request.headers.get('Authentication')
    data = decode_message(token)
    print(data)

    if 'Error' not in data:
        return {"conversations": mongoDBConnector.fetch_user_conversation_ids(
            data['user_id'])}
    else:
        return make_response(jsonify({'Error': data['Error']}), 401)


@app.route("/messages/<conversation_id>", methods=['GET'])
def fetch_messages(conversation_id):
    if 'Authentication' not in request.headers:
        abort(400)

    token = request.headers.get('Authentication')

    data = decode_message(token)

    if 'Error' not in data:
        try:
            conversation_id = unquote(conversation_id)
            return {"messages": mongoDBConnector.fetch_messages(
                conversation_id, data['user_id'])}
        except Exception:
            abort(403)
    else:
        return make_response(jsonify({'Error': data['Error']}), 401)


@socketio.on('join')
def on_join(data):
    room = data['conversation_id']
    join_room(room)


@socketio.on('leave')
def on_leave(data):
    room = data['conversation_id']
    leave_room(room)


@socketio.on('data')
def send_message(data):
    mongoDBConnector.add_message_to_conversation(data)
    emit('update chat', data, room=data['conversation_id'])


if __name__ == '__main__':
    get_public_key()
    socketio.run(app, host='172.18.0.2')
