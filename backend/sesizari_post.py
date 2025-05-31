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
        try:
            sesizare_ref = db.collection('sesizari').document(sesizare_id)

            # Check if the document exists
            if not sesizare_ref.get().exists:
                abort(404, f"Sesizare with ID {sesizare_id} not found.")

            # Atomically increment the upvotes
            sesizare_ref.update({
                'upvotes': firestore.Increment(1)
            })

            return {"message": f"Sesizare {sesizare_id} upvoted successfully."}, 200

        except Exception as e:
            return {"error": str(e)}, 400

@api.route('/send_vote/downvote/<string:sesizare_id>')
class DownvoteSesizare(Resource):
    def put(self, sesizare_id):
        try:
            sesizare_ref = db.collection('sesizari').document(sesizare_id)

            # Check if the document exists
            if not sesizare_ref.get().exists:
                abort(404, f"Sesizare with ID {sesizare_id} not found.")

            # Atomically increment the downvotes
            sesizare_ref.update({
                'downvotes': firestore.Increment(1)
            })

            return {"message": f"Sesizare {sesizare_id} upvoted successfully."}, 200

        except Exception as e:
            return {"error": str(e)}, 400
