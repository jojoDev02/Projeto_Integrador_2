from flask import Blueprint, jsonify, request;
from repositories.usuario_repository import Usuario_Repository;

bp = Blueprint("pesquisa", __name__, url_prefix="/api/v1/pesquisar");

@bp.route("", methods=["GET"])
def pesquisar():
    p = request.args.get("p");
    
    usuarios = [];

    if (p.strip() != ""):
        usuario_repository = Usuario_Repository();
        usuarios = usuario_repository.fetch_all_by(email=p, nome=p, apelido=p);

        usuarios = [
            {
                "id": usuario.usuarioId,
                "nome": usuario.nome,
                "apelido": usuario.apelido,
                "email": usuario.email,
                "tipo": usuario.tipo.value
            }
            for usuario in usuarios
        ];  
    
    return jsonify({
            "mensagem": "Pesquisa realizada",
            "conteudo": {
                "usuarios": usuarios
            }
        }), 200;