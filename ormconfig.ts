import {DataSource} from "typeorm";

export const connectionSource = new DataSource({
      migrationsTableName: 'migrations',
      synchronize: false,
      type: 'mysql',
      host: "localhost",
      port: 3306,
      username: "root",
      password: "root",
      database: 'database',
      entities: ['src/entities/*.ts'],
      migrations: ['src/database/migrations/*.ts']
});

connectionSource.initialize()
    .then(() => {
      console.log("Data Source has been initialized!")
    })
    .catch((err) => {
      console.error("Error during Data Source initialization", err)
    });

