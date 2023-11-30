from flask import request, jsonify;
from functools import wraps;


def empty(param):
    def decorator(f):
        @wraps(f)
        def verify(*args, **kwargs):
            body = request.get_json();
            
            if param not in body or not body[param]:
                return jsonify({
                    "mensagem": "Dádos inválidos.",
                    "conteudo": {
                        "empty": param
                    }
                }), 400;
            
            return f(*args, **kwargs);
        return verify;
    return decorator;