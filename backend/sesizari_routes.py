from flask_restx import Namespace, Resource, fields
from flask import request, abort
from firebase_client import db  # Firestore client
from datetime import datetime
import uuid

api = Namespace('sesizari', description='Operations related to sesizari')

# Define nested location model
location_model = api.model('Location', {
    'lat': fields.Float(required=True, description='Latitude'),
    'lng': fields.Float(required=True, description='Longitude'),
})

# Full sesizare model
sesizare_model = api.model('Sesizare', {
    'titlu': fields.String(required=True, description='Title of the sesizare'),
    'descriere': fields.String(required=True, description='Detailed description'),
    'categorie': fields.String(required=True, description='Category (e.g. road, tree)'),
    'user_id': fields.String(required=True, description='ID of the user reporting'),
    'locatie': fields.Nested(location_model),
    'url_poza': fields.String(required=False, description='URL to photo proof'),
    'status': fields.String(required=False, description='Status (e.g. active, resolved)'),
    'created_at': fields.String(required=False, description='Timestamp of creation'),
    'id': fields.String(required=False, description='ID of the doc')
})

@api.route('/get_sesizari/all')
class GetAllSesizari(Resource):
    @api.marshal_list_with(sesizare_model)
    def get(self):
        docs = db.collection('sesizari').stream()
        return [doc.to_dict() for doc in docs]

@api.route('/create_sesizare')
class CreateSesizare(Resource):
    @api.expect(sesizare_model)
    def post(self):
        data = request.get_json()

        required_fields = ['titlu', 'descriere', 'categorie', 'user_id', 'locatie']
        for field in required_fields:
            if field not in data:
                abort(400, f"Missing required field: {field}")

        # Add default values
        sesizare_id = str(uuid.uuid4())
        data['id'] = sesizare_id
        data['status'] = 'active'
        data['created_at'] = datetime.utcnow().isoformat()

        # Save to Firestore
        new_doc_ref = db.collection('sesizari').document()
        new_doc_ref.set(data)

        return {'message': 'Sesizare created', 'id': new_doc_ref.id}, 201
