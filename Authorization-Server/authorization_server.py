from app import create_app
from app.routes import TOKEN_GENERATOR
import os
import requests
import time

app = create_app()

publickey = TOKEN_GENERATOR.public_key


def send_public_key_and_auth_token(token, server_env):
    try:
        print("Sending to" + os.environ[server_env])
        response = requests.post(
            "http://"+os.environ[server_env]+':5000/server/init',
            headers={'Content-Type': 'application/json'},
            json={"token": token, "publickey": publickey})
        if response.status_code == 200:
            return
    except Exception:
        print("Retrying send to" + os.environ[server_env])
        time.sleep(5)
        return send_public_key_and_auth_token(token, server_env)


if __name__ == '__main__':
    DSToken = TOKEN_GENERATOR.create_token({"id": "DS", "role": "server"})
    WSToken = TOKEN_GENERATOR.create_token({"id": "WS", "role": "server"})
    RSToken = TOKEN_GENERATOR.create_token({"id": "RS", "role": "server"})

    # Data-Server Token
    send_public_key_and_auth_token(DSToken, "DATASERVER_IP")

    # Web-Server Token
    send_public_key_and_auth_token(WSToken, "WEBSERVER_IP")

    # Recommender-Server token
    send_public_key_and_auth_token(RSToken, "RECSERVER_IP")

    app.run(host="172.18.0.4")
