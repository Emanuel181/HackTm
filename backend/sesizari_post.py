from flask_restx import Namespace, Resource, fields
from flask import request, abort
from sesizari_routes import sesizare_model
from firebase_admin import firestore
from firebase_client import db 

api = Namespace('sesizari_post', description='Operations related to sesizari')


# upvotes, downvotes, comments, solutionare
@api.route('/send_vote/upvote/<string:sesizare_id>')
class UpvoteSesizare(Resource):
    def put(self, sesizare_id):
        # Query for documents where the internal 'id' field matches
        query = db.collection('sesizari').where('id', '==', sesizare_id).stream()

        updated = False
        for doc in query:
            doc.reference.update({
                'upvotes': firestore.Increment(1)
            })
            updated = True

        if not updated:
            abort(404, f"Sesizare with id == {sesizare_id} not found.")

        return {'message': f"Sesizare with id == {sesizare_id} upvoted successfully."}, 200

@api.route('/send_vote/downvote/<string:sesizare_id>')
class DownvoteSesizare(Resource):
    def put(self, sesizare_id):
        # Query for documents where the internal 'id' field matches
        query = db.collection('sesizari').where('id', '==', sesizare_id).stream()

        updated = False
        for doc in query:
            doc.reference.update({
                'downvotes': firestore.Increment(1)
            })
            updated = True

        if not updated:
            abort(404, f"Sesizare with id == {sesizare_id} not found.")

        return {'message': f"Sesizare with id == {sesizare_id} downvoted successfully."}, 200
