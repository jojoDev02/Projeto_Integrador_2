from sqlalchemy import create_engine;
from sqlalchemy.orm import scoped_session, sessionmaker;
from sqlalchemy.ext.declarative import declarative_base;

engine = create_engine("mysql+pymysql://root:1234@localhost/rede_social");

db_session = scoped_session(sessionmaker(autocommit=False, autoflush=False, bind=engine));

Base = declarative_base();
Base.query = db_session.query_property();

from models import *;
from models import publicacao;
from models import comentario;
def init_db():
    
    Base.metadata.create_all(bind=engine);
    for tabela in Base.metadata.tables:
        print(tabela);
