from models.comunidade import Comunidade
from database import db_session
from sqlalchemy.orm.exc import NoResultFound

class Comunidade_Repository:

    def create(self, data):
        nome = data["nome"];

        comunidade = Comunidade(nome=nome);

        db_session.add(comunidade)
        db_session.commit()
        
        return comunidade;
    
    def fetch_all(self):
        return db_session.query(Comunidade).all();

    def fetch_by_id(self, id):
        return db_session.query(Comunidade).filter(Comunidade.comunidadeId == id).first();
    
    def update(self, id, data):
        pass;
        
    def delete(self, comunidade):        
        db_session.delete(comunidade);
        db_session.commit();

        


        


    