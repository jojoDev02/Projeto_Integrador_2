from typing import Any
from sqlalchemy import String, Integer
from database import Base
from sqlalchemy.orm import mapped_column, Mapped, relationship

class Publicacao(Base):

    __tablename__ = 'Publicacao'

    id = Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    conteudo = mapped_column(String(255), nullable=False)
    curtidas = mapped_column(Integer, nullable=True)
    comentarios = Mapped[List["Comentario"]] = relationship(back_populates="publicacao")
    
    def __init__(self, conteudo) -> None:
        self.conteudo = conteudo
        self.curtidas = 0

    def to_dict(self):
        return {
            'id': self.id,
            'conteudo': self.conteudo,
            'curtidas': self.curtidas,
            'comentarios': [comentario.to_dict() for comentario in self.comentarios] if self.comentarios else []
        }