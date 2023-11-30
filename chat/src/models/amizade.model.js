import { DataTypes } from "sequelize";
import { mainInstance } from "../database.js";

const Amizade = mainInstance.define("Amizade", {
    amizadeId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    solicitanteId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    receptorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    status: {
        type: DataTypes.ENUM,
        values: ["pendente", "confirmada"]
    },
}, {
    freezeTableName: true,
    timestamps: false
});

Amizade.sync();

export default Amizade;