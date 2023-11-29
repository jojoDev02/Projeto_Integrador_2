from models.publicacao import Publicacao
from database import db_session
from sqlalchemy.orm.exc import NoResultFound
class PublicacaoRepository:

    def get_all(self):
        return db_session.query(Publicacao).all()

    def fetch_by_id(self, id): 
        return db_session.query(Publicacao).filter(Publicacao.id == id).first()

    def create(self, data):

        usuario_id = data["usuario_id"]
        conteudo = data["conteudo"]
        publicacao = Publicacao(conteudo)

        db_session.add(publicacao)
        db_session.commit()


    def update(self, id, novo_conteudo):

        publicacao = self.fetch_by_id(id)

        if publicacao:
            publicacao.conteudo = novo_conteudo
            db_session.commit()
        else:
            raise NoResultFound("Publicação não encontrada.")

    def delete(self, id): 
        publicacao = self.fetch_by_id(id)
        if publicacao:
            db_session.delete(publicacao)
            db_session.commit()
        else:
            raise NoResultFound("Publicação não encontrada.")
        


    