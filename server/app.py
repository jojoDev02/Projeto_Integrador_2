from flask import Flask;
from database import init_db, db_session;
from controllers import (
    registration_controller, 
    authentication_controller,
    amizade_controller,
    usuario_controller
);
from containers import Container;
from models.usuario import Usuario;

app = Flask(__name__);

app.register_blueprint(registration_controller.bp);
app.register_blueprint(authentication_controller.bp);
app.register_blueprint(amizade_controller.bp);
app.register_blueprint(usuario_controller.bp);


user = db_session.query(Usuario).filter(Usuario.usuarioId == 1).first();

init_db();