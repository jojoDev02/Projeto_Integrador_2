from flask import Blueprint, request, jsonify;
from functools import wraps;
from repositories.evento_repository import evento_Repository;
from middlewares.validacao import body;
from services.empty import Empty;
from services.string import String;


bp = Blueprint("evento", __name__, url_prefix="/api/v1/eventos");

@bp.route("/", methods=["GET"])
def list():
    evento_repository = Evento_Repository();
    eventos = evento_repository.fetch_all();
    
    eventos = [evento.to_dict() for evento in evento];
        
    return jsonify({
        "mensagem": "Eventos listados.",
        "conteudo": eventos
    }), 200;

@bp.route("/<int:id>", methods=["GET"])
def show(id):
    evento_repository = Evento_Repository();
    evento = evento_repository.fetch_by_id(id);
    
    if comunidade == None: return jsonify({
        "mensagem": "Evento não encontrado.",
        "conteudo": {}
    }), 404;
    
    return jsonify({
        "mensagem": "Evento encontrado.",
        "conteudo": evento.to_dict()
    }), 200;