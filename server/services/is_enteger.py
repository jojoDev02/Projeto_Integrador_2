from services.regra import Regra;

class Is_Integer(Regra):
    def validar(self, campo, body):
        if type(body[campo]) != int:
            return {"status": False, "conteudo": "is_integer"};
            
        return {"status": True, "conteudo": {}};