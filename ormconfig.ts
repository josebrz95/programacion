import {DataSource} from "typeorm";

export const connectionSource = new DataSource({
      migrationsTableName: 'migrations',
      type: 'sqlite',
      database: 'src/database/database.sqlite',
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

