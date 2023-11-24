from flask import Blueprint, request, jsonify;
from repositories.usuario_repository import Usuario_Repository;

bp = Blueprint("usuario", __name__, url_prefix="/api/v1/usuarios");

@bp.route("/<int:id>/amizades", methods=["GET"])
def amizades(id):
    
    usuario_repository = Usuario_Repository();
    usuario = usuario_repository.fetch_by_id(id);
    
    if (usuario == None):
        return jsonify("Usuário não encontrato."), 404;
    
    amizades_solicitadas = usuario.amizades_solicitadas;
    amizades_recebidas = usuario.amizades_recebidas;
    amizades = amizades_recebidas + amizades_solicitadas;

    amizadesFormatadas = [];
    for amizade in amizades:
        
        if id == amizade.receptorId:
            amigo_id = amizade.solicitanteId;
        else:
            amigo_id = amizade.receptorId;
            
        amizadesFormatadas.append({
            "id": amizade.amizadeId, 
            "amigoId": amigo_id,
            "status": amizade.status.value
        });
    
    return jsonify({
        "message": "Amizades listadas",
        "content": amizadesFormatadas
    }), 200
    
    