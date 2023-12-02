from flask import Blueprint, request;
from flask.json import jsonify;
from middlewares.validacao import body;
from services.is_empty import Is_Empty;
from services.is_enteger import Is_Integer;
from services.is_string import Is_String;
from repositories.roteiro_viagem_repository import Roteiro_Viagem_Repository;
from repositories.usuario_repository import Usuario_Repository;
from sqlalchemy.orm.exc import NoResultFound


bp = Blueprint("roteiro_viagem", __name__, url_prefix="/api/v1/roteiros_viagem");

@bp.route("", methods=["POST"])
@body("titulo", [Is_Empty(), Is_String()])
@body("conteudo", [Is_Empty(), Is_String()])
@body("usuarioId", [Is_Empty(), Is_Integer()])
def store():
    body = request.get_json();
    
    usuario_id = body["usuarioId"];
    usuario_repository = Usuario_Repository();
    usuario = usuario_repository.fetch_by_id(usuario_id);
    
    if (usuario == None): return jsonify({
        "mensagem": "Usuário não encontrado.",
        "conteudo": {}
    }), 404;
    
    roteiro_viagem_repository = Roteiro_Viagem_Repository();
    roteiro_viagem = roteiro_viagem_repository.create(body);
   
    return jsonify({
        "mensagem": "Roteiro de viagem criado.",
        "conteudo": roteiro_viagem.to_dict()
    }), 201

@bp.route("", methods=["GET"])
def index():
    
    roteiro_viagem_repository = Roteiro_Viagem_Repository();
    roteiros_viagem = roteiro_viagem_repository.fetch_all();
    
    roteiros_viagem = [roteiro_viagem.to_dict() for roteiro_viagem in roteiros_viagem];
    
    return jsonify({
        "mensagem": "Roteiros de viagem listados.",
        "conteudo": roteiros_viagem
    }), 200;
    
@bp.route("/<int:id>", methods=["GET"])
def show(id):
    roteiro_viagem_repository = Roteiro_Viagem_Repository();
    roteiro_viagem = roteiro_viagem_repository.fetch_by_id(id);
    
    if roteiro_viagem == None: return jsonify({
        "mensagem": "Roteiro de viagem não encontrado.",
        "conteudo": {}
    }), 404;      
    
    mostrar_avaliacoes = int(request.args.get("avaliacoes")); 
    avaliacoes_roteiro = [];
    if (mostrar_avaliacoes):
        
        if (mostrar_avaliacoes == "all"):
            avaliacoes_roteiro = [avaliacao.to_dict() for avaliacao in roteiro_viagem.avaliacoes];
        else:
            avaliacoes_roteiro = [avaliacao.to_dict() for avaliacao in roteiro_viagem.avaliacoes if avaliacao.avaliacaoId == mostrar_avaliacoes];
            avaliacoes_roteiro = avaliacoes_roteiro[0] if avaliacoes_roteiro else []
        
    roteiro_viagem = roteiro_viagem.to_dict();
    
    if (avaliacoes_roteiro): roteiro_viagem["avaliacoes"] = avaliacoes_roteiro;
    
    return jsonify({
        "mensagem": "Roteiro de viagem encontrado.",
        "conteudo": roteiro_viagem
    }), 200;
    
@bp.route("/<int:id>", methods=["PUT"])
@body("titulo", [Is_Empty(), Is_String()])
@body("conteudo", [Is_Empty(), Is_String()])
def update(id):
    body = request.get_json();
    
    roteiro_viagem_repository = Roteiro_Viagem_Repository();
    
    try:
        roteiro_viagem = roteiro_viagem_repository.update(id, body);
    except NoResultFound as e:
        return jsonify({
            "mensagem": e._message(),
            "conteudo": {}
        });
    
    return jsonify({
        "mensagem": "Roteiro de viagem atualizado.",
        "conteudo": roteiro_viagem.to_dict()
    }), 200

@bp.route("/<int:id>", methods=["DELETE"])
def destroy(id):
    roteiro_viagem_repository = Roteiro_Viagem_Repository();
    
    try:
        roteiro_viagem_repository.delete(id);
    except NoResultFound as e:
        return jsonify({
            "mensagem": e._message(),
            "conteudo": {}
        }), 404;
        
    return jsonify({
        "mensagem": "Roteiro de viagem excluído.",
        "conteudo": {}
    }), 204;
    