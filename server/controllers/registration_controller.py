from flask import Blueprint, request;
from flask.json import jsonify;
from repositories.usuario_repository import Usuario_Repository;

bp = Blueprint("registration", __name__, url_prefix="/api/v1/register");

@bp.route("", methods=["POST"])
def register():
    body = request.get_json();

    email = body["email"];
    
    repository = Usuario_Repository();
    userExists = repository.fetch_by_email(email);
    
    if (userExists != None):
        return jsonify("Usuario já cadastrado"), 400;
    
    senha = body["senha"];
    
    repository.create();
    
    return jsonify("Usuário cadastrado com sucesso."), 201;
    