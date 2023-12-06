from flask import Blueprint, jsonify, request;
from repositories.usuario_repository import Usuario_Repository;
import bcrypt;
from jwt import JWT, jwk_from_dict;
from jwt.utils import get_int_from_datetime;
from datetime import datetime, timedelta, timezone;
from middlewares.validacao import body;
from services.empty import Empty
from services.string import String

bp = Blueprint("auth", __name__, url_prefix="/api/v1/authenticate");

@bp.route("", methods=["POST"])
@body("email", [Empty(), String()])
@body("senha", [Empty(), String()])
def authenticate():
    body = request.get_json();
    
    repository = Usuario_Repository();
    email = body["email"];
    userExists = repository.fetch_by_email(email);
    
    if (userExists == None):
        return jsonify("Email ou senha incorretos."), 404;
    
    passwd = body["senha"].encode();
    passwdMatch = bcrypt.checkpw(passwd, userExists.senha.encode());
    
    if (not passwdMatch):
        return jsonify("Email ou senha incorretos."), 404;
    
    jwtInstance = JWT();
    message = {
        "iss": "http://localhost:5000",
        "exp": get_int_from_datetime(datetime.now(timezone.utc) + timedelta(hours=1)),
        "email": body["email"]
    }
    key = jwk_from_dict({"kty": "oct", "k": "GawgguFyGrWKav7AX4VKUg"});
    jwtToken = jwtInstance.encode(message, key, alg="HS256");
    
    
    return jsonify({
        "mensagem": "Usuário autenticado.",
        "conteudo": { "token": jwtToken, "usuario": userExists.to_dict() }
    }), 200
    