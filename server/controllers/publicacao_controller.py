from flask import Blueprint, request, jsonify;
from repositories.publicacao_repository import PublicacaoRepository
from repositories.comentario_repository import ComentarioRepository;
from middlewares.validacao import body;
from services.empty import Empty;
from services.string import String;

bp = Blueprint("publicao", __name__, url_prefix="/api/v1/publicacoes")

publicacao_repository = PublicacaoRepository()

@bp.route("", methods=["GET"])
def get_all():
    resultado = publicacao_repository.get_all()
    if resultado:
        resultado = [publicacao.to_dict() for publicacao in resultado]
        return resultado, 200
    else:
        return [], 204

@bp.route("/<int:publicacaoId>", methods=["GET"])
def get(publicacaoId):

    resultado = publicacao_repository.fetch_by_id(publicacaoId)
    if resultado:
        return resultado.to_dict(), 200
    else:
        return {"menssagem" : "Publicação não encontrada."}, 404

@bp.route("", methods=["POST"])
def create():
    dados = request.get_json()
    try:
        publicacao_repository.create(dados)
        return {"messagem": "Publicação criada com sucesso."}, 200
    except Exception as e:
        return {"error" : "{}".format(e.args)}, 500
    
@bp.route("/<int:publicacaoId>/curtir", methods=["POST"])
def like(publicacaoId):
    try:
        publicacao_repository.add_like(publicacaoId)
        return {"mensagem": "Publicaçao curtida", "conteudo": {}}, 200
    except Exception as e:
        return {"error": "{}".format(e.args)}, 500

@bp.route("/<int:publicacaoId>", methods=["PUT"])
def update(publicacaoId):
    novo_conteudo = request.get_json()

    try:
        publicacao_repository.update(publicacaoId, novo_conteudo)
    except Exception as e:
        return {"error": "{}".format(e.args)}, 500

@bp.route("/<int:publicacaoId>", methods=["DELETE"])
def delete(publicacaoId):
    try:
        publicacao_repository.delete(publicacaoId)
        return {"messagem": "publicação removida com sucesso."}, 200
    except Exception as e:
        return e.args, 500

@bp.route("/<int:publicacaoId>/comentarios", methods=["POST"])
@body("texto", [Empty(), String()])
def store_comentario(publicacaoId):
    publicacao_repository = PublicacaoRepository();
    publicacao = publicacao_repository.fetch_by_id(publicacaoId);
    
    if publicacao == None: return jsonify({
        "mensagem": "Publicação não encontrada.",
        "conteudo": {}
    }), 404;
    
    body = request.get_json();
    
    dados = {
        "publicacaoId": publicacaoId,
        "texto": body["texto"]
    };
    
    comentario_repository = ComentarioRepository();
    comentario =  comentario_repository.create(dados);
    
    return jsonify({
        "mensagem": "Comentário criado.",
        "conteudo": comentario.to_dict()
    }), 201;
    
    