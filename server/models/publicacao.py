from typing import List
from sqlalchemy import String, Integer, ForeignKey
from database import Base
from sqlalchemy.orm import mapped_column, Mapped, relationship

from server.models.comentario import Comentario

class Publicacao(Base):

    __tablename__ = 'Publicacao'

    id = Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    conteudo = mapped_column(String(255), nullable=False)
    curtidas = mapped_column(Integer, nullable=True)
    comentarios = Mapped[List["Comentario"]] = relationship(back_populates="publicacao")
    usuario_id = Mapped[int] = mapped_column(ForeignKey("Usuario.id"))
    usuario = relationship("Usuario", back_populates="publicacoes")

    def __init__(self, conteudo, usuario_id) -> None:
        self.conteudo = conteudo
        self.curtidas = 0
        self.usuario_id = usuario_id

    def to_dict(self):
        return {
            'id': self.id,
            'conteudo': self.conteudo,
            'curtidas': self.curtidas,
            'comentarios': [comentario.to_dict() for comentario in self.comentarios] if self.comentarios else []
        }