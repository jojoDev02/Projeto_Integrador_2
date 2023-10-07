-- recupera comentarios de uma publicacao
SELECT c.comentarioId, c.texto, u.nome AS nome_do_usuario
FROM Comentario c
JOIN Usuario u ON c.usuarioId = u.usuarioId
WHERE c.publicacaoId = 3;

-- recupera roterios e suas respectivas paradas
SELECT r.roteiroViagemId, r.titulo AS titulo_do_roteiro, l.localidadeId, l.cidade, l.estado, l.bairro
FROM RoteiroViagem r
JOIN Localidade_RoteiroViagem lr ON r.roteiroViagemId = lr.roteiroViagemId
JOIN Localidade l ON lr.localidadeId = l.localidadeId;

-- recupera chat entre um par de usuarios
SELECT m.mensagemId, m.conteudo, m.dataEnvio, u1.nome AS remetente, u2.nome AS destinatario
FROM Mensagem m
JOIN Usuario u1 ON m.remetenteId = u1.usuarioId
JOIN Usuario u2 ON m.destinatarioId = u2.usuarioId
WHERE (m.remetenteId = 1 AND m.destinatarioId = 2)
   OR (m.remetenteId = 2 AND m.destinatarioId = 1)
ORDER BY m.dataEnvio;

-- recupera avaliacoes de um roteiro
SELECT a.avaliacaoId, a.nota, a.texto, u.nome AS nome_do_usuario
FROM Avaliacao a
JOIN Usuario u ON a.usuarioId = u.usuarioId
WHERE a.roteiroViagemId = 2;
