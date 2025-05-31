from flask import Flask
from flask_restx import Api, Resource, fields
from sesizari_routes import api as sesizari_ns

app = Flask(__name__)
api = Api(app, version="1.0", title="Sample API", description="A simple Flask-RESTX API")
api.add_namespace(sesizari_ns, path='/api')

if __name__ == '__main__':
    app.run(debug=True)
