from database import Base;
from sqlalchemy import Integer, String, Column, Text, Time, Date;
from sqlalchemy.orm import Mapped, mapped_column, relationship;
from typing import List;
from models.evento_usuario import Evento_Usuario;
import json;
from json import JSONEncoder;


class Evento(Base):
    __tablename__ = "Evento";
    
    eventoId: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True);
    titulo = Column(String(255), nullable=False);
    descricao = Column(Text, nullable=False);
    horario = Column(Time, nullable=False);
    data_evento = Column(Date, nullable=False);
    
    usuarios: Mapped[List["Evento_Usuario"]] = relationship(back_populates="evento", cascade="all, delete");
    
    def __init__(self, titulo, descricao, horario, data_evento):
        self.titulo = titulo;
        self.descricao = descricao;
        self.horario = horario;
        self.data_evento = data_evento;
        
    def to_dict(self):
        horario = str(self.horario);

        usuarios = [usuario for usuario in self.usuarios if usuario.cargo.value == 1];
        dono = usuarios[0].usuario.to_dict();
        
        return {
            "eventoId": self.eventoId,
            "titulo": self.titulo,
            "descricao": self.descricao,
            "horario": horario,
            "data_evento": self.data_evento,
            "dono": dono
        };