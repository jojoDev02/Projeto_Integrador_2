from typing import Any
from database import Base
from sqlalchemy import String, Integer, ForeignKey
from sqlalchemy.orm import mapped_column, Mapped, relationship
from models.publicacao import Publicacao

class Comentario(Base):

    __tablename__ = 'Comentario'

    comentarioId: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    texto = mapped_column(String(255), nullable=False)
    publicacaoId: Mapped[int] = mapped_column(ForeignKey("Publicacao.publicacaoId"))
    publicacao: Mapped["Publicacao"] = relationship(back_populates="comentarios")

    def __init__(self, texto, publicacaoId) -> None:
        self.texto = texto
        self.publicacaoId = publicacaoId

    def to_dict(self):
        return{
            "comentarioId" : self.comentarioId,
            "texto" : self.texto,
            "publicacaoId": self.publicacaoId
        }