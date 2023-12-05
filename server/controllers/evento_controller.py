from flask import Blueprint, request, jsonify;
from functools import wraps;
from repositories.evento_repository import Evento_Repository;
from middlewares.validacao import body;
from services.empty import Empty;
from services.string import String;
from middlewares.evento_existe import evento_existe;
from middlewares.usuario_existe import usuario_existe;
from models.evento_usuario import Evento_Usuario;
from database import db_session;

bp = Blueprint("evento", __name__, url_prefix="/api/v1/eventos");

@bp.route("/", methods=["GET"])
def list():
    evento_repository = Evento_Repository();
    eventos = evento_repository.fetch_all();
    
    eventos = [evento.to_dict() for evento in eventos];
        
    return jsonify({
        "mensagem": "Eventos listados.",
        "conteudo": eventos
    }), 200;

@bp.route("/<int:eventoId>", methods=["GET"])
@evento_existe
def show(eventoId, evento):
    return jsonify({
        "mensagem": "Evento encontrado.",
        "conteudo": evento.to_dict()
    }), 200;
    

@bp.route("/<int:eventoId>/usuarios/<int:usuarioId>", methods=["PUT"])
@evento_existe
@usuario_existe
def update_usuario(eventoId, usuarioId, evento, usuario):
    evento_usuario = Evento_Usuario("participante");
    
    evento_usuario.evento = evento;
    usuario.eventos.append(evento_usuario)
    
    db_session.add(evento_usuario);
    db_session.commit();
    
    return jsonify({
        "mensagem": "Usuário adicionado.",
        "conteudo": {
            "evento": evento.to_dict(),
            "usuario": usuario.to_dict()
        }
    })