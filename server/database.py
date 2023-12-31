from sqlalchemy import create_engine;
from sqlalchemy.orm import scoped_session, sessionmaker;
from sqlalchemy.ext.declarative import declarative_base;

engine = create_engine("mysql+pymysql://root:1234@database/rede_social");

db_session = scoped_session(sessionmaker(autocommit=False, autoflush=False, bind=engine));

Base = declarative_base();
Base.query = db_session.query_property();


def init_db():
    
    import models;
    
    Base.metadata.create_all(bind=engine);
    tables = Base.metadata.tables;

    for table in tables:
        print(table);
