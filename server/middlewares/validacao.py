from flask import request, jsonify;
from functools import wraps;

def body(campo, regras):
    def decorator(f):
        @wraps(f)
        def verify(*args, **kwargs):
            body = request.get_json();
            
            pilha = [];
            
            for Regra in regras:
                regra = Regra();
                res = regra.validar(campo, body);
                
                if not res["status"]:
                    pilha.append(res["conteudo"]);
                    
            if pilha:
                conteudo_resposta = {campo: []};
                
                while pilha:
                    conteudo = pilha.pop();
                    conteudo_resposta[campo].append(conteudo);
                
                return jsonify({
                    "mensagem": "Dádos inválidos",
                    "conteudo": conteudo_resposta
                }), 400;
            
            return f(*args, **kwargs);
        return verify;
    return decorator;