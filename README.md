# Projeto_Integrador_2

## Banco de Dados

Este projeto utiliza o banco de dados relacional **MySQL** na versão **8.0.34**.

# CHAT - Serviço 01 - Testes de Carga 01 

* Tipos de operação: leitura, inserção e atualização
* O diretório "chat" do repositório é todo dedicado a esta funcionalidade
* Data de medição: 16/11/2023
* Para o projeto funcionar, é necessário subir o banco de dados e o chat em container
* Os testes de carga foram feitos com o grafana/K6, onde foram gerados dashboards com os dados obtidos, além da criação de gráficos da latência, vazão e concorrência a partir de um arquivo .csv. As imagens abaixo são referentes aos testes:


## Dashboard 01 da funcionalidade CHAT ##

![image](https://github.com/jojoDev02/Projeto_Integrador_2/blob/main/images/chat_dashboard_01.png?raw=true)

## Dashboard 02 da funcionalidade CHAT ##

![image](https://github.com/jojoDev02/Projeto_Integrador_2/blob/main/images/chat_dashboard_02.png?raw=true)

## Gráfico de latência da funcionalidade CHAT ##

![image](https://github.com/jojoDev02/Projeto_Integrador_2/blob/main/images/chat_latencia.png?raw=true)

## Gráfico de vazão da funcionalidade CHAT ##

![image](https://github.com/jojoDev02/Projeto_Integrador_2/blob/main/images/chat_vazao.png?raw=true)

## Gráfico de concorrência da funcionalidade CHAT ##

![image](https://github.com/jojoDev02/Projeto_Integrador_2/blob/main/images/chat_concorrencia.png?raw=true)


# CHAT - Serviço 01 - Testes de Carga 02 

* Tipos de operação: leitura, inserção e atualização
* O diretório "chat" do repositório é todo dedicado a esta funcionalidade
* Data de medição: 30/11/2023
* Para o projeto funcionar, é necessário subir o banco de dados e o chat em container
* Otimização: mais informações nas dashboards, já que aprimoramos o serviço de chat. Agora é possível ver a taxa de dados do serviço, além de demorar menos tempo nos testes. É possível ver o usuário enviando e o recebimento da mensagem. Um gargalo no teste de carga 01 foi a falta da funcionalidade de desconectar do chat. Ao identificarmos esse problema, resolvemos a funcionalidade e foi possível essa otimização e nova geração de dados.
* Arquivos modificados: https://github.com/jojoDev02/Projeto_Integrador_2/blob/feat/memcached/chat/loadtest.js, https://github.com/jojoDev02/Projeto_Integrador_2/blob/feat/memcached/chat/bin/populate.js, https://github.com/jojoDev02/Projeto_Integrador_2/blob/feat/memcached/chat/src/index.js, https://github.com/jojoDev02/Projeto_Integrador_2/tree/feat/memcached/chat/src/models, https://github.com/jojoDev02/Projeto_Integrador_2/tree/feat/memcached/chat/src/services
* Os testes de carga foram feitos com o grafana/K6, onde foram gerados dashboards com os dados obtidos, além da criação de gráficos da latência, vazão e concorrência a partir de um arquivo .csv. As imagens abaixo são referentes aos testes:


## Dashboard 01 da funcionalidade CHAT ##

![image](https://github.com/jojoDev02/Projeto_Integrador_2/blob/main/images/test_02_dash_chat_01.png?raw=true)

## Dashboard 02 da funcionalidade CHAT ##

![image](https://github.com/jojoDev02/Projeto_Integrador_2/blob/main/images/test_02_dash_chat_02.png?raw=true)

## Gráfico de latência da funcionalidade CHAT ##

![image](https://github.com/jojoDev02/Projeto_Integrador_2/blob/main/images/test_02_latencia_chat.png?raw=true)

## Gráfico de vazão da funcionalidade CHAT ##

![image](https://github.com/jojoDev02/Projeto_Integrador_2/blob/main/images/test_02_vazao_chat.png)

## Gráfico de concorrência da funcionalidade CHAT ##

![image](https://github.com/jojoDev02/Projeto_Integrador_2/blob/main/images/test_02_concorrencia_chat.png)


# Registrar usuário - Serviço 02 - Carga de Testes 01 

* Tipos de operação: inserção
* https://github.com/jojoDev02/Projeto_Integrador_2/blob/main/server/repositories/usuario_repository.py, https://github.com/jojoDev02/Projeto_Integrador_2/blob/main/server/models/usuario.py, https://github.com/jojoDev02/Projeto_Integrador_2/blob/main/server/controllers/registration_controller.py
* Data de medição: 16/11/2023
* Para o projeto funcionar, é necessário subir o banco de dados e o server em container
* Os testes de carga foram feitos com o grafana/K6, onde foram gerados dashboards com os dados obtidos, além da criação de gráficos da latência, vazão e concorrência a partir de um arquivo .csv. As imagens abaixo são referentes aos testes:

## Dashboard 01 da funcionalidade Registrar Usuário ##

![image](https://github.com/jojoDev02/Projeto_Integrador_2/blob/main/images/user_dashboard_01.png?raw=true)

## Dashboard 02 da funcionalidade Registrar Usuário ##

![image](https://github.com/jojoDev02/Projeto_Integrador_2/blob/main/images/user_dashboard_02.png?raw=true)

## Gráfico de latência da funcionalidade Registrar Usuário ##

![image](https://github.com/jojoDev02/Projeto_Integrador_2/blob/main/images/user_latencia.png?raw=true)

## Gráfico de vazão da funcionalidade Registrar Usuário ##

![image](https://github.com/jojoDev02/Projeto_Integrador_2/blob/main/images/vazao_user.png?raw=true)

## Gráfico de concorrência da funcionalidade Registrar Usuário ##

![image](https://github.com/jojoDev02/Projeto_Integrador_2/blob/main/images/user_concorrencia.png?raw=true)

# Registrar usuário - Serviço 02 - Carga de Testes 02 

* Tipos de operação: inserção
* https://github.com/jojoDev02/Projeto_Integrador_2/blob/main/server/repositories/usuario_repository.py, https://github.com/jojoDev02/Projeto_Integrador_2/blob/main/server/models/usuario.py, https://github.com/jojoDev02/Projeto_Integrador_2/blob/main/server/controllers/registration_controller.py
* Data de medição: 30/11/2023
* Para o projeto funcionar, é necessário subir o banco de dados e o server em container
* Arquivos modificados: https://github.com/jojoDev02/Projeto_Integrador_2/blob/feat/memcached/server/middlewares/validacao.py, https://github.com/jojoDev02/Projeto_Integrador_2/blob/feat/memcached/loadtest.js.js
* Otimização: nos testes anteriores, estávamos testando apenas com 1 usuário. Agora melhoramos a dashboard com requisições mais variadas, aumentamos para 5 usuários diferentes.
* Os testes de carga foram feitos com o grafana/K6, onde foram gerados dashboards com os dados obtidos, além da criação de gráficos da latência, vazão e concorrência a partir de um arquivo .csv. As imagens abaixo são referentes aos testes:


## Dashboard 01 da funcionalidade Registrar Usuário ##

![image](https://github.com/jojoDev02/Projeto_Integrador_2/blob/main/images/test_02_dash_user_01.png?raw=true)

## Dashboard 02 da funcionalidade Registrar Usuário ##

![image](https://github.com/jojoDev02/Projeto_Integrador_2/blob/main/images/test_02_dash_user_02.png?raw=true)

## Gráfico de latência da funcionalidade Registrar Usuário ##

![image](https://github.com/jojoDev02/Projeto_Integrador_2/blob/main/images/test_02_latencia_user.png?raw=true)

## Gráfico de vazão da funcionalidade Registrar Usuário ##

![image](https://github.com/jojoDev02/Projeto_Integrador_2/blob/main/images/test_02_vazao_user.png?raw=true)

## Gráfico de concorrência da funcionalidade Registrar Usuário ##

![image](https://github.com/jojoDev02/Projeto_Integrador_2/blob/main/images/test_02_concorrencia_user.png?raw=true)
