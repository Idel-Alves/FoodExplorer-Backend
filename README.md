# Food Explorer API

<p align="center">
  <img src="https://github.com/user-attachments/assets/d23ef7b1-21e5-42c9-9c6e-52851804597c">
</p>



## Projeto 📁
O projeto Food Explorer é o desafio final do programa Explorer da Rocketseat. Ele consiste no desenvolvimento de uma aplicação de cardápio digital para um restaurante fictício.

O back-end, que gerencia a lógica e o armazenamento de dados, pode ser acessado neste repositório. O front-end, por sua vez, que cuida da interface do usuário, está disponível [aqui](https://github.com/Idel-Alves/FoodExplorer-Frontend).

## Estrutura 📌
### O projeto conta com as seguintes pastas:
<ul>
  <li>Controllers de Dishes, Users, Sessions, Favorits, Avatar e DishImage</li>
  <li>Routes de Dishes, Users, Sessions, Favorits</li>
  <li>Utils</li>
  <li>Middleware</li>
  <li>tmp</li>
  <li>Database</li>
  <li>Configs</li>
  <li>Server</li>
</ul>

## Tecnologias 💻
### Este projeto foi desenvolvido com as seguintes tecnologias:
<ul>
  <li>Node.js</li>
  <li>Express.js</li>
  <li>Knex.js</li>
  <li>SQLite</li>
  <li>SQLite3</li>
  <li>Bcrypt.js</li>
  <li>CORS</li>
  <li>express-async-errors</li>
   <li>Multer</li>
  <li>JSON Web Token</li>
  <li>Dotenv</li>
  <li>PM2</li>
</ul>

## Utilização 🚀
⚠️ **Importante:** Este projeto utiliza uma hospedagem gratuita para o back-end, o que pode ocasionar alguns atrasos no tempo de resposta do servidor.

O back-end do projeto está hospedado no endereço https://foodexplorer-backend-6a6y.onrender.com . A aplicação Food Explorer está disponível para uso [aqui](https://foodexplorer-idel.netlify.app/)

Você também pode executá-lo em sua máquina localmente. Certifique-se de ter o Node.js e o npm instalados antes de prosseguir com as etapas abaixo:

## Como rodar o projeto

### 1. Clone o projeto
$ git clone https://github.com/Idel-Alves/FoodExplorer-Backend.git

### 2. Acesse a pasta do projeto:
$ cd FoodExplorer-Backend

### 3. Instale as dependências:
$ npm install

### 4. npm run dev
**Se tudo correr bem, esta mensagem aparecerá no terminal:**
Server is running on port 3000

### 5. Execute as migrações:
$ npm run migrate

### 6. Inicie o servidor:
$ npm start

⚠️ **Importante:** Crie um arquivo .env de acordo com o arquivo .env.example e preencha os campos AUTH_SECRET e PORT com suas respectivas informações.
<ul>
   <li>Para gerar o valor do campo AUTH_SECRET, você pode usar o MD5 Hash Generator para criar uma sequência de caracteres segura.</li>
   <li>Insira o número da porta desejada no campo PORT para iniciar o servidor da aplicação.</li>
</ul>

##

<div align="center">
  Projeto desenvolvido com ❤️ por Idel Alves 👋🏾
</div>
