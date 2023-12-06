from functools import wraps
from flask import jsonify
from repositories.usuario_repository import Usuario_Repository;

def usuario_existe(f):
    @wraps(f)
    def decorator(*args, **kwargs):
        params = dict(kwargs);
        
        usuarioId = params["usuarioId"];
        
        usuario_repository = Usuario_Repository();
        usuario = usuario_repository.fetch_by_id(usuarioId);
        
        if (usuario == None): return jsonify({
            "mensagem": "Usuário não encontrado.",
            "conteudo": {}
        }), 404;
        
        kwargs["usuario"] = usuario;
        
        return f(*args, **kwargs)
    return decorator