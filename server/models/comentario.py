from typing import Any
from database import Base
from sqlalchemy import String, Integer, ForeignKey
from sqlalchemy.orm import mapped_column, Mapped, relationship
from models.publicacao import Publicacao

class Comentario(Base):

    __tablename__ = 'Comentario'

    comentarioId: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True);
    texto = mapped_column(String(255), nullable=False);
    publicacaoId: Mapped[int] = mapped_column(ForeignKey("Publicacao.publicacaoId"));
    usuarioId: Mapped[int] = mapped_column(ForeignKey("Usuario.usuarioId"));
    
    publicacao: Mapped["Publicacao"] = relationship(back_populates="comentarios");
    usuario: Mapped["Usuario"] = relationship(back_populates="comentarios");

    def __init__(self, texto, publicacaoId, usuarioId) -> None:
        self.texto = texto
        self.publicacaoId = publicacaoId
        self.usuarioId = usuarioId;

    def to_dict(self):
        return{
            "comentarioId" : self.comentarioId,
            "texto" : self.texto,
            "publicacaoId": self.publicacaoId
        }