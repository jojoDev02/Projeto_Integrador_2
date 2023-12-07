from typing import Any
from database import Base
from sqlalchemy import String, Integer, ForeignKey
from sqlalchemy.orm import mapped_column, Mapped, relationship
<<<<<<< HEAD
from models.publicacao import Publicacao
=======
from server.models.publicacao import Publicacao
from server.models.usuario import Usuario
>>>>>>> f48f1171386625660d413897a0a827e48daf95e7

class Comentario(Base):

    __tablename__ = 'Comentario'

    comentarioId: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    texto = mapped_column(String(255), nullable=False)
<<<<<<< HEAD
    publicacaoId: Mapped[int] = mapped_column(ForeignKey("Publicacao.publicacaoId"))
    publicacao: Mapped["Publicacao"] = relationship(back_populates="comentarios")

    def __init__(self, texto, publicacaoId) -> None:
=======

    publicacao_id = Mapped[int] = mapped_column(ForeignKey("Publicacao.id"))
    publicacao = Mapped["Publicacao"] = relationship(back_populates="comentarios")

    usuario_id = Mapped[int] = mapped_column(ForeignKey("Usuario.id"))
    usuario = relationship("Usuario")


    def __init__(self, texto, publicacao_id) -> None:
>>>>>>> f48f1171386625660d413897a0a827e48daf95e7
        self.texto = texto
        self.publicacaoId = publicacaoId

    def to_dict(self):
        return{
<<<<<<< HEAD
            "comentarioId" : self.comentarioId,
            "texto" : self.texto,
            "publicacaoId": self.publicacaoId
=======
            "usuario" : self.usuario.name,
            "id" : self.id,
            "texto" : self.texto
>>>>>>> f48f1171386625660d413897a0a827e48daf95e7
        }