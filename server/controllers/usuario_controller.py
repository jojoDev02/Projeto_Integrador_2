from flask import Blueprint, request, jsonify;
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
def amizades(id):
    
    usuario_repository = Usuario_Repository();
    usuario = usuario_repository.fetch_by_id(id);
    
    if (usuario == None): return jsonify("Usuário não encontrato."), 404;
    
    amizades_solicitadas = usuario.amizades_solicitadas;
    amizades_recebidas = usuario.amizades_recebidas;
    amizades = amizades_recebidas + amizades_solicitadas;

    amizades = [
        {
            "id": amizade.amizadeId, 
            "amigoId": amizade.solicitanteId if amizade.receptorId == id else amizade.receptorId,
            "status": amizade.status.value
        }
        for amizade in amizades
    ];
    
    return jsonify({
        "mensagem": "Amizades listadas.",
        "conteudo": amizades
    }), 200

    