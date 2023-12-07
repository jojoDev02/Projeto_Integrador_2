from models.comentario import Comentario
from database import db_session
class ComentarioRepository:

    def get_all(self):
        return db_session.query(Comentario).all()

    def create(self, data):
        usuarioId = data["usuarioId"]
        texto = data["texto"]
        publicacaoId = data["publicacaoId"]

        comentario =  Comentario(texto, publicacaoId, usuarioId);

        db_session.add(comentario)
        db_session.commit()

        return comentario


    