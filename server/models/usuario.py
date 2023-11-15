import enum;
from sqlalchemy import Column, Integer, String, Enum;
from database import Base;

class Tipo(enum.Enum):
    viajante = 1;
    representante_localidade = 2;

class Usuario(Base):
    __tablename__ = 'Usuario';

    usuarioId = Column(Integer, primary_key=True, autoincrement=True);
    nome = Column(String(255), nullable=False);
    email = Column(String(255), nullable=False);
    senha = Column(String(255), nullable=False);
    apelido = Column(String(255), nullable=False);
    tipo = Column(Enum(Tipo));
    
    def __init__(self, nome, apelido, email, senha, tipo):
        self.nome = nome;
        self.apelido = apelido;
        self.email = email;
        self.senha = senha;
        self.tipo = tipo;
