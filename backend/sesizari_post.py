from flask_restx import Namespace, Resource, fields
from flask import request, abort
from sesizari_routes import sesizare_model
from firebase_admin import firestore
from firebase_client import db 
from flask_cors import cross_origin

api = Namespace('sesizari_post', description='Operations related to sesizari')


@api.route('/send_vote/upvote/<string:sesizare_id>/<string:user_id>')
class UpvoteSesizare(Resource):
    @cross_origin()
    def post(self, sesizare_id, user_id):
        sesizare_query = db.collection('sesizari').where('id', '==', sesizare_id).stream()
        sesizare_doc = next(sesizare_query, None)

        if not sesizare_doc:
            abort(404, f"Sesizare with id == {sesizare_id} not found.")

        vote_ref = sesizare_doc.reference.collection("votes").document(user_id)
        vote_doc = vote_ref.get()

        if vote_doc.exists:
            existing_type = vote_doc.to_dict().get("type")
            if existing_type == "upvote":
                sesizare_doc.reference.update({'upvotes': firestore.Increment(-1)})
                vote_ref.delete()
                return {'message': "Upvote removed."}, 200
            elif existing_type == "downvote":
                sesizare_doc.reference.update({
                    'downvotes': firestore.Increment(-1),
                    'upvotes': firestore.Increment(1)
                })
                vote_ref.set({'type': 'upvote'})
                return {'message': "Switched from downvote to upvote."}, 200
        else:
            sesizare_doc.reference.update({'upvotes': firestore.Increment(1)})
            vote_ref.set({'type': 'upvote'})
            return {'message': "Upvote registered."}, 200


@api.route('/send_vote/downvote/<string:sesizare_id>/<string:user_id>')
class DownvoteSesizare(Resource):
    @cross_origin()
    def post(self, sesizare_id, user_id):
        sesizare_query = db.collection('sesizari').where('id', '==', sesizare_id).stream()
        sesizare_doc = next(sesizare_query, None)

        if not sesizare_doc:
            abort(404, f"Sesizare with id == {sesizare_id} not found.")

        vote_ref = sesizare_doc.reference.collection("votes").document(user_id)
        vote_doc = vote_ref.get()

        if vote_doc.exists:
            existing_type = vote_doc.to_dict().get("type")
            if existing_type == "downvote":
                sesizare_doc.reference.update({'downvotes': firestore.Increment(-1)})
                vote_ref.delete()
                return {'message': "Downvote removed."}, 200
            elif existing_type == "upvote":
                sesizare_doc.reference.update({
                    'upvotes': firestore.Increment(-1),
                    'downvotes': firestore.Increment(1)
                })
                vote_ref.set({'type': 'downvote'})
                return {'message': "Switched from upvote to downvote."}, 200
        else:
            sesizare_doc.reference.update({'downvotes': firestore.Increment(1)})
            vote_ref.set({'type': 'downvote'})
            return {'message': "Downvote registered."}, 200


@api.route('/send_comment/<string:sesizare_id>')
class AddComment(Resource):
    @cross_origin()
    def post(self, sesizare_id):
        data = request.get_json()
        comment = data.get('comment')

        if not comment:
            abort(400, "Missing 'comment' in request body.")

        query = db.collection('sesizari').where('id', '==', sesizare_id).stream()

        updated = False
        for doc in query:
            doc.reference.update({
                'comments': firestore.ArrayUnion([comment])
            })
            updated = True

        if not updated:
            abort(404, f"Sesizare with id == {sesizare_id} not found.")

        return {'message': f"Comment added to sesizare with id == {sesizare_id}."}, 200
