from flask_restx import Namespace, Resource, fields, reqparse
from flask import request

api = Namespace('sesizari', description='Operations related to sesizari')

# Model for category filtering (for /categorie endpoint)
category_model = api.model('CategoryFilter', {
    'category': fields.String(required=True, description='Category name')
})


@api.route('/get_sesizari/all')
class GetAllSesizari(Resource):
    def get(self):
        # Fetch all sesizari from Firestore or DB
        return {"message": "All sesizari"}


@api.route('/get_sesizari/active')
class GetActiveSesizari(Resource):
    def get(self):
        # Fetch active sesizari
        return {"message": "Active sesizari"}


@api.route('/get_sesizari/categorie/<string:name>')
class GetSesizariByCategory(Resource):
    def get(self, name):
        return {"message": f"Category = {name}"}

        
@api.route('/get_sesizari/user_id/<string:user_id>')
class GetSesizariByUser(Resource):
    def get(self, user_id):
        # Fetch sesizari by user_id
        return {"message": f"Sesizari by user {user_id}"}


@api.route('/get_sesizari/sesizari_id/<string:name>')
class GetSesizariById(Resource):
    def get(self, name):
        return {"message": f"Category = {name}"}