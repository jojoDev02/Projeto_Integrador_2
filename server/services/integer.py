from services.regra import Regra;

class Integer(Regra):
    def validar(self, campo, body):
        if type(body[campo]) != int:
            return {"status": False, "mensagem": "is_integer"};
            
        return {"status": True, "mensagem": ""};