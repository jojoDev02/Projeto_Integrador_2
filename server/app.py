from flask import Flask;
from database import init_db, db_session;
from controllers import (
    registration_controller, 
    authentication_controller,
    amizade_controller,
    usuario_controller,
    pesquisa_controller
);
from models.usuario import Usuario;
from flask_cors import CORS;

app = Flask(__name__);
CORS(app);

app.register_blueprint(registration_controller.bp);
app.register_blueprint(authentication_controller.bp);
app.register_blueprint(amizade_controller.bp);
app.register_blueprint(usuario_controller.bp);
app.register_blueprint(pesquisa_controller.bp);

init_db();