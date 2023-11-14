from flask import Flask;
from database import init_db;
from controllers import registration_controller;

app = Flask(__name__);

app.register_blueprint(registration_controller.bp);

init_db();