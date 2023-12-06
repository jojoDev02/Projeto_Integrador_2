from models.roteiro_viagem import Roteiro_Viagem
from database import db_session
from sqlalchemy.orm.exc import NoResultFound

class Roteiro_Viagem_Repository:

    def create(self, data):
        titulo = data["titulo"];
        conteudo = data["conteudo"];
        usuario_id = data["usuarioId"];

        roteiro_viagem = Roteiro_Viagem(titulo=titulo, conteudo=conteudo, usuario_id=usuario_id);

        db_session.add(roteiro_viagem)
        db_session.commit()
        
        return roteiro_viagem;
    
    def fetch_all(self):
        return db_session.query(Roteiro_Viagem).all();

    def fetch_by_id(self, id):
        return db_session.query(Roteiro_Viagem).filter(Roteiro_Viagem.roteiroViagemId == id).first();
    
    def update(self, id, data):
        roteiro_viagem = self.fetch_by_id(id);
        
        if roteiro_viagem == None:
            raise NoResultFound("Roteiro de viagem não encontrado.");
        
        roteiro_viagem.titulo = data["titulo"];
        roteiro_viagem.conteudo = data["conteudo"];    
        
        db_session.commit();
        
        return roteiro_viagem;  
        
        
    def delete(self, id):
        roteiro_viagem = self.fetch_by_id(id);
        
        if roteiro_viagem == None:
            raise NoResultFound("Roteiro de viagem não encontrado.");
        
        db_session.delete(roteiro_viagem);
        db_session.commit();


        


    