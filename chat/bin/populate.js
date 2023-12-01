import { DataTypes, Sequelize } from "sequelize";

const config = {
    host: "localhost",
    database: "rede_social",
    port: "3306",
    dialect: "mysql",
    password: "1234",
    username: "root"
}

const mainInstance = new Sequelize(config);

(async () => {
    try {
        await mainInstance.authenticate();

        console.log("Database connection established.");
    } catch (error) {
        console.error("Failed establishing database connection.");
    }
})();


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
}, {
    freezeTableName: true,
    timestamps: false
});

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
}, {
    freezeTableName: true,
    timestamps: false
});


(async () => {
    
    await mainInstance.query("SET FOREIGN_KEY_CHECKS = 0");
    await mainInstance.sync({force: true});
    
    Usuario.hasMany(Amizade, { as: "AmizadeSolicitante", foreignKey: "solicitanteId", onDelete: "CASCADE" });
    Usuario.hasMany(Amizade, { as: "AmizadeReceptor", foreignKey: "receptorId", onDelete: "CASCADE" });
    Amizade.belongsTo(Usuario, { as: "AmizadeSolicitante", foreignKey: "solicitanteId" });
    Amizade.belongsTo(Usuario, { as: "AmizadeReceptor", foreignKey: "receptorId" });
    
    Usuario.hasMany(Mensagem, { as: "MensagensReceptor", foreignKey: "receptorId", onDelete: "" });
    Usuario.hasMany(Mensagem, { as: "MensagensEmissor", foreignKey: "emissorId", onDelete: "CASCADE" });
    Mensagem.belongsTo(Usuario, { as: "MensagensReceptor", foreignKey: "receptorId" });
    Mensagem.belongsTo(Usuario, { as: "MensagensEmissor", foreignKey: "emissorId" });

    for (let i = 1; i <= 500; i++) {
        await Usuario.create({
            email: `email${i}@gmail.com`,
            nome: `nome${i}`,
            senha: "123",
            apelido: `apelido${i}`,
            tipo: "viajante"
        });
    }
    
    for (let i = 1; i <= 500; i++) {
        await Amizade.create({
            solicitanteId: 1,
            receptorId: i,
            status: "confirmada"
        })
    }

    for (let i = 1; i <= 100000; i++) {
        await Mensagem.create({
            emissorId: 1,
            receptorId: 2,
            dataEnvio: new Date(),
            conteudo: "Enviando mensagem..."
        })
    }

    await mainInstance.close();
})()
