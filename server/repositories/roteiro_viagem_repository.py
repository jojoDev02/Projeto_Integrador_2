from models.roteiro_viagem import Roteiro_Viagem
from database import db_session


class Roteiro_Viagem_Repository:

    def create(self, data):
        titulo = data["titulo"];
        conteudo = data["conteudo"];
        usuario_id = data["usuarioId"];

        roteiro_viagem = Roteiro_Viagem(titulo=titulo, conteudo=conteudo, usuario_id=usuario_id);

        db_session.add(roteiro_viagem)
        db_session.commit()
        
        return roteiro_viagem;


        


    