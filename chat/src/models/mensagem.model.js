import { DataTypes } from "sequelize";
import { mainInstance } from "../database";

const Mensagem = mainInstance.define("Mensagem", {
    mensagemId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    emissorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    receptorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    conteudo: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    dataEnvio: {
        type: DataTypes.DATE,
        allowNull: false
    }
});

export default Mensagem;