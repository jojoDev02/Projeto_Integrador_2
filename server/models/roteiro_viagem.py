from sqlalchemy import Column, Integer, String, Text, ForeignKey;
from sqlalchemy.orm import Mapped, relationship, mapped_column;
from database import Base;
from typing import List;

class Roteiro_Viagem(Base):
    __tablename__ = 'RoteiroViagem';

    roteiroViagemId = Column(Integer, primary_key=True);
    titulo = Column(String(255), nullable=False);
    conteudo = Column(Text, nullable=False);
    usuarioId: Mapped[int] = mapped_column(ForeignKey("Usuario.usuarioId"));
    
    usuario: Mapped["Usuario"] = relationship(back_populates="roteiros_viagem");
    avaliacoes: Mapped[List["Avaliacao"]] = relationship(back_populates="roteiro_viagem");
 
    def __init__(self, titulo, conteudo, usuario_id):
        self.titulo = titulo;
        self.conteudo = conteudo;
        self.usuarioId = usuario_id;
    
    def to_dict(self):
        return {
            "roteiro_viagem_id": self.roteiroViagemId,
            "titulo": self.titulo,
            "conteudo": self.conteudo,
            "usuario_id": self.usuarioId
        };
        