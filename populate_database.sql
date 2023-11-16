use rede_social;

-- Inserir registros na tabela Usuario
INSERT INTO Usuario (nome, email, senha, apelido, tipo) VALUES
('João da Silva', 'joao@example.com', 'senha123', 'joao123',1),
('Maria Santos', 'maria@example.com', 'senha456', 'maria456', 2),
('Pedro Oliveira', 'pedro@example.com', 'senha789', 'pedro789', 1),
('Ana Souza', 'ana@example.com', 'senha101', 'ana101', 2);


-- Inserir registros na tabela Comunidade
INSERT INTO Comunidade (nome) VALUES
('Comunidade Trilheiros'),
('Comunidade Amantes da Natureza'),
('Comunidade Gastronomia na Estrada'),
('Comunidade MotorHomers');


-- Inserir registros na tabela Publicacao
INSERT INTO Publicacao (conteudo, curtidas, usuarioId) VALUES
('Primeira publicação sobre minha viagem à Europa!', 120, 1),
('Descobri um lugar incrível para fazer trilhas!', 45, 2),
('Receita deliciosa de lasanha italiana!', 78, 3),
('Conhecendo novas culturas no sudeste asiático.', 95, 2),
('Dicas para economizar em viagens.', 63, 1);

-- Inserir dados na tabela Localidade
INSERT INTO Localidade (cidade, estado, bairro) VALUES
('Roma', 'Lácio', 'Centro Histórico'),
('Manaus', 'Amazonas', 'Parque das Aves'),
('Denver', 'Colorado', 'Bairro Mountain View'),
('Roma', 'Lácio', 'Centro Histórico'),
('Manaus', 'Amazonas', 'Parque das Aves'),
('Denver', 'Colorado', 'Bairro Mountain View');

INSERT INTO Amizade (solicitanteId, receptorId) VALUES
(1, 2),
(3, 4),
(1, 3),

-- Inserir registros na tabela Evento
INSERT INTO Evento (titulo, descricao, horario, data_evento, localidadeId) VALUES
('Workshop de Fotografia', 'Aprenda técnicas avançadas de fotografia.', '14:00:00', '2023-12-10',1),
('Trilha na Montanha', 'Uma aventura emocionante nas montanhas locais.', '09:30:00', '2023-11-25',2),
('Festival Gastronômico', 'Experimente pratos deliciosos de chefs renomados.', '19:00:00', '2024-02-05',3);


-- Inserir registros na tabela Comentario
INSERT INTO Comentario (texto, publicacaoId, usuarioId) VALUES
('Ótima publicação! Adorei as fotos.', 1, 3),
('Qual a trilha que você fez? Parece incrível!', 2, 4),
('Vou tentar fazer essa receita neste fim de semana.', 3, 2);

-- Inserir registros de roteiroViagem
INSERT INTO RoteiroViagem (titulo, conteudo, usuarioId) VALUES
('Descobrindo a História de Roma', 'Um roteiro incrível para explorar o Centro Histórico de Roma, visitando o Coliseu, o Fórum Romano e muitos outros pontos históricos.', 1),
('Aventura na Selva Amazônica', 'Uma jornada emocionante pela selva amazônica em Manaus, onde você poderá explorar a floresta, observar a vida selvagem e experimentar a cultura local.', 2),
('Explorando as Montanhas de Denver', 'Um emocionante roteiro de caminhadas pelas Montanhas Rochosas de Denver, com vistas panorâmicas deslumbrantes e trilhas desafiadoras.', 3);

-- Inserir usuarios nas comunidades
INSERT INTO Comunidade_Usuario (comunidadeId, usuarioId) VALUES
(1, 1),
(1, 3), 
(2, 2),
(3, 4); 

-- Inserir localidades nos roteiros
INSERT INTO Localidade_RoteiroViagem (localidadeId, roteiroViagemId) VALUES
(1, 1), -- Roma no roteiro "Descobrindo a História de Roma"
(2, 1), -- Veneza no roteiro "Descobrindo a História de Roma"
(3, 1), -- Florença no roteiro "Descobrindo a História de Roma"
(4, 2), -- Selva Amazônica no roteiro "Aventura na Selva Amazônica"
(5, 3), -- Montanhas Rochosas no roteiro "Explorando as Montanhas de Denver"
(6, 3); -- Denver no roteiro "Explorando as Montanhas de Denver"

-- Inserir dados na tabela Avaliacao
INSERT INTO Avaliacao (nota, texto, roteiroViagemId, usuarioId) VALUES
(5, 'Excelente roteiro! Recomendo a todos.', 1, 1),
(4, 'A trilha foi desafiadora, mas valeu a pena.', 2, 2),
(5, 'A comida estava divina!', 3, 3);

-- Associando usuarios a eventos
INSERT INTO Evento_Usuario (usuarioId, eventoId) VALUES
(1, 1), 
(2, 1), 
(3, 2); 

-- Conversa entre usuário 1 e usuário 2
INSERT INTO Mensagem (conteudo, dataEnvio, remetenteId, destinatarioId) VALUES
('Olá, como você está?', '2023-10-06 09:00:00', 1, 2),
('Estou bem, obrigado! Como foi o seu dia?', '2023-10-06 09:05:00', 2, 1),
('Meu dia foi ótimo! Fui ao parque e depois ao cinema.', '2023-10-06 09:10:00', 1, 2),
('Que legal! Qual filme você assistiu?', '2023-10-06 09:15:00', 2, 1),
('Assisti a um filme de ação, foi emocionante.', '2023-10-06 09:20:00', 1, 2);

-- Conversa entre usuário 3 e usuário 1
INSERT INTO Mensagem (conteudo, dataEnvio, remetenteId, destinatarioId) VALUES
('Vamos nos encontrar amanhã?', '2023-10-07 14:30:00', 3, 1),
('Claro, onde?', '2023-10-07 14:35:00', 1, 3),
('Que tal no parque da cidade?', '2023-10-07 14:40:00', 3, 1),
('Ótima ideia! Que horas?', '2023-10-07 14:45:00', 1, 3),
('Podemos nos encontrar às 15h?', '2023-10-07 14:50:00', 3, 1),
('Perfeito, nos vemos lá!', '2023-10-07 14:55:00', 1, 3);
