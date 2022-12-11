import {MigrationInterface, QueryRunner} from "typeorm";

export class Fixes1667061097033 implements MigrationInterface {
    name = 'Fixes1667061097033'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "app_entity" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_785e980b5ae9d53bf5e6dc74c85" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "email" character varying NOT NULL, "password" character varying NOT NULL, "avatar" character varying, "username" character varying, "firstName" character varying NOT NULL, "lastName" character varying, "dob" TIMESTAMP, "phoneNumber" character varying, "nativeLang" character varying, "learningLang" character varying, "location" character varying, "refreshToken" character varying NOT NULL DEFAULT '', "confirmed" boolean, "confirmed_hash" character varying, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "wordpack_word" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "wordNative" character varying NOT NULL, "wordLearning" character varying NOT NULL, CONSTRAINT "PK_f483a29fa3c8e4d13b841c9d630" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "list" ADD CONSTRAINT "FK_784b5f1d7ea61053247d32246cd" FOREIGN KEY ("userIdId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "list" DROP CONSTRAINT "FK_784b5f1d7ea61053247d32246cd"`);
        await queryRunner.query(`DROP TABLE "wordpack_word"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "app_entity"`);
    }

}
