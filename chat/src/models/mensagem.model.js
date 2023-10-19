import { DataTypes } from "sequelize";
import { mainInstance } from "../database";

const Mensagem = mainInstance.define("Mensagem", {
    mensagemId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        validate: {
            max: 255
        },
        allowNull: false
    },
    conteudo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apelido: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tipo: {
        type: DataTypes.ENUM,
        values: ["viajante", "representante_localidade"]
    }
});

export default Mensagem;