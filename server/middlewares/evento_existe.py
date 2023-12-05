from functools import wraps
from flask import jsonify
from repositories.evento_repository import Evento_Repository;

def evento_existe(f):
    @wraps(f)
    def decorator(*args, **kwargs):
        params = dict(kwargs);
        
        eventoId = params["eventoId"];
        
        evento_repository = Evento_Repository();
        evento = evento_repository.fetch_by_id(eventoId);
        
        if (evento == None): return jsonify({
            "mensagem": "Evento não encontrado.",
            "conteudo": {}
        }), 404;
        
        kwargs["evento"] = evento;
        
        return f(*args, **kwargs)
    return decorator