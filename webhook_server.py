from flask import Flask, request
import os

app = Flask(__name__)

@app.route("/webhook", methods=["POST"])
def webhook():
    data = request.json
    if "frontend" in data["repository"]["name"]:
        os.system("ansible-playbook -i ansible/hosts ansible/frontend_deploy.yml")
    elif "backend" in data["repository"]["name"]:
        os.system("ansible-playbook -i ansible/hosts ansible/backend_deploy.yml")
    return "Deploy acionado!", 200

if __name__ == "__main__":
    print("Webhook server running")
    app.run(port=5000)

