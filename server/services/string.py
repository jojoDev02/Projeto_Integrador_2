from services.regra import Regra;

class String(Regra):
    def validar(self, campo, body):
        if type(body[campo]) != str:
            return {"status": False, "mensagem": "is_string"};
            
        return { "status": True, "mensagem": "" };