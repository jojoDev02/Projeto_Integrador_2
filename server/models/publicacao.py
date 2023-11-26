from sqlalchemy import String, Integer
from database import Base
from sqlalchemy.orm import mapped_column, Mapped, relationship

class Publicacao(Base):

    __tablename__ = 'Publicacao'

    id = Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    conteudo = mapped_column(String(255), nullable=True)
    curtidas = mapped_column(Integer, nullable=True)
    comentarios = Mapped[List["Comentario"]] = relationship(back_populates="publicacao")
    