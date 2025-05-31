from flask_restx import Namespace, Resource, fields
from flask import request, abort
from sesizari_routes import sesizare_model
from firebase_client import db  # Firestore client
from datetime import datetime


api = Namespace('sesizari_by_id', description='Operations related to sesizari')

@api.route('/get_sesizari/user_id/<string:user_id>')
class GetSesizariByUser(Resource):
    @api.marshal_list_with(sesizare_model)
    def get(self, user_id):
        docs = db.collection('sesizari').where('user_id', '==', user_id).stream()
        return [doc.to_dict() for doc in docs]

@api.route('/get_sesizari/sesizari_id/<string:doc_id>')
class GetSesizariById(Resource):
    @api.marshal_with(sesizare_model)
    def get(self, doc_id):
        docs = db.collection('sesizari').where('id', '==', doc_id).stream()
        for doc in docs:
            return { 'id': doc.id, **doc.to_dict() }  # include Firestore doc ID for frontend use

        abort(404, f"Sesizare with field 'id' == {doc_id} not found.")


@api.route('/update_status/solutionat/<string:doc_id>')
class UpdateStatusByFieldId(Resource):
    def put(self, doc_id):
        # Query the collection by field 'id'
        matching_docs = db.collection('sesizari').where('id', '==', doc_id).stream()
        updated = False

        for doc in matching_docs:
            doc.reference.update({
                'status': 'solutionat',
                'updated_at': datetime.utcnow().isoformat()
            })
            updated = True

        if not updated:
            abort(404, f"No sesizare found with field 'id' == {doc_id}")

        return {'message': f"Sesizare with id field '{doc_id}' marked as solutionat."}, 200
