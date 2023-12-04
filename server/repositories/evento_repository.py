from models.evento import Evento;
from database import db_session;
from sqlalchemy import or_;

class Evento_Repository:
    titulo, descricao, horario, data_evento, localidadeId
    def fetch_by_titulo(self, titulo):
        return db_session.query(Evento).filter(Evento.titulo == titulo).first();
    
    def fetch_by_id(self, id):
        return db_session.query(Evento).filter(Evento.eventooId == id).first();
    
    def fetch_all(self):
        return db_session.query(Evento).all();
    
    def fetch_all_by(self, titulo, descricao, horario, data_evento, localidadeId):
        
        titulo = "%{}%".format(titulo);
        descricao = "%{}%".format(descricao);
        horario = "%{}%".format(horario);
        data_evento = "%{}%".format(data_evento);
        localidadeId = "%{}%".format(localidadeId);
        
        return db_session.query(Evento).filter(
            or_(
                Evento.titulo.like(titulo), 
                Evento.descricao.like(descricao), 
                Evento.horario.like(horario), 
                Evento.data_evento.like(data_evento), 
                Evento.localidadeId.like(localidadeId), 
            )
        ).all();
    
    def create(self, data):
        titulo = data["titulo"];
        descricao = data["descricao"];
        horario = data["horario"];
        data_evento = data["data_evento"];
        localidadeId = data["localidadeId"];
       
        
        evento = Evento(titulo=titulo, descricao=descricao, horario=horario, data_evento=data_evento, localidadeId=localidadeId);
        
        db_session.add(evento);
        db_session.commit();
        
        return evento;