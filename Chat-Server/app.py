from flask import Flask
from flask_socketio import SocketIO, emit

app = Flask(__name__)
socketio = SocketIO(app)


@socketio.on('connect')
def test_connect():
    emit('after connect', {'data': "Let's dance"})


@socketio.on('message')
def resend_message(message):
    emit('update chat', message['data'], broadcast=True)


if __name__ == '__main__':
    socketio.run(app)
