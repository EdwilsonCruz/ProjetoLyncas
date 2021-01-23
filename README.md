# Teste para .Net C# Dev

[![Lyncas Logo](https://img-dev.feedback.house/TCo5z9DrSyX0EQoakV8sJkx1mSg=/fit-in/300x300/smart/https://s3.amazonaws.com/feedbackhouse-media-development/modules%2Fcore%2Fcompany%2F5c9e1b01c5f3d0003c5fa53b%2Flogo%2F5c9ec4f869d1cb003cb7996d)](https://www.lyncas.net)
### Requisitos

- Google books (https://developers.google.com/books/)

### Diferencial

- Testes unitários
- Backend e frontend em microserviços distintos

## Como participar?

1. Faça um clone deste repositório.
2. Quando estiver finalizado a prova, compartilhe seu código no seu Git de preferência e nos envie para o e-mail que consta ao final desse documento.
3. Faremos nossa análise e te daremos um retorno.

## Detalhes da prova

### Critérios analisados

- Arquitetura do projeto (camadas)
- Aplicação de orientação a objeto
- Funcionalidades e funcionamento

### O que você deve desenvolver

- A prova consiste em criar uma interface Web para interação com o Google books.
- Seu projeto deve também conter um arquivo README com a explicação das tecnologias utilizadas e as instruções para rodar.
- Descrever suas dificuldades e facilidades, bem como o número de horas de desenvolvimento.
- A comunicação com o Google Books API deve ser feita utilizando um HttpClient padrão, feito na mão e sem o uso de qualquer library.
- O Google Books API é aberto e não requer nenhuam autenticação.

### Funcionalidades

A App deve conter as seguintes funcionalidades:

São 2 menus: Pesquisa, Meus favoritos

1. Pesquisar livros no Google books e exibir em tela (com a foto e descrição resumida)
2. Salvar livros em uma lista de "meus favoritos" (localmente na base escolhida)
3. Listar e excluir livros favoritos
4. Exibir alerta de confirmaçao de exclusão

### Especificações técnicas

* O App deve se comunicar com o Google Books API pelo backend .Net e não fazer uso de nenhuma lib
* Você pode optar pelo padrão MVC ou Front-end separado.

### Recursos usados
Microsoft.AspNetCore.Mvc Version="2.2.0
FileContextCore Version="3.4.0"
Microsoft.EntityFrameworkCore Version="3.1.6"

** Front-end separado
Usando fetch para fazer toda a chamada da api. 
Materialize para o layout e interações em tela, o js do materialize usa Ajax.

### Problemas
** Cors
Não consegui resolver quando o method era delete. Error de Origin null 
** FileContextCore
Nãp funciona com a versao 5.0.1 do Entity, como o projeto ja estava na versao 5 perdi um tempo pra acertar as versoes junto a documentação
Opto por usar FileContextCore quando não tenho um banco de dados, disponivel.



