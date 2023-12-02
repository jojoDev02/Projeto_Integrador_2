from sqlalchemy import Column, Integer, Text, ForeignKey;
from sqlalchemy.orm import Mapped, relationship, mapped_column;
from database import Base;

class Avaliacao(Base):
    __tablename__ = 'Avaliacao';

    avaliacaoId = Column(Integer, primary_key=True);
    nota = Column(Integer, nullable=False);
    texto = Column(Text, nullable=False);
    usuarioId: Mapped[int] = mapped_column(ForeignKey("Usuario.usuarioId"));
    roteiroViagemId: Mapped[int] = mapped_column(ForeignKey("RoteiroViagem.roteiroViagemId"));
    
    usuario: Mapped["Usuario"] = relationship(back_populates="avaliacoes");
    roteiro_viagem: Mapped["Roteiro_Viagem"] = relationship(back_populates="avaliacoes")
 
    def __init__(self, nota, texto, usuario_id, roteiro_viagem_id):
        self.nota = nota;
        self.texto = texto;
        self.usuarioId = usuario_id;
        self.roteiroViagemId = roteiro_viagem_id;
    
    def to_dict(self):
        return {
            "avaliacao_id": self.avaliacaoId,
            "nota": self.nota,
            "texto": self.texto,
        }
        