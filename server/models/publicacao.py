from typing import List
from sqlalchemy import String, Integer, ForeignKey
from database import Base;
from sqlalchemy.orm import mapped_column, Mapped, relationship

class Publicacao(Base):

    __tablename__ = 'Publicacao';

    publicacaoId: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    conteudo = mapped_column(String(255), nullable=False)
    curtidas = mapped_column(Integer, nullable=True)
    comunidadeId: Mapped[int] = mapped_column(ForeignKey("Comunidade.comunidadeId"), nullable=True);
    usuarioId: Mapped[int] = mapped_column(ForeignKey("Usuario.usuarioId"));
    
    comunidade: Mapped["Comunidade"] = relationship(back_populates="publicacoes");
    comentarios: Mapped[List["Comentario"]] = relationship(back_populates="publicacao")
    usuario: Mapped["Usuario"] = relationship(back_populates="publicacoes")
    

    def __init__(self, conteudo, usuarioId, comunidadeId=None) -> None:
        self.conteudo = conteudo
        self.curtidas = 0
        self.usuarioId = usuarioId
        self.comunidadeId = comunidadeId

    def to_dict(self):
        return {
            'publicacaoId': self.publicacaoId,
            'conteudo': self.conteudo,
            'curtidas': self.curtidas,
            'comentarios': [comentario.to_dict() for comentario in self.comentarios] if self.comentarios else [],
            "usuario": self.usuario.to_dict()
        }