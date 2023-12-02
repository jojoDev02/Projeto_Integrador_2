from services.regra import Regra;

class Is_Empty(Regra):
    def validar(self, campo, body, options = {}):
        if campo not in body or not body[campo]:
            return { "status": False, "mensagem": msg if msg else "is_empty" };
        
        return {"status": True, "mensagem": ""};
    