from flask import Blueprint, request, jsonify;
from functools import wraps;
from repositories.comunidade_repository import Comunidade_Repository;
from repositories.usuario_repository import Usuario_Repository;
from middlewares.validacao import body;
from services.empty import Empty;
from services.string import String;
from models.comunidade import Comunidade;
from models.comunidade_usuario import Comunidade_Usuario;
from repositories.evento_repository import Evento_Repository;
from database import db_session;
from middlewares.usuario_existe import usuario_existe;
from models.evento_usuario import Evento_Usuario;

bp = Blueprint("usuario", __name__, url_prefix="/api/v1/usuarios");

@bp.route("/<int:usuarioId>", methods=["GET"])
@usuario_existe
def show(usuarioId, usuario):
    usuario_repository = Usuario_Repository();
    usuario = usuario_repository.fetch_by_id(usuarioId);
    
    return jsonify({
        "mensagem": "Usuário exibido.",
        "conteudo": usuario.to_dict()
    }), 200;

@bp.route("/<int:usuarioId>", methods=["PUT"])
@usuario_existe
@body("nome", [Empty(), String()])
@body("email", [Empty(), String()])
@body("apelido", [Empty(), String()])
@body("tipo", [Empty(), String()])
def update(usuarioId, usuario):
    body = request.get_json();    

    usuario_repository = Usuario_Repository();

    email_em_uso = False;
    apelido_em_uso = False;
 
    if body["email"] != usuario.email:
        email_em_uso = True if usuario_repository.fetch_by_email(body["email"]) else False;
    
    if email_em_uso: return jsonify({
        "mensagem": "E-mail já cadastrado.",
        "conteudo": {}
    }), 400;

    if body["apelido"] != usuario.apelido:
        apelido_em_uso = True if usuario_repository.fetch_by_apelido(body["apelido"]) else False;
    
    if apelido_em_uso: return jsonify({
        "mensagem": "Apelido já cadastrado.",
        "conteudo": {}
    }), 400;

    usuario.nome = body["nome"];
    usuario.email = body["email"];
    usuario.apelido = body["apelido"];
    usuario.tipo = body["tipo"];
    
    db_session.add(usuario);
    db_session.commit();
    
    return jsonify({
        "mensagem": "Usuário atualizado.",
        "conteudo": usuario.to_dict()
    }), 200;

@bp.route("/<int:usuarioId>/amizades", methods=["GET"])
@usuario_existe
def list_amizades(usuarioId, usuario):
    
    amizades_solicitadas = usuario.amizades_solicitadas;
    amizades_recebidas = usuario.amizades_recebidas;
    amizades = amizades_recebidas + amizades_solicitadas;

    amizades = [
        {
            "id": amigo.amizadeId, 
            "amigoId": amigo.solicitanteId if amigo.receptorId == usuarioId else amigo.receptorId,
            "status": amigo.status.value,
            "apelido": amigo.solicitante.apelido if amigo.receptorId == usuarioId else amigo.receptor.apelido,
        }
        for amigo in amizades
    ];
    
    return jsonify({
        "mensagem": "Amizades listadas.",
        "conteudo": amizades
    }), 200

@bp.route("/<int:usuarioId>/amizades/<int:amigoId>", methods=["GET"])
@usuario_existe
def show_amizade(usuarioId, amigoId, usuario):
    usuario_repository = Usuario_Repository();
    usuario = usuario_repository.fetch_by_id(usuarioId);
    
    amizades_solicitadas = usuario.amizades_solicitadas;
    amizades_recebidas = usuario.amizades_recebidas;
    amizades = amizades_recebidas + amizades_solicitadas;

    amizade_buscada = [
        amizade
        for amizade in amizades
        if (amizade.receptorId == usuarioId and amizade.solicitanteId == amigoId) or (amizade.receptorId == amigoId and amizade.solicitanteId == usuarioId)
    ];
    
    if not amizade_buscada: return jsonify({
       "mensagem": "Amizade não encontrada.",
       "conteudo": {} 
    }), 404;
    
    return jsonify({
        "mensagem": "Amizade encontrada.",
        "conteudo": amizade_buscada[0].to_dict()
    }), 200;
    
