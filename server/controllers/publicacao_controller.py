from flask import Blueprint, request
from repositories.publicacao_repository import PublicacaoRepository

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

