from database import Base;
from sqlalchemy import Integer, String, Column;
from sqlalchemy.orm import Mapped, mapped_column, relationship;
from typing import List;
from models.comunidade_usuario import Comunidade_Usuario;

class Comunidade(Base):
    __tablename__ = "Comunidade";
    
    comunidadeId: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True);
    nome = Column(String(255), nullable=True);
    
    usuarios: Mapped[List["Usuario"]] = relationship(
        secondary=Comunidade_Usuario, 
        back_populates="comunidades"
    );