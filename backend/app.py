import os
import json
from flask import Flask
from flask_restx import Api
from dotenv import load_dotenv
import firebase_admin
from firebase_admin import credentials, firestore

# Load environment variables from .env
load_dotenv()

# Parse the service account JSON from the env variable
firebase_creds_json = os.getenv("FIREBASE_CREDENTIALS_JSON")
cred_dict = json.loads(firebase_creds_json)

# Initialize Firebase Admin SDK
cred = credentials.Certificate(cred_dict)
firebase_admin.initialize_app(cred)

# Make Firestore available globally (can be imported elsewhere)
db = firestore.client()

# Initialize Flask app and API
from sesizari_routes import api as sesizari_ns
from sesizari_by_id import api as sesizari_id_ns
from sesizari_by_filter import api as sesizari_filter_ns
from sesizari_post import api as sesizari_post_ns

app = Flask(__name__)
api = Api(app, version="1.0", title="Sample API", description="A simple Flask-RESTX API")
api.add_namespace(sesizari_ns, path='/api')
api.add_namespace(sesizari_id_ns, path='/api')
api.add_namespace(sesizari_filter_ns, path='/api')
api.add_namespace(sesizari_post_ns, path='/api')

if __name__ == '__main__':
    app.run(debug=True)
