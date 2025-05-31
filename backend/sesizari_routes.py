from flask_restx import Namespace, Resource, fields
from flask import request, abort
from firebase_client import db  # Firestore client
from datetime import datetime
import uuid
from helpers import get_neighborhood_for_point

api = Namespace('sesizari', description='Operations related to sesizari')

# Define nested location model
location_model = api.model('Location', {
    'lat': fields.Float(required=True, description='Latitude'),
    'lng': fields.Float(required=True, description='Longitude'),
})

# Full sesizare model
sesizare_model = api.model('Sesizare', {
    'id': fields.String(required=False, description='ID of the doc'),
    'titlu': fields.String(required=True, description='Title of the sesizare'),
    'descriere': fields.String(required=True, description='Detailed description'),
    'categorie': fields.String(required=True, description='Categorie'),
    'subcategorie': fields.String(required=True, description='Subcategorie'),
    'user_id': fields.String(required=True, description='ID of the user reporting'),
    'locatie': fields.Nested(location_model),
    'url_poza': fields.String(required=False, description='URL to photo proof'),
    'status': fields.String(required=False, description='Status (e.g. active, resolved)'),
    'created_at': fields.String(required=False, description='Timestamp of creation'),
    'upvotes': fields.Integer(required=False, description='Number of upvotes', default=0),
    'downvotes': fields.Integer(required=False, description='Number of downvotes', default=0),
    'comments': fields.List(fields.String, required=False, description='List of admin comments'),
    'cartier': fields.String(required=False, description='Zone in the city'),
    'interactions': fields.Raw(required=False, description='Map of user IDs to vote status (like/dislike)')
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

        data["cartier"] = get_neighborhood_for_point(data["locatie"]["lat"], data["locatie"]["lng"])

        # Save to Firestore
        new_doc_ref = db.collection('sesizari').document()
        new_doc_ref.set(data)

        return {'message': 'Sesizare created', 'id': new_doc_ref.id}, 201
