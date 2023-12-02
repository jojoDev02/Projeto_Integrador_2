from services.regra import Regra;

class Is_Integer(Regra):
    def validar(self, campo, body, options = {}):
        if type(body[campo]) != int:
            return {"status": False, "mensagem": msg if msg else "is_integer"};
            
        return {"status": True, "mensagem": ""};