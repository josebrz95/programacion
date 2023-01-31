# CRUD Node.js
CRUD made with Node.js, Express, TypeScript, TypeORM, EJS &amp; MySQL.

![Home page image](https://github.com/sinvalbsneto/crud_nodejs/blob/main/public/img/home.png)

## How to run:
- Clone the repository.
- Run `npm install` to download the dependecies.
- Run `npm run database:up`. (install docker and docker-compose)
- Run `npm run migrations:generate` to generate the migrations.
  - If the docker logs throws `ERROR: ER_NOT_SUPPORTED_AUTH_MODE`, the following steps should be followed:
  - Enter to mysql container with command: `npm run database:enter`
  - Execute the following commands, where it says password to put the one defined there:
    - `ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';`
    - `flush privileges;`
  - Stop docker-compose with `npm run database:down`
  - Run `npm run database:up`
  - If it still fails to run everything back just without it @'localhost' like `ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'root';`
- Run `npm run migrations:run` to run the migrations.
- Run `npm run dev` to start the server.
- The CRUD will be avaiable at `http://localhost:3000`.
