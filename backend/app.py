from flask import Flask
from flask_restx import Api, Resource, fields

app = Flask(__name__)
api = Api(app, version="1.0", title="Sample API", description="A simple Flask-RESTX API")

# Define a namespace
ns = api.namespace('hello', description='Hello operations')

# Define a request/response model
hello_model = api.model('HelloModel', {
    'name': fields.String(required=True, description='Your name')
})

# GET and POST resource
@ns.route('/')
class HelloResource(Resource):
    @ns.doc('get_hello')
    def get(self):
        """Returns a static message"""
        return {'message': 'Hello from Flask-RESTX'}

    @ns.doc('post_hello')
    @ns.expect(hello_model)
    def post(self):
        """Greets the user by name"""
        name = api.payload['name']
        return {'message': f'Hello, {name}!'}

if __name__ == '__main__':
    app.run(debug=True)
