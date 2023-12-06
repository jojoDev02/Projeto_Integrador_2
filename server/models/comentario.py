from typing import Any
from database import Base
from sqlalchemy import String, Integer, ForeignKey
from sqlalchemy.orm import mapped_column, Mapped, relationship
from server.models.publicacao import Publicacao
from server.models.usuario import Usuario

class Comentario(Base):

    __tablename__ = 'Comentario'

    id = Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    texto = mapped_column(String(255), nullable=False)

    publicacao_id = Mapped[int] = mapped_column(ForeignKey("Publicacao.id"))
    publicacao = Mapped["Publicacao"] = relationship(back_populates="comentarios")

    usuario_id = Mapped[int] = mapped_column(ForeignKey("Usuario.id"))
    usuario = relationship("Usuario")


    def __init__(self, texto, publicacao_id) -> None:
        self.texto = texto
        self.publicacao_id = publicacao_id

    def to_dict(self):
        return{
            "usuario" : self.usuario.name,
            "id" : self.id,
            "texto" : self.texto
        }