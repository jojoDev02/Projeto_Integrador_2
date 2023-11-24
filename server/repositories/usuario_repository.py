from models.usuario import Usuario;
from database import db_session;
from sqlalchemy import or_;

class Usuario_Repository:
    
    def fetch_by_email(self, email):
        return db_session.query(Usuario).filter(Usuario.email == email).first();
    
    def fetch_by_id(self, id):
        return db_session.query(Usuario).filter(Usuario.usuarioId == id).first();
    
    def fetch_all(self):
        return db_session.query(Usuario).all();
    
    def fetch_all_by(self, email, nome, apelido):
        return db_session.query(Usuario).filter(
            or_(
                Usuario.email == email, 
                Usuario.nome == nome, 
                Usuario.apelido == apelido
            )
        ).all();
    
    def create(self, data):
        nome = data["nome"];
        email = data["email"];
        senha = data["senha"];
        apelido = data["apelido"];
        tipo = data["tipo"];
        
        usuario = Usuario(nome=nome, email=email, senha=senha, apelido=apelido, tipo=tipo);
        
        db_session.add(usuario);
        db_session.commit();
        
        return usuario;
    
