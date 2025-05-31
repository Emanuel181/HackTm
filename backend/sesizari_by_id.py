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
        doc = db.collection('sesizari').document(doc_id).get()
        if doc.exists:
            return doc.to_dict()
        else:
            abort(404, f"Sesizare with ID {doc_id} not found.")
