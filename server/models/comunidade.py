from database import Base;
from sqlalchemy import Integer, String, Column;
from sqlalchemy.orm import Mapped, mapped_column, relationship;
from typing import List;

class Comunidade(Base):
    __tablename__ = "Comunidade";
    
    comunidadeId: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True);
    nome = Column(String(255), nullable=True);
    
    usuarios: Mapped[List["Comunidade_Usuario"]] = relationship(back_populates="comunidade");
    publicacoes: Mapped[List["Publicacao"]] = relationship(back_populates="comunidade");
    
    def __init__(self, nome):
        self.nome = nome;
        
    def to_dict(self):
        return {
            "comunidadeId": self.comunidadeId,
            "nome": self.nome
        };