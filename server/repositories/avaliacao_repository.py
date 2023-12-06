from models.avaliacao import Avaliacao;
from database import db_session;
from sqlalchemy.orm.exc import NoResultFound

class Avaliacao_Repository:

    def create(self, data):
        nota = data["nota"];
        texto = data["texto"];
        usuario_id = data["usuarioId"];
        roteiro_viagem_id = data["roteiroViagemId"];
        
        avaliacao = Avaliacao(nota=nota, texto=texto, usuario_id=usuario_id, roteiro_viagem_id=roteiro_viagem_id);
        
        db_session.add(avaliacao);
        db_session.commit();
        
        return avaliacao;
    
    def fetch_by_id(self, id):
        return db_session.query(Avaliacao).filter(Avaliacao.avaliacaoId == id).first();
    
    def update(self, id, data):
        avaliacao = self.fetch_by_id(id);
        
        if avaliacao == None:
            raise NoResultFound("Avaliacao não encontrada.");
        
        avaliacao.nota = data["nota"];
        avaliacao.texto = data["texto"];
        
        db_session.commit();
        
        return avaliacao;