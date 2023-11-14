from sqlalchemy import create_engine;
from sqlalchemy.orm import scoped_session, sessionmaker;
from sqlalchemy.ext.declarative import declarative_base;

engine = create_engine("mysql+pymysql://root:1234@localhost/rede_social?charset=utf8mb4");

db_session = scoped_session(sessionmaker(autocommit=False, autoflush=False, bind=engine));

Base = declarative_base();
Base.query = db_session.query_property();

from models import *;

def init_db():
    Base.metadata.create_all(bind=engine);
    tables = Base.metadata.tables;

    for table in tables:
        print(table);