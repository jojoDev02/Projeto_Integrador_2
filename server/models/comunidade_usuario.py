from sqlalchemy import Table, Column, ForeignKey;
from database import Base;

Comunidade_Usuario = Table(
    "Comunidade_Usuario",
    Base.metadata,
    Column("usuarioId", ForeignKey("Usuario.usuarioId"), primary_key=True),
    Column("comunidadeId", ForeignKey("Comunidade.comunidadeId"), primary_key=True)
);