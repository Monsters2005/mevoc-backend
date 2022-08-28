import {MigrationInterface, QueryRunner} from "typeorm";

export class Lists1661698372755 implements MigrationInterface {
    name = 'Lists1661698372755'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "app_entity" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_785e980b5ae9d53bf5e6dc74c85" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "wordpack_word" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "wordNative" character varying NOT NULL, "wordLearning" character varying NOT NULL, CONSTRAINT "PK_f483a29fa3c8e4d13b841c9d630" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "wordpack_word"`);
        await queryRunner.query(`DROP TABLE "app_entity"`);
    }

}
