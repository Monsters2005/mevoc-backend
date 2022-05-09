import { MigrationInterface, QueryRunner } from 'typeorm';

export class Users1651765167400 implements MigrationInterface {
  name = 'Users1651765167400';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "app_entity" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_785e980b5ae9d53bf5e6dc74c85" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "email" character varying NOT NULL, "password" character varying NOT NULL, "phone" character varying NOT NULL, "avatar" character varying NOT NULL, "username" character varying NOT NULL, "name" character varying NOT NULL, "lastname" character varying NOT NULL, "dob" TIMESTAMP NOT NULL, "nativeLang" character varying NOT NULL, "learningLang" character varying NOT NULL, "location" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "app_entity"`);
  }
}
