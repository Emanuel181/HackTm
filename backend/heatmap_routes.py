from flask_restx import Namespace, Resource, fields
from flask import request, abort
from firebase_client import db  # Firestore client
from datetime import datetime
import uuid

from helpers import get_all_heatmap_problems

api = Namespace('heatmap', description='Operations related to the heatmaps')

@api.route('/heatmap/get_problems')
class GetAllProblems(Resource):
    def get(self):
        all_problems = get_all_heatmap_problems()
        return all_problems