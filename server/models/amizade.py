from database import Base;
from typing import List;
from sqlalchemy import Column, Integer, Enum, ForeignKey;
from sqlalchemy.orm import Mapped, mapped_column, relationship;
import enum;

class Status(enum.Enum):
    pendente = 1;
    confirmada = 2;

class Amizade(Base):
    __tablename__ = "Amizade";
    
    amizadeId = mapped_column(Integer, primary_key=True, autoincrement=True);
    solicitanteId: Mapped[int] = mapped_column(ForeignKey("Usuario.usuarioId"));
    receptorId: Mapped[int] = mapped_column(ForeignKey("Usuario.usuarioId"));
    status = mapped_column(Enum(Status), nullable=False);
    
    solicitante = relationship("Usuario", foreign_keys=[solicitanteId]);
    receptor = relationship("Usuario", foreign_keys=[receptorId]);
    
    def __init__(self, solicitanteId, receptorId, status = "pendente"):
        self.solicitanteId = solicitanteId;
        self.receptorId = receptorId;
        self.status = status;
    
    def to_dict(self):
        return {
            "id": self.amizadeId,
            "solicitanteId": self.solicitanteId,
            "receptorId": self.receptorId,
            "status": self.status.value
        }
        
