from flask import Blueprint, request, jsonify;
from functools import wraps;
from repositories.comunidade_repository import Comunidade_Repository;
from repositories.usuario_repository import Usuario_Repository;
from middlewares.validacao import body;
from services.empty import Empty;
from services.string import String;
from models.comunidade import Comunidade;
from models.comunidade_usuario import Comunidade_Usuario;
from database import db_session;

bp = Blueprint("usuario", __name__, url_prefix="/api/v1/usuarios");

@bp.route("/<int:id>", methods=["GET"])
def show(id):
    usuario_repository = Usuario_Repository();
    usuario = usuario_repository.fetch_by_id(id);
    
    if (usuario == None): return jsonify({
        "mensagem": "Usuário não encontrato.",
        "conteudo": None
    }), 404,
    
    usuario = {
        "id": usuario.usuarioId,
        "nome": usuario.nome,
        "apelido": usuario.apelido,
        "email": usuario.email
    };
    
    return jsonify({
        "mensagem": "Informações do usuário listadas.",
        "conteudo": usuario
    }), 200;

@bp.route("/<int:id>/amizades", methods=["GET"])
def list_amizades(id):
    
    usuario_repository = Usuario_Repository();
    usuario = usuario_repository.fetch_by_id(id);
    
    if (usuario == None): return jsonify("Usuário não encontrato."), 404;
    
    amizades_solicitadas = usuario.amizades_solicitadas;
    amizades_recebidas = usuario.amizades_recebidas;
    amizades = amizades_recebidas + amizades_solicitadas;

    amizades = [
        {
            "id": amigo.amizadeId, 
            "amigoId": amigo.solicitanteId if amigo.receptorId == id else amigo.receptorId,
            "status": amigo.status.value
        }
        for amigo in amizades
    ];
    
    return jsonify({
        "mensagem": "Amizades listadas.",
        "conteudo": amizades
    }), 200

@bp.route("/<int:usuarioId>/amizades/<int:amigoId>", methods=["GET"])
def show_amizade(usuarioId, amigoId):
    usuario_repository = Usuario_Repository();
    usuario = usuario_repository.fetch_by_id(usuarioId);
    
    if (usuario == None): return jsonify({
        "mensagem": "Usuário não encontrado.",
        "conteudo": {}
    }), 404;
    
    amizades_solicitadas = usuario.amizades_solicitadas;
    amizades_recebidas = usuario.amizades_recebidas;
    amizades = amizades_recebidas + amizades_solicitadas;

    amizade_buscada = [
        amizade
        for amizade in amizades
        if (amizade.receptorId == usuarioId and amizade.solicitanteId == amigoId) or (amizade.receptorId == amigoId and amizade.solicitanteId == usuarioId)
    ];
    
    if not amizade_buscada: return jsonify({
       "mensagem": "Amizade não encontrada.",
       "conteudo": {} 
    }), 404;
    
    return jsonify({
        "mensagem": "Amizade encontrada.",
        "conteudo": amizade_buscada[0].to_dict()
    }), 200;
    
@bp.route("/<int:id>/comunidades", methods=["POST"])
@body("nome", [Empty(), String()])
def store_comunidade(id):
    body = request.get_json();
    
    usuario_repository = Usuario_Repository()
    usuario = usuario_repository.fetch_by_id(id);
    
    comunidade_repository = Comunidade_Repository();
    comunidade = comunidade_repository.create(body);
    
    db_session.add(comunidade);    
    
    associacao = Comunidade_Usuario(cargo="dono");
    associacao.comunidade = comunidade;
    
    usuario.comunidades.append(associacao);
    
    db_session.add(associacao);
    db_session.commit();
        
    return jsonify({
        "mensagem": "Comunidade criada.",
        "conteudo": comunidade.to_dict()
    }), 201;

@bp.route("/<int:usuarioId>/comunidades/<int:comunidadeId>", methods=["DELETE"])
def destroy_comunidade(usuarioId, comunidadeId):
    
    usuario_repository = Usuario_Repository()
    usuario = usuario_repository.fetch_by_id(usuarioId);
    
    if usuario == None: return jsonify({
        "mensagem": "Usuário não encontrado.",
        "conteudo": {}
    }), 404;