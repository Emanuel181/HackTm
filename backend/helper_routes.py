from flask_restx import Namespace, Resource, fields
from flask import request, abort, jsonify
from firebase_admin import firestore
from firebase_client import db 
import json

api = Namespace('helper_routes', description='Operations related to helper functions')

@api.route('/get_categories')
class GetAllCategories(Resource):
    def get(self):
        try:
            # Adjust the path as needed
            with open('subcategorii.json', 'r', encoding='utf-8') as f:
                data = json.load(f)
            
            categories = list(data.keys())
            return jsonify(categories)

        except FileNotFoundError:
            return {"message": "subcategorii.json not found"}, 404
        except json.JSONDecodeError:
            return {"message": "Invalid JSON format in subcategorii.json"}, 500

@api.route('/get_subcategories/<string:category>')
class GetSubcategories(Resource):
    def get(self, category):
        try:
            # Load JSON data
            with open('subcategorii.json', 'r', encoding='utf-8') as f:
                data = json.load(f)
            
            # Look for the requested category
            subcategories = data.get(category)
            if subcategories is None:
                abort(404, description=f"Category '{category}' not found")

            return jsonify(subcategories)

        except FileNotFoundError:
            abort(404, description="subcategorii.json not found")
        except json.JSONDecodeError:
            abort(500, description="Invalid JSON format in subcategorii.json")

