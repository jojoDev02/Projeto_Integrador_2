from sqlalchemy import Table, Column, ForeignKey, Enum;
from database import Base;
import enum;
from sqlalchemy.orm import Mapped, mapped_column, relationship;

class Cargo(enum.Enum):
    dono = 1;
    participante = 2;

class Comunidade_Usuario(Base):
    __tablename__ = "Comunidade_Usuario";
    
    usuarioId: Mapped[int] = mapped_column(ForeignKey("Usuario.usuarioId"), primary_key=True); 
    comunidadeId: Mapped[int] = mapped_column(ForeignKey("Comunidade.comunidadeId"), primary_key=True);
    cargo = Column(Enum(Cargo), nullable=False);
    
    comunidade: Mapped["Comunidade"] = relationship(back_populates="usuarios");
    usuario: Mapped["Usuario"] = relationship(back_populates="comunidades");
    
    def __init__(self, cargo):
        self.cargo = cargo;