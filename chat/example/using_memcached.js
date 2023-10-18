import memjs from "memjs";


const client = memjs.Client.create();

// Caching de dados dos usuários
(async () => {
    const users = [];
    const tipos = [
        "viajante", "representante_localidade"
    ]

    for (let i = 1; i <= 30; i++) {
        users.push({
            id: i,
            nome: `Nome do usuário ${i}`,
            email: `usuário${i}@mail.com`,
            senha: `senhausuario${i}123`,
            apelido: `Usuário ${i}`,
            tipo: tipos[Math.random()]
        });
    }

    // Em um cenário real, sempre que um usuário fizesse uma requisiçao solicitando seus dados pessoais,
    // isso seria armazenado em cache para requisiçôes futuras.
    for (const user of users) {
        await client.set(`user_${user.id}_profile`, JSON.stringify(user));
    }

    // Se o usuário 5 fizesse uma requisiçao, solicitando seus dados pessoais:
    const user5 = JSON.parse((await client.get("user_5_profile")).value);
    console.log(user5);

    // Se o usuário 5 fizesse uma requisiçao, solicitando seus dados pessoais:
    const user10 = JSON.parse((await client.get("user_10_profile")).value);
    console.log(user10);

    // Se o usuário 27 fizesse uma requisiçao, solicitando seus dados pessoais:
    const user27 = JSON.parse((await client.get("user_27_profile")).value);
    console.log(user27);

    // Se o usuário 13 fizesse uma requisiçao, solicitando seus dados pessoais:
    const user13 = JSON.parse((await client.get("user_13_profile")).value);
    console.log(user13);
})();

// Caching de mensagens
(async () => {
    client.set(`sender_${senderId}_receiver_${receiverId}`, );
})();


