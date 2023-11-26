from flask import Blueprint, request, jsonify;
from repositories.amizade_repository import Amizade_Repository;
from repositories.usuario_repository import Usuario_Repository;

bp = Blueprint("amizade", __name__, url_prefix="/api/v1/amizades");

@bp.route("", methods=["POST"])
def store():
    body = request.get_json();
    
    solicitanteId = body["solicitanteId"];
    receptorId = body["receptorId"];
    
    usuario_repository = Usuario_Repository();
    
    receptor = usuario_repository.fetch_by_id(receptorId);
    if (receptor == None):
        return jsonify("Receptor não encontrato."), 404;
    
    solicitante = usuario_repository.fetch_by_id(solicitanteId);
    if (solicitante == None):
        return jsonify("Solicitante não encontrato."), 404;
    
    amizade_repository = Amizade_Repository();
    amizade_repository.create(body);
    
    return jsonify({
        "mensagem": "Pedido de amizade enviado.",
        "conteudo": {}
    }), 201

@bp.route("/<int:id>", methods=["PUT"])
def update(id):
    body = request.get_json();
    
    amizade_repository = Amizade_Repository();
    
    try:
        amizade_repository.update(id, body);
    except Exception as e:
        return jsonify(str(e)), 404;
    
    return jsonify({
        "mensagem": "Amizade confirmada",
        "conteudo": {}
    }), 200;
    
    
    
    

    
    