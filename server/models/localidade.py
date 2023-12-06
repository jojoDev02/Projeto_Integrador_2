from typing import List
from sqlalchemy import String, Integer, ForeignKey
from database import Base
from sqlalchemy.orm import mapped_column, Mapped, relationship

from server.models.comentario import Comentario

class Localidade(Base):
    __tablename__ = 'Localidade'

    id = Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    cidade = mapped_column(String(255), nullable=False)
    estado = mapped_column(String(255), nullable=False)
    bairro = mapped_column(String(255), nullable=False)

    def to_dict(self):
        return{
            "cidade" : self.cidade,
            "estado" : self.estado,
            "bairro" : self.bairro
        }