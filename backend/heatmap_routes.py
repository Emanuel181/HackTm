from flask_restx import Namespace, Resource, fields
from flask import request, abort
from firebase_client import db  # Firestore client
from datetime import datetime
import uuid

from helpers import get_all_heatmap_problems, get_all_heatmap_security, get_all_heatmap_investment

api = Namespace('heatmap', description='Operations related to the heatmaps')

@api.route('/heatmap/get_problems')
class GetAllProblems(Resource):
    def get(self):
        all_problems = get_all_heatmap_problems()
        return all_problems

@api.route('/heatmap/get_security')
class GetSecurityS(Resource):
    def get(self):
        security_scores = get_all_heatmap_security()
        return security_scores

@api.route('/heatmap/get_investment_scores')
class GetInvestment(Resource):
    def get(self):
        investment_scores = get_all_heatmap_investment()
        return investment_scores