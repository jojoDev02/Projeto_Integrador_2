from models.usuario import Usuario;
from database import db_session;
from models.usuario import Usuario;

class Usuario_Repository:
    
    def fetch_by_email(self, email):
        return db_session.query(Usuario).filter_by(email=email).first();
    
    def fetch_all(self):
        return db_session.query(Usuario).all();
    
    def create(self):
        nome = self.nome;
        email = self.email;
        senha = self.senha;
        apelido = self.apelido;
        tipo = self.tipo;
        
        usuario = Usuario(nome, email, senha, apelido, tipo);
        
        db_session.add(usuario);
        db_session.commit();
        
        return usuario;
    
