from flask import Blueprint, request;
from flask.json import jsonify;
from middlewares.validacao import body;
from services.empty import Empty;
from services.integer import Integer;
from services.string import String;
from repositories.roteiro_viagem_repository import Roteiro_Viagem_Repository;
from repositories.usuario_repository import Usuario_Repository;
from sqlalchemy.orm.exc import NoResultFound;

bp = Blueprint("roteiro_viagem", __name__, url_prefix="/api/v1/roteiros_viagem");

@bp.route("", methods=["POST"])
@body("titulo", [Empty(), String()])
@body("conteudo", [Empty(), String()])
@body("usuarioId", [Empty(), Integer()])
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
def list():
    
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
    
    return jsonify({
        "mensagem": "Roteiro de viagem encontrado.",
        "conteudo": roteiro_viagem
    }), 200;
    
@bp.route("/<int:id>", methods=["PUT"])
@body("titulo", [Empty(), String()])
@body("conteudo", [Empty(), String()])
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

@bp.route("/<int:id>/avaliacoes", methods=["GET"])
def list_avaliacoes(id):
    roteiro_viagem_repository = Roteiro_Viagem_Repository();
    roteiro_viagem = roteiro_viagem_repository.fetch_by_id(id);
    
    if roteiro_viagem == None: return jsonify({
        "mensagem": "Roteiro de viagem não encontrado.",
        "conteudo": {}
    }), 404;
    
    avaliacoes_roteiro = roteiro_viagem.avaliacoes;
    
    usuarios_incluidos = request.args.get("incluir_usuarios");
    if (usuarios_incluidos): 
        usuarios_incluidos = usuarios_incluidos.split(",");
        
        avaliacoes_roteiro = [
            avaliacao 
            for avaliacao in avaliacoes_roteiro 
            for usuario_incluido in usuarios_incluidos 
            if avaliacao.usuarioId == int(usuario_incluido)
        ];
    
    avaliacoes_roteiro = [avaliacao.to_dict() for avaliacao in avaliacoes_roteiro];
    
    return jsonify({
        "mensagem": "Avaliações do roteiro de viagem listadas.",
        "conteudo": avaliacoes_roteiro
    });
