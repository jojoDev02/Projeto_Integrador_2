from models.usuario import Usuario;
from database import db_session;
from models.usuario import Usuario;

class Usuario_Repository:
    
    def fetch_by_email(self, email):
        return db_session.query(Usuario).filter(Usuario.email == email).first();
    
    def fetch_all(self):
        return db_session.query(Usuario).all();
    
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
    
