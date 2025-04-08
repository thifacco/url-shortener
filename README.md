![Logo of the project](https://github.com/thifacco/url-shortener/blob/master/public/assets/url-shortner.png)


## URL Shortner API
Essa aplicação é uma API Rest desenvolvida com Node / NestJS para encurtar links de maneira rápida e simples.


## Tecnologias 

Essas foram as tecnologias usadas nesse projeto:

* NodeJs versão 16.0.0
* NestJS versão 9.0.0
* MongoDB versão 6.0
* Docker versão 2

## Serviços

* [Docker daemon](https://docs.docker.com/get-docker/)

## NPM packages

* Moment
* Mongoose
* Nanoid
* RxJS
* Valid URL

## Getting started

* Dependências
  - Node
  - Docker daemon

* Para instalar as dependências do projeto:
```bash
npm install
```
  
* Para iniciar a aplicação:
```bash
npm run start:dev
```
Esse comando irá iniciar o Docker e criar a imagem do banco de dados MongoBD automaticamente.
  
* Para visualizar a aplicação no navegador: `npm home` ou [http://localhost:3000/api](http://localhost:3000/api)

## Como usar a aplicaçao

### 1 - Quando você acessar a url do projeto, verá a interface do SwaggerUI.

![Homepage image](https://github.com/thifacco/url-shortener/blob/master/public/screenshots/home.png)

### 2 - Você pode navegar pela assinatura do endpoint POST /url e depois clicar no botão "Try it out" para testar a criação de um encurtamento de link.

- Adicione o link que pretende encurtar no campo "originalUrl" do request body

- Clique no botão "Execute"

![post-url](https://github.com/thifacco/url-shortener/blob/master/public/screenshots/post-url.png)

### 3 - Navegue pelo endpoint GET /urls para visualizar a lista de urls encurtadas.

- Clique no botão "Try it out" e depois em "Execute"

![get-urls](https://github.com/thifacco/url-shortener/blob/master/public/screenshots/get-urls.png)

- Aparecerá a lista de todas urls encurtadas criadas anteriormente.

![get-urls-response](https://github.com/thifacco/url-shortener/blob/master/public/screenshots/get-urls-response.png)

### 4 - Navegue pelo endpoint GET /urls/{hashCode} e busque pelo código hash da url encurtada.

- Clique no botão "Try it out", informe o código no campo "hashCode" e clique no botão "Execute"

![get-urls-hashcode](https://github.com/thifacco/url-shortener/blob/master/public/screenshots/get-urls-hashcode.png)

- Você verá o registro da url encurtada:

![get-urls-hashcode-response](https://github.com/thifacco/url-shortener/blob/master/public/screenshots/get-urls-hashcode-response.png)

### 5 - Navegue pelo endpoint PATCH /urls/disable para desabilitar a url encurtada pelo código.

- Clique no botão "Try it out", informe o código no campo "hashCode" e clique no botão "Execute"

![patch-urls-disable](https://github.com/thifacco/url-shortener/blob/master/public/screenshots/patch-urls-disable.png)

- Se o código informado estiver correto, o response irá retornar a mensagem `{ "success": true }`.

![patch-urls-disable-success](https://github.com/thifacco/url-shortener/blob/master/public/screenshots/patch-urls-disable-success.png)


## Features

As principais funcionalidades dessa aplicação são:
 - Encurtar um link
 - Salvar o link encurtado
 - Redirecionar o link curto para o link original
 - Contagem de cliques do link curto
 - Expiração do link curto por data


## Links
  - Repositório: [https://github.com/thifacco/url-shortener](https://github.com/thifacco/url-shortener)

  ## Versioning

  1.0.0.0


  ## Autor

  * **Tiago Luis Facco** 

  Siga-me no github e vamos juntos!
  Obrigado pela visita e bons códigos!
