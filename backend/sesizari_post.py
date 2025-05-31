from flask_restx import Namespace, Resource, fields
from flask import request, abort
from sesizari_routes import sesizare_model

api = Namespace('sesizari_post', description='Operations related to sesizari')


# upvotes, downvotes, comments, solutionare