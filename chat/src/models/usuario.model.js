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
    email: {},
    senha: {},
    apelido: {},
    tipo: {}
});

export default Usuario;