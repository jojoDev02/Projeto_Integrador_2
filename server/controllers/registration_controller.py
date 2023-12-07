from flask import Blueprint, request;
from flask.json import jsonify;
from repositories.usuario_repository import Usuario_Repository;
import bcrypt;
from jwt import JWT, jwk_from_dict;
from jwt.utils import get_int_from_datetime;
from datetime import datetime, timedelta, timezone;
from middlewares.validacao import body;
from services.empty import Empty;
from services.string import String;

bp = Blueprint("registration", __name__, url_prefix="/api/v1/register");

@bp.route("", methods=["POST"])
@body("email", [Empty(), String()])
@body("senha", [Empty(), String()])
@body("apelido", [Empty(), String()])
@body("tipo", [Empty(), String()])
@body("nome", [Empty(), String()])
def register():
    body = request.get_json();
    
    print(body);
    
    email = body["email"];
    repository = Usuario_Repository();
    userExists = repository.fetch_by_email(email);

    if (userExists != None):
        return jsonify({
            "mensagem": "Usuario já cadastrado",
            "conteudo": {}
        }), 400;
    
    passwd = body["senha"].encode();
    hashedPass = bcrypt.hashpw(passwd, bcrypt.gensalt(14));
    
    data = {
        "email": body["email"],
        "apelido": body["apelido"],
        "senha": hashedPass,
        "tipo": body["tipo"],
        "nome": body["nome"]
    };
    
    jwtInstance = JWT();
    message = {
        "iss": "http://localhost:5000",
        "exp": get_int_from_datetime(datetime.now(timezone.utc) + timedelta(hours=1)),
        "email": body["email"]
    }
    key = jwk_from_dict({"kty": "oct", "k": "GawgguFyGrWKav7AX4VKUg"});
    jwtToken = jwtInstance.encode(message, key, alg="HS256");
    
    user = repository.create(data);
    
    return jsonify({
        "mensagem": "Usuário cadastrado.",
        "conteudo": { "token": jwtToken, "usuario": user.to_dict() }
    }), 201