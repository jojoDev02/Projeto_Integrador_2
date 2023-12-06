from flask import Flask;
from database import init_db;
from controllers import (
    registration_controller, 
    authentication_controller,
    amizade_controller,
    usuario_controller,
    pesquisa_controller,
    roteiro_viagem_controller,
    avaliacao_controller,
    comunidade_controller,
    evento_controller,
    publicacao_controller
);
from flask_cors import CORS;

app = Flask(__name__);
CORS(app);

app.register_blueprint(registration_controller.bp);
app.register_blueprint(authentication_controller.bp);
app.register_blueprint(amizade_controller.bp);
app.register_blueprint(usuario_controller.bp);
app.register_blueprint(pesquisa_controller.bp);
app.register_blueprint(roteiro_viagem_controller.bp);
app.register_blueprint(avaliacao_controller.bp)
app.register_blueprint(comunidade_controller.bp);
app.register_blueprint(evento_controller.bp);
app.register_blueprint(publicacao_controller.bp);

init_db();