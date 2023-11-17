# Projeto_Integrador_2

## Banco de Dados

Este projeto utiliza o banco de dados relacional **MySQL** na versão **8.0.34**.

## CHAT - Serviço 01 ##

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


## Registrar usuário - Serviço 02 ##

* Tipos de operação: inserção
* https://github.com/jojoDev02/Projeto_Integrador_2/blob/main/server/repositories/usuario_repository.py, https://github.com/jojoDev02/Projeto_Integrador_2/blob/main/server/models/usuario.py, https://github.com/jojoDev02/Projeto_Integrador_2/blob/main/server/controllers/registration_controller.py
* Data de medição: 16/11/2023
* Para o projeto funcionar, é necessário subir o banco de dados e o server em container
* Os testes de carga foram feitos com o grafana/K6, onde foram gerados dashboards com os dados obtidos, além da criação de gráficos da latência, vazão e concorrência a partir de um arquivo .csv. As imagens abaixo são referentes aos testes:

