from flask import Blueprint, request;
from flask.json import jsonify;
from middlewares.validacao import body;
from server.services.empty import Empty;
from services.integer import Integer;
from services.string import String;
from services.max import Max;
from repositories.roteiro_viagem_repository import Roteiro_Viagem_Repository;
from repositories.usuario_repository import Usuario_Repository;
from repositories.avaliacao_repository import Avaliacao_Repository;
from sqlalchemy.orm.exc import NoResultFound;


bp = Blueprint("avaliacao", __name__, url_prefix="/api/v1/avaliacoes");

@bp.route("", methods=["POST"])
@body("nota", [Empty(), Integer(), Max(5)])
@body("texto", [Empty(), String()])
@body("usuarioId", [Empty(), Integer()])
@body("roteiroViagemId", [Empty(), String()])
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

@bp.route("/<int:id>", methods=["PUT"])
@body("nota", [Empty(), String(), Max(5)])
@body("texto", [Empty(), String()])
def update(id):
    body = request.get_json();
    
    avaliacao_repository = Avaliacao_Repository();
    
    try:
        avaliacao = avaliacao_repository.update(id, body);
    except NoResultFound as e:
        return jsonify({
            "mensagem": e._message(),
            "conteudo": {}
        }), 404;
        
    return jsonify({
        "mensagem": "Avaliação atualizada.",
        "conteudo": avaliacao.to_dict()
    }), 200;
    
    