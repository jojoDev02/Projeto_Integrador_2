from flask import Blueprint, request, jsonify;
from functools import wraps;
from repositories.comunidade_repository import Comunidade_Repository;
from middlewares.validacao import body;
from services.empty import Empty;
from services.string import String;


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
        "mensagem": "Comunidade encontrada.",
        "conteudo": comunidade.to_dict()
    }), 200;