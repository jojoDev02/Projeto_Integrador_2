from flask import Blueprint, request, jsonify;
from functools import wraps;
from repositories.usuario_repository import Usuario_Repository;

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
    
    
    