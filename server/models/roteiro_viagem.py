import enum;
from typing import List;
from sqlalchemy import Column, Integer, String, Enum;
from sqlalchemy.orm import Mapped, mapped_column, relationship;
from database import Base;
from models.amizade import Amizade;

class Usuario(Base):
    __tablename__ = 'Usuario';

    roteiroViagemId = Column(Integer, primary_key=True);
    titulo = Column(String(255), nullable=False);

 
    def __init__(self, titulo, conteudo):
        self.titulo = titulo;
        self.conteudo = conteudo;
    
    def to_dict(self):
        return {
            "roteiroViagemId": self.roteiroViagemId,
            "titulo": self.titulo,
            "conteudo": self.conteudo,
        }
        