@bp.route("/<int:usuarioId>/comunidades", methods=["POST"])
@usuario_existe
@body("nome", [Empty(), String()])
def store_comunidade(usuarioId, usuario):
    body = request.get_json();
    
    comunidade_repository = Comunidade_Repository();
    comunidade = comunidade_repository.create(body);
    
    db_session.add(comunidade);    
    
    associacao = Comunidade_Usuario(cargo="dono");
    associacao.comunidade = comunidade;
    
    usuario.comunidades.append(associacao);
    
    db_session.add(associacao);
    db_session.commit();
        
    return jsonify({
        "mensagem": "Comunidade criada.",
        "conteudo": comunidade.to_dict()
    }), 201;
    
@bp.route("/<int:usuarioId>/comunidades/<int:comunidadeId>")
@usuario_existe
def show_comunidade(usuarioId, comunidadeId, usuario):
    
    comunidades = usuario.comunidades;
    
    comunidade = [comunidade for comunidade in comunidades if comunidade.comunidadeId == comunidadeId];
    
    if not comunidade: return jsonify({
        "mensagem": "Comunidade do usuário não encontrada.",
        "conteudo": {}
    }), 404;
    
    cargo = comunidade[0].cargo.value;
    comunidade = comunidade[0].comunidade;
    
    comunidade = comunidade.to_dict();
    comunidade["cargo"] = cargo;
    
    return jsonify({
        "mensagem": "Comundade do usuário exibida.",
        "conteudo": comunidade
    }), 200;
    
    

@bp.route("/<int:usuarioId>/comunidades/<int:comunidadeId>", methods=["DELETE"])
@usuario_existe
def destroy_comunidade(usuarioId, comunidadeId, usuario):
       
    comunidade_repository = Comunidade_Repository();
    comunidade = comunidade_repository.fetch_by_id(comunidadeId); 
    
    if comunidade == None: return jsonify({
        "mensagem": "Comunidade não encontrada.",
        "conteudo": {}
    }), 404;
    
    associacao = db_session.query(Comunidade_Usuario).filter(
        Comunidade_Usuario.usuarioId == usuarioId, 
        Comunidade_Usuario.comunidadeId == comunidadeId
    ).first();
    
    if associacao.cargo.value != 1: return jsonify({
        "mensagem": "Somente o dono pode remover a comunidade.",
        "conteudo": {}
    }), 403;
    
    comunidade_repository.delete(comunidade);
    
    return jsonify({
        "mensagem": "Comunidade removida",
        "conteudo": {}
    }), 204;
    
@bp.route("/<int:usuarioId>/eventos", methods=["POST"])
@usuario_existe
@body("titulo", [Empty(), String()])
@body("descricao", [Empty(), String()])
@body("horario", [Empty(), String()])
@body("data_evento", [Empty(), String()])
def store_evento(usuarioId, usuario):
    body = request.get_json();
    
    dados = body;
    dados["usuarioId"] = usuario.usuarioId;
    
    evento_repository = Evento_Repository()
    evento = evento_repository.create(dados);
    
    db_session.add(evento);
    
    evento_usuario = Evento_Usuario(cargo="dono");
    evento_usuario.evento = evento;
    usuario.eventos.append(evento_usuario);
    
    db_session.add(evento_usuario);
    db_session.commit();
    
    return jsonify({
        "mensagem": "Evento criado.",
        "conteudo": evento.to_dict() 
    });

@bp.route("/<int:usuarioId>/eventos/<int:eventoId>", methods=["DELETE"])
@usuario_existe
def destroy_evento(usuarioId, eventoId, usuario):
    evento_repository = Evento_Repository();
    evento = evento_repository.fetch_by_id(eventoId);
    
    if evento == None: return jsonify({
        "mensagem": "Evento não encontrado.",
        "conteudo": {}
    }), 404;
    
    evento_usuario = db_session.query(Evento_Usuario).filter(
        Evento_Usuario.usuarioId == usuario.usuarioId, 
        Evento_Usuario.eventoId == eventoId
    ).first();
    
    if evento_usuario == None: return jsonify({
        "mensagem": "Somente o dono pode remover o evento.",
        "conteudo": {}
    }), 403;
    
    evento_repository.delete(evento);
    
    return jsonify({
        "mensagem": "Evento removido",
        "conteudo": {}
    }), 204;