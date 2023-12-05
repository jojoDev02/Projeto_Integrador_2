from sqlalchemy import Column, ForeignKey, Enum;
from sqlalchemy.orm import Mapped, relationship, mapped_column;
import enum;
from database import Base;

class Cargo(enum.Enum):
    dono = 1;
    participante = 2;

class Evento_Usuario(Base):
    __tablename__ = "Evento_Usuario";
    
    eventoId: Mapped[int] = mapped_column(ForeignKey("Evento.eventoId"), primary_key=True);
    usuarioId: Mapped[int] = mapped_column(ForeignKey("Usuario.usuarioId"), primary_key=True); 
    cargo = Column(Enum(Cargo), nullable=False);
    
    evento: Mapped["Evento"] = relationship(back_populates="usuarios", cascade="all, delete")
    usuario: Mapped["Usuario"] = relationship(back_populates="eventos");
    
    def __init__(self, cargo):
        self.cargo = cargo;