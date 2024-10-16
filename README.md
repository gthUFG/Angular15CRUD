# AngularCrud

Esse projeto é uma PoC (Prova de Conceito) relacionada à criação de um sistema CRUD desenvolvido com o framework Angular, de forma que permita ao usuário realizar operações como create, read, update e delete em sua lista de pacientes. O sistema conta com a validação dos campos de formulário e as mensagens de operação.
Esse projeto foi gerado com o Angular CLI (https://github.com/angular/angular-cli), versão 18.2.5.

## Tecnologias

- Angular 18.2.5
- PrimeNG
- Typescript
- HTML, CSS

## Pré-requisitos

- Node.js
- Angular CLI
- JSON-server

## Instalação

Clone este repositório:
```
git clone https://github.com/gthUFG/AngularCRUD
```

Instale as dependências:
```
npm install
```

Caso ainda não tenha o JSON-server instalado:
```
npm install -g json-server
```
Inicie o servidor json-server apontando para o arquivo db.json:
```
json-server db.json
```
O servidor será executado em http://localhost:3000.
A lista de pacientes pode ser encontrada em https://localhost:3000/person.

Inicie o servidor de desenvolvimento:
```
ng serve
```
Abra o navegador e acesse http://localhost:4200.

## Backlog

- Cadastro, edição, listagem e deleção de pacientes.
- Validação dos formulários.
- Notificações de formulários incorretos.


## Uso do programa

Função CREATE:
  1. Clique em "+ Registrar", no campo ao lado do de pesquisa.
  2. Preencha os campos de forma adequada.
  3. Em caso de falha na obtenção das informações, o usuário será informado com um alerta.
  4. Clique em "Registrar", na parte inferior direita.
  5. A página será atualizada automaticamente com a nova lista de pacientes.

Função READ:
  1. Todos os dados dos pacientes são disponibilizados na tabela.
  2. Para filtrar pacientes pelo nome, digite o nome ou sobrenome destes no campo de pesquisa.

Função UPDATE:
  1. Clique em editar (ícone de um lápis), no campo do paciente em questão.
  2. Preencha os campos de forma adequada.
  3. Em caso de falha na obtenção das informações, o usuário será informado com um alerta.
  4. Clique em "Atualizar Dados", na parte inferior direita.
  5. A página será atualizada automaticamente com a nova lista de pacientes.

Função DELETE:
  1. Clique em deletar (ícone de um X), no campo do paciente em questão.
  2. A página será atualizada automaticamente com a nova lista de pacientes.
