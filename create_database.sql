CREATE DATABASE rede_social;

USE rede_social;

-- Tabela Usuario
CREATE TABLE Usuario (
    usuarioId INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    apelido VARCHAR(255) NOT NULL,
    tipo ENUM('viajante', 'respresentante_localidade')
);

-- Tabela Mensagem
CREATE TABLE Mensagem (
    mensagemId INT AUTO_INCREMENT,
    emissorId INT,
    receptorId INT,
    conteudo TEXT NOT NULL,
    dataEnvio DATETIME NOT NULL,
    PRIMARY KEY(mensagemId, emissorId, receptorId)
);


-- Tabela Comunidade
CREATE TABLE Comunidade (
    comunidadeId INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL
);

-- Tabela Comunidade_Usuario
CREATE TABLE Comunidade_Usuario (
	comunidadeId INT,
   usuarioId INT,
   cargo ENUM('dono', 'participante'),
   PRIMARY KEY (comunidadeId, usuarioId)
);

-- Tabela Publicacao
CREATE TABLE Publicacao (
    publicacaoId INT AUTO_INCREMENT PRIMARY KEY,
    conteudo TEXT NOT NULL,
    curtidas INT NOT NULL
);

-- Tabela Comunidade_Publicacao
CREATE TABLE Comunidade_Publicacao (
	publicacaoId INT,
   comunidadeId INT,
   PRIMARY KEY (publicacaoId, comunidadeId)
);

-- Tabela Evento
CREATE TABLE Evento (
    eventoId INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT NOT NULL,
    horario TIME NOT NULL,
    data_evento DATE NOT NULL
);

-- Tabela Evento_Usuario
CREATE TABLE Evento_Usuario (
	usuarioId INT,
    eventoId INT,
    PRIMARY KEY (usuarioId, eventoId)
);

-- Tabela RoteiroViagem
CREATE TABLE RoteiroViagem (
    roteiroViagemId INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    conteudo TEXT NOT NULL
);

-- Tabela Localidade
CREATE TABLE Localidade (
    localidadeId INT AUTO_INCREMENT PRIMARY KEY,
    cidade VARCHAR(255) NOT NULL,
    estado VARCHAR(255)NOT NULL,
    bairro VARCHAR(255) NOT NULL
);

-- Tabela Localidade_RoteiroViagem
CREATE TABLE Localidade_RoteiroViagem (
	localidadeId INT,
   roteiroViagemId INT,
	PRIMARY KEY (localidadeId, roteiroViagemId)
);

-- Tabela Comentario
CREATE TABLE Comentario (
    comentarioId INT AUTO_INCREMENT PRIMARY KEY,
    texto TEXT NOT NULL
);

-- Tabela Avaliacao
CREATE TABLE Avaliacao (
    avaliacaoId INT AUTO_INCREMENT PRIMARY KEY,
    nota INT NOT NULL,
    texto TEXT NOT NULL
);

-- Adicionando chaves estrangeiras
ALTER TABLE Mensagem
ADD CONSTRAINT fk_emissor
FOREIGN KEY (emissorId) REFERENCES Usuario(usuarioId);

ALTER TABLE Mensagem
ADD CONSTRAINT fk_receptor
FOREIGN KEY (receptorId) REFERENCES Usuario(usuarioId);

ALTER TABLE Publicacao
ADD usuarioId INT,
ADD CONSTRAINT fk_usuario
FOREIGN KEY (usuarioId) REFERENCES Usuario(usuarioId);

ALTER TABLE Publicacao
ADD comunidadeId INT,
ADD CONSTRAINT fk_comunidade_pertencente
FOREIGN KEY (comunidadeId) REFERENCES Comunidade(comunidadeId);

ALTER TABLE Comunidade_Publicacao
ADD CONSTRAINT fk_publicacao
FOREIGN KEY (publicacaoId) REFERENCES Publicacao(publicacaoId);

ALTER TABLE Comunidade_Publicacao
ADD CONSTRAINT fk_comunidade
FOREIGN KEY (comunidadeId) REFERENCES Comunidade(comunidadeId);

ALTER TABLE Comunidade_Usuario
ADD CONSTRAINT fk_usuario_participante
FOREIGN KEY (usuarioId) REFERENCES Usuario(usuarioId);

ALTER TABLE Comunidade_Usuario
ADD CONSTRAINT fk_comunidade_participante
FOREIGN KEY (comunidadeId) REFERENCES Comunidade(comunidadeId);

ALTER TABLE Evento
ADD localidadeId INT,
ADD CONSTRAINT fk_localidade_evento
FOREIGN KEY (localidadeId) REFERENCES Localidade(localidadeId);

ALTER TABLE Evento_Usuario
ADD CONSTRAINT fk_usuario_evento
FOREIGN KEY (usuarioId) REFERENCES Usuario(usuarioId);

ALTER TABLE Evento_Usuario
ADD CONSTRAINT fk_evento_usuario
FOREIGN KEY (eventoId) REFERENCES Evento(eventoId);

ALTER TABLE RoteiroViagem
ADD usuarioId INT,
ADD CONSTRAINT fk_usuario_roteiro
FOREIGN KEY (usuarioId) REFERENCES Usuario(usuarioId);

ALTER TABLE Localidade_RoteiroViagem
ADD CONSTRAINT fk_localidade_roteiro
FOREIGN KEY (localidadeId) REFERENCES Localidade(localidadeId);

ALTER TABLE Localidade_RoteiroViagem
ADD CONSTRAINT fk_roteiro
FOREIGN KEY (roteiroViagemId) REFERENCES RoteiroViagem(roteiroViagemId);

ALTER TABLE Comentario
ADD publicacaoId INT,
ADD CONSTRAINT fk_publicacao_comentario
FOREIGN KEY (publicacaoId) REFERENCES Publicacao(publicacaoId);

ALTER TABLE Comentario
ADD usuarioId INT,
ADD CONSTRAINT fk_usuario_comentario
FOREIGN KEY (usuarioId) REFERENCES Usuario(usuarioId);

ALTER TABLE Avaliacao
ADD roteiroViagemId INT,
ADD CONSTRAINT fk_roteiro_avaliacao
FOREIGN KEY (roteiroViagemId) REFERENCES RoteiroViagem(roteiroViagemId);

ALTER TABLE Avaliacao
ADD usuarioId INT,
ADD CONSTRAINT fk_usuario_avaliacao
FOREIGN KEY (usuarioId) REFERENCES Usuario(usuarioId);