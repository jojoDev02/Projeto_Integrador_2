from flask import Blueprint, request;
from flask.json import jsonify;
from middlewares.validacao import body;
from services.is_empty import Is_Empty;
from services.is_enteger import Is_Integer;
from services.is_string import Is_String;
from services.max import Max;
from repositories.roteiro_viagem_repository import Roteiro_Viagem_Repository;
from repositories.usuario_repository import Usuario_Repository;
from repositories.avaliacao_repository import Avaliacao_Repository;


bp = Blueprint("avaliacao", __name__, url_prefix="/api/v1/avaliacoes");

@bp.route("", methods=["POST"])
@body("nota", [Is_Empty(), Is_Integer(), Max(5)])
@body("texto", [Is_Empty(), Is_String()])
@body("usuarioId", [Is_Empty(), Is_Integer()])
@body("roteiroViagemId", [Is_Empty(), Is_Integer()])
def store():
    body = request.get_json();
    
    usuario_id = body["usuarioId"];
    usuario_repository = Usuario_Repository();
    usuario = usuario_repository.fetch_by_id(usuario_id);
    
    if (usuario == None): return jsonify({
        "mensagem": "Usuário não encontrado.",
        "conteudo": {}
    }), 404;
        
    roteiro_viagem_id = body["roteiroViagemId"];
    roteiro_viagem_repository = Roteiro_Viagem_Repository();
    roteiro_viagem = roteiro_viagem_repository.fetch_by_id(roteiro_viagem_id);
    
    if (roteiro_viagem == None): return jsonify({
        "mensagem": "Roteiro de viagem não encontrado.",
        "conteudo": {}
    }), 404;
    
    avaliacao_repository = Avaliacao_Repository();
    avaliacao = avaliacao_repository.create(body);
   
    return jsonify({
        "mensagem": "Roteiro de viagem criado.",
        "conteudo": avaliacao.to_dict()
    }), 201
    