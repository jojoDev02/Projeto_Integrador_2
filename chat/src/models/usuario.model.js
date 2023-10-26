import { DataTypes } from "sequelize";
import { mainInstance } from "../database";

const Usuario = mainInstance.define("Usuario", {
    usuarioId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
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

export default Usuario;