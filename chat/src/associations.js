import { Mensagem, Usuario } from "./models";
import logger from "./utils/logger";

const makeAssociations = () => {
    logger.info("Iniciando associações.")

    try {
        Usuario.hasMany(Mensagem);
    
        Mensagem.belongsTo(Usuario, { 
            foreignKey: "emissorId"
        });
        
        Mensagem.belongsTo(Usuario, {
            foreignKey: "ReceptorId"
        });
    } catch (err) {
        logger.error(err);
        return;
    }

    logger.info("Associações realizadas com sucesso.");
}

makeAssociations();

