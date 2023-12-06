from services.regra import Regra;

class Max(Regra):
    def __init__(self, max):
        self.max = max;
    
    def validar(self, campo, body):
        if body[campo] > self.max:
            return {"status": False, "mensagem": "max"}
        
        return {"status": True, "mensagem": ""};