import { Op, literal } from "sequelize";
import Logger from "./helpers/logger.helper.js";
import { Amizade, Mensagem, Usuario } from "./models/index.js";

Usuario.hasMany(Mensagem, { as: "MensagensReceptor", foreignKey: "receptorId" });
Usuario.hasMany(Mensagem, { as: "MensagensEmissor", foreignKey: "emissorId" });
Mensagem.belongsTo(Usuario, { as: "MensagensReceptor", foreignKey: "receptorId" });
Mensagem.belongsTo(Usuario, { as: "MensagensEmissor", foreignKey: "emissorId" });

Usuario.hasMany(Amizade, { as: "AmizadeSolicitante", foreignKey: "solicitanteId" });
Usuario.hasMany(Amizade, { as: "AmizadeReceptor", foreignKey: "receptorId" });
Amizade.belongsTo(Usuario, { as: "AmizadeSolicitante", foreignKey: "solicitanteId" });
Amizade.belongsTo(Usuario, { as: "AmizadeReceptor", foreignKey: "receptorId" });

(async () => {
    const logger = new Logger();
    const id = 10;
    const amizades = await Amizade.findAll({
        raw: true,
        attributes: [
            [literal(`CASE WHEN solicitanteId = ${id} THEN receptorId ELSE solicitanteId END`), "id"]
        ],
        where: {
            [Op.or]: [
                {solicitanteId: id}, {receptorId: id}
            ],
            status: "confirmada"
        }
    });

    amizades.map(amizade => {
        logger.info(amizade.id);
    })
})();
