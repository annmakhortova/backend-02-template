const http = require("http");
const getUsers = require("./modules/users");

const server = http.createServer((request, response) => {
  // Написать обработчик запроса:
  // - Ответом на запрос `?hello=<name>` должна быть **строка** "Hello, <name>.", код ответа 200
  // - Если параметр `hello` указан, но не передано `<name>`, то ответ **строка** "Enter a name", код ответа 400
  // - Ответом на запрос `?users` должен быть **JSON** с содержимым файла `data/users.json`, код ответа 200
  // - Если никакие параметры не переданы, то ответ **строка** "Hello, World!", код ответа 200
  // - Если переданы какие-либо другие параметры, то пустой ответ, код ответа 500

  const ipAddress = "http://127.0.0.1";
  const url = new URL(request.url, ipAddress);
  const userName = url.searchParams.get("hello");

  if (request.url === `/?hello=<name>`) {
    response.status = 200;
    response.statusMessage = "ok";
    response.header = "Content-Type: text/plain";
    response.write(`Hello, <name>`);
    response.end();

    return;
  }

  if (request.url === `?users`) {
    response.status = 200;
    response.statusMessage = "ok";
    response.header = "Content-Type: application/json";
    response.write(getUsers());
    response.end();

    return;
  }

  if (!request.url) {
    response.status = 200;
    response.statusMessage = "ok";
    response.header = "Content-Type: text/plain";
    response.write(`Hello, World!`);
    response.end();

    return;
  }

  response.status = 500;
});

server.listen(3003, () =>
  console.log(`Сервер запущен по адресу http://127.0.0.1:3003`)
);