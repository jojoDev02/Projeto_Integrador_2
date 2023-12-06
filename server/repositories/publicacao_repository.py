from models.publicacao import Publicacao
from database import db_session
from sqlalchemy.orm.exc import NoResultFound
class PublicacaoRepository:

    def get_all(self):
        return db_session.query(Publicacao).all()

    def fetch_by_id(self, id): 
        publicacao = db_session.query(Publicacao).filter(Publicacao.publicacaoId == id).first()
        if publicacao:
            return publicacao
        else:
            raise NoResultFound("Publicação não encontrada.")

    def create(self, data):

        usuarioId = data["usuarioId"]
        conteudo = data["conteudo"]
        publicacao = Publicacao(conteudo=conteudo, usuarioId=usuarioId)

        db_session.add(publicacao)
        db_session.commit()

    def add_like(self, id):
        publicacao = self.fetch_by_id(id)
        publicacao.curtidas += 1
        db_session.commit()
    

    def update(self, id, novo_conteudo):
        publicacao = self.fetch_by_id(id)
        publicacao.conteudo = novo_conteudo
        db_session.commit()
      
            
    def delete(self, id): 
        publicacao = self.fetch_by_id(id)
        db_session.delete(publicacao)
        db_session.commit()

        


    