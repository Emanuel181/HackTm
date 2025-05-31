from flask_restx import Namespace, Resource, fields
from flask import request, abort
from sesizari_routes import sesizare_model
from firebase_client import db  # Firestore client
from datetime import datetime

api = Namespace('sesizari_by_filter', description='Operations related to sesizari')

@api.route('/get_sesizari/active')
class GetActiveSesizari(Resource):
    @api.marshal_list_with(sesizare_model)
    def get(self):
        docs = db.collection('sesizari').where('status', '==', 'active').stream()
        return [doc.to_dict() for doc in docs]

@api.route('/get_sesizari/categorie/<string:name>')
class GetSesizariByCategory(Resource):
    @api.marshal_list_with(sesizare_model)
    def get(self, name):
        docs = db.collection('sesizari').where('categorie', '==', name).stream()
        return [doc.to_dict() for doc in docs]
    
@api.route('/get_sesizari/cartier/<string:cartier>')
class GetSesizariByCartier(Resource):
    @api.marshal_list_with(sesizare_model)
    def get(self, cartier):
        docs = db.collection('sesizari').where('cartier', '==', cartier).stream()
        return [doc.to_dict() for doc in docs]