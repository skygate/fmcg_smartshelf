from flask import Flask
from flask_cors import CORS

from .routes import api

application = Flask(__name__)
CORS(application)
application.register_blueprint(api)
