from flask import Blueprint, request, jsonify;
from functools import wraps;
from repositories.comunidade_repository import Comunidade_Repository;
from repositories.usuario_repository import Usuario_Repository;
from models.comunidade_usuario import Comunidade_Usuario;
from middlewares.validacao import body;
from services.empty import Empty;
from services.string import String;
from database import db_session;


bp = Blueprint("comunidade", __name__, url_prefix="/api/v1/comunidades");

@bp.route("/", methods=["GET"])
def list():
    comunidade_repository = Comunidade_Repository();
    comunidades = comunidade_repository.fetch_all();
    
    comunidades = [comunidade.to_dict() for comunidade in comunidades];
        
    return jsonify({
        "mensagem": "Comunidades listadas.",
        "conteudo": comunidades
    }), 200;

@bp.route("/<int:id>", methods=["GET"])
def show(id):
    comunidade_repository = Comunidade_Repository();
    comunidade = comunidade_repository.fetch_by_id(id);
    
    if comunidade == None: return jsonify({
        "mensagem": "Comunidade não encontrada.",
        "conteudo": {}
    }), 404;
    
    return jsonify({
        "mensagem": "Comunidade exibida.",
        "conteudo": comunidade.to_dict()
    }), 200;

@bp.route("/<int:comunidadeId>/usuarios/<int:usuarioId>", methods=["PUT"])
def update_usuario(comunidadeId, usuarioId):
    comunidade_repository = Comunidade_Repository();
    comunidade = comunidade_repository.fetch_by_id(comunidadeId);
    
    if comunidade == None: return jsonify({
        "mensagem": "Comunidade não encontrada.",
        "conteudo": {}
    }), 404;
    
    usuario_repository = Usuario_Repository();
    usuario = usuario_repository.fetch_by_id(usuarioId);
    
    if (usuario == None): return jsonify({
        "mensagem": "Usuário não encontrato.",
        "conteudo": None
    }), 404;
    
    associacao = Comunidade_Usuario(cargo="participante");
    associacao.comunidade = comunidade;
    
    usuario.comunidades.append(associacao);
    
    db_session.add(associacao);
    db_session.commit();
    
    return jsonify({
        "mensagem": "Usuario adicionado.",
        "conteudo": {
            "comunidade": comunidade.to_dict(),
            "usuario": usuario.to_dict()
        }
    }), 200;
    
@bp.route("/<int:comunidadeId>/usuarios/<int:usuarioId>", methods=["DELETE"])
def destroy_usuario(comunidadeId, usuarioId):
    comunidade_repository = Comunidade_Repository();
    comunidade = comunidade_repository.fetch_by_id(comunidadeId);
    
    if comunidade == None: return jsonify({
        "mensagem": "Comunidade não encontrada.",
        "conteudo": {}
    }), 404;
    
    usuario_repository = Usuario_Repository();
    usuario = usuario_repository.fetch_by_id(usuarioId);
    
    if (usuario == None): return jsonify({
        "mensagem": "Usuário não encontrato.",
        "conteudo": None
    }), 404;
    
    associacao = db_session.query(Comunidade_Usuario).filter(
        Comunidade_Usuario.comunidadeId == comunidadeId,
        Comunidade_Usuario.usuarioId == usuarioId
    ).first();
    
    if associacao.cargo.value == 1: return jsonify({
       "mensagem": "Dono da comunidade não pode ser removido.",
       "conteudo": {} 
    }), 400;
    
    comunidade.usuarios.remove(associacao);
    
    db_session.delete(associacao);
    db_session.commit();
    
    return jsonify({
        "mensagem": "Usuario removido.",
        "conteudo": {}
    }), 204;