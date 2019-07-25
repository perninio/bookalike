from flask import Flask
from flask_socketio import SocketIO, emit
from database_provider.database_connector import MongoDBConnector

mongoDBConnector = MongoDBConnector('conversations')

app = Flask(__name__)
socketio = SocketIO(app)


@socketio.on('connect')
def test_connect():
    emit('after connect', {'data': "Let's dance"})


@socketio.on('message')
def resend_message(data):
    emit('update chat', data['message'], broadcast=True)


if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0')
