from flask import Blueprint, request;
from flask.json import jsonify;
from middlewares.validacao import body;
from services.empty import Empty
from services.is_enteger import Is_Integer
from repositories.roteiro_viagem_repository import Roteiro_Viagem_Repository;

bp = Blueprint("roteiro_viagem", __name__, url_prefix="/api/v1/roteiros_viagem");

@bp.route("", methods=["POST"])
@body("titulo", [Empty])
@body("conteudo", [Empty])
@body("usuarioId", [Empty, Is_Integer])
def store():
    body = request.get_json();
    
    roteiro_viagem_repository = Roteiro_Viagem_Repository();
    roteiro_viagem = roteiro_viagem_repository.create(body);
   
    return jsonify({
        "mensagem": "Roteiro de viagem criado.",
        "conteudo": roteiro_viagem.to_dict()
    }), 201