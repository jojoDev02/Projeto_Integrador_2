import enum;
from typing import List;
from sqlalchemy import Column, Integer, String, Enum;
from sqlalchemy.orm import Mapped, mapped_column, relationship;
from database import Base;
from models.amizade import Amizade

class Tipo(enum.Enum):
    viajante = 1;
    representante_localidade = 2;

class Usuario(Base):
    __tablename__ = 'Usuario';

    usuarioId: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True);
    nome = mapped_column(String(255), nullable=False);
    email = mapped_column(String(255), nullable=False, unique=True);
    senha = mapped_column(String(255), nullable=False);
    apelido = mapped_column(String(255), nullable=False, unique=True);
    tipo = mapped_column(Enum(Tipo));
    
    roteiros_viagem: Mapped[List["Roteiro_Viagem"]] = relationship(back_populates="usuario");
    avaliacoes: Mapped[List["Avaliacao"]] = relationship(back_populates="usuario");
    
    amizades_solicitadas: Mapped[List["Amizade"]] = relationship(
        "Amizade", 
        cascade="all, delete", 
        foreign_keys=[Amizade.solicitanteId], 
        back_populates="solicitante"
    );
    
    amizades_recebidas: Mapped[List["Amizade"]] = relationship(
        "Amizade", 
        cascade="all, delete", 
        foreign_keys=[Amizade.receptorId], 
        back_populates="receptor"
    );
    
    def __init__(self, nome, apelido, email, senha, tipo):
        self.nome = nome;
        self.apelido = apelido;
        self.email = email;
        self.senha = senha;
        self.tipo = tipo;
    
    def to_dict(self):
        return {
            "nome": self.nome,
            "apelido": self.apelido,
            "email": self.email,
            "tipo": self.tipo.value
        }
        