from flask import Blueprint, jsonify, request;
from repositories.usuario_repository import Usuario_Repository;
from services.serializador_service import Serializador_Service;

bp = Blueprint("pesquisa", __name__, url_prefix="/api/v1/pesquisar");

@bp.route("", methods=["GET"])
def pesquisar():
    
    p = request.args.get("p");

    usuario_repository = Usuario_Repository();
    usuarios = usuario_repository.fetch_all_by(email=p, nome=p, apelido=p);
    print(type(usuarios));
    serializador = Serializador_Service();
    serializador.serializar(usuarios);
    
    return jsonify({
            "mensagem": "Pesquisa realizada"
        }), 200;
    
    
    