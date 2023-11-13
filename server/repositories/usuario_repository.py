from models.usuario import Usuario;
from database import db_session;

class UsuarioRepository:
    def fetch_all(self):
        return db_session.query(Usuario).all();
