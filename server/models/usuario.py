import enum;
from sqlalchemy import Column, Integer, String, Enum;
from database import Base;

class Tipo(enum.Enum):
    viajante = 1;
    representante_localidade = 2;

class Usuario(Base):
    __tablename__ = 'Usuario';

    usuarioId = Column(Integer, primary_key=True, autoincrement=True);
    nome = Column(String, nullable=False);
    email = Column(String, nullable=False);
    senha = Column(String, nullable=False);
    apelido = Column(String, nullable=False);
    tipo = Column(Enum(Tipo));
