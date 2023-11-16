import { Amizade, Mensagem, Usuario } from "./models/index.js";

Usuario.hasMany(Mensagem, { as: "MensagensReceptor", foreignKey: "receptorId" });
Usuario.hasMany(Mensagem, { as: "MensagensEmissor", foreignKey: "emissorId" });
Mensagem.belongsTo(Usuario, { as: "MensagensReceptor", foreignKey: "receptorId" });
Mensagem.belongsTo(Usuario, { as: "MensagensEmissor", foreignKey: "emissorId" });

Usuario.hasMany(Amizade, { as: "AmizadeSolicitante", foreignKey: "solicitanteId" });
Usuario.hasMany(Amizade, { as: "AmizadeReceptor", foreignKey: "receptorId" });
Amizade.belongsTo(Usuario, { as: "AmizadeSolicitante", foreignKey: "solicitanteId" });
Amizade.belongsTo(Usuario, { as: "AmizadeReceptor", foreignKey: "receptorId" });
