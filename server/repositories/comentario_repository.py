from models.comentario import Comentario
from database import db_session
class ComentarioRepository:

    def get_all(self):
        return db_session.query(Comentario).all()

    def create(self, data):
        usuario_id = data["usuario_id"]
        texto = data["texto"]
        publicacao_id = data["publicacao_id"]
        

        comentario =  Comentario(texto, publicacao_id, usuario_id)

        db_session.add(comentario)
        db_session.commit()

        return comentario


    