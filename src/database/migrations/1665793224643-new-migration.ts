import { MigrationInterface, QueryRunner } from "typeorm";

export class newMigration1665793224643 implements MigrationInterface {
    name = 'newMigration1665793224643'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categories" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "temporary_products" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" text NOT NULL, "amount" integer NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "categoryId" varchar)`);
        await queryRunner.query(`INSERT INTO "temporary_products"("id", "name", "description", "amount", "created_at", "updated_at") SELECT "id", "name", "description", "amount", "created_at", "updated_at" FROM "products"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`ALTER TABLE "temporary_products" RENAME TO "products"`);
        await queryRunner.query(`CREATE TABLE "temporary_products" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" text NOT NULL, "amount" integer NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "categoryId" varchar, CONSTRAINT "FK_ff56834e735fa78a15d0cf21926" FOREIGN KEY ("categoryId") REFERENCES "categories" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_products"("id", "name", "description", "amount", "created_at", "updated_at", "categoryId") SELECT "id", "name", "description", "amount", "created_at", "updated_at", "categoryId" FROM "products"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`ALTER TABLE "temporary_products" RENAME TO "products"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" RENAME TO "temporary_products"`);
        await queryRunner.query(`CREATE TABLE "products" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" text NOT NULL, "amount" integer NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "categoryId" varchar)`);
        await queryRunner.query(`INSERT INTO "products"("id", "name", "description", "amount", "created_at", "updated_at", "categoryId") SELECT "id", "name", "description", "amount", "created_at", "updated_at", "categoryId" FROM "temporary_products"`);
        await queryRunner.query(`DROP TABLE "temporary_products"`);
        await queryRunner.query(`ALTER TABLE "products" RENAME TO "temporary_products"`);
        await queryRunner.query(`CREATE TABLE "products" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" text NOT NULL, "amount" integer NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "products"("id", "name", "description", "amount", "created_at", "updated_at") SELECT "id", "name", "description", "amount", "created_at", "updated_at" FROM "temporary_products"`);
        await queryRunner.query(`DROP TABLE "temporary_products"`);
        await queryRunner.query(`DROP TABLE "categories"`);
    }

}
