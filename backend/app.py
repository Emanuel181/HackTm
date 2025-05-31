import os
import json
from flask import Flask
from flask_restx import Api
from flask_cors import CORS  # ✅ CORS support
from dotenv import load_dotenv
import firebase_admin
from firebase_admin import credentials, firestore

# ✅ Load environment variables from .env
load_dotenv()

# ✅ Parse the service account JSON from the environment
firebase_creds_json = os.getenv("FIREBASE_CREDENTIALS_JSON")
cred_dict = json.loads(firebase_creds_json)

# ✅ Initialize Firebase Admin SDK (only once)
cred = credentials.Certificate(cred_dict)
if not firebase_admin._apps:
    firebase_admin.initialize_app(cred)

# ✅ Initialize Firestore client
db = firestore.client()

# ✅ Import route namespaces (after db is ready)
from sesizari_routes import api as sesizari_ns
from sesizari_by_id import api as sesizari_id_ns
from sesizari_by_filter import api as sesizari_filter_ns
from sesizari_post import api as sesizari_post_ns
from helper_routes import api as helper_routes_ns

# ✅ Initialize Flask app
app = Flask(__name__)

# ✅ Allow only frontend running on localhost:3000
CORS(app, resources={r"/api/*": {"origins": "*"}})

# ✅ Initialize Flask-RESTX API
api = Api(app, version="1.0", title="Sample API", description="A simple Flask-RESTX API")

# ✅ Register all namespaces
api.add_namespace(sesizari_ns, path='/api')
api.add_namespace(sesizari_id_ns, path='/api')
api.add_namespace(sesizari_filter_ns, path='/api')
api.add_namespace(sesizari_post_ns, path='/api')
api.add_namespace(helper_routes_ns, path='/api')

# ✅ Run the app
if __name__ == '__main__':
    app.run(debug=True)
