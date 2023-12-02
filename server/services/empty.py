from services.regra import Regra;

class Empty(Regra):
    def validar(self, campo, body):
        if campo not in body or not body[campo]:
            return { "status": False, "conteudo": "empty" };
        
        return {"status": True, "conteudo": {}};
    