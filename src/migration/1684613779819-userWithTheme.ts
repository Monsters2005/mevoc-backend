import {MigrationInterface, QueryRunner} from "typeorm";

export class userWithTheme1684613779819 implements MigrationInterface {
    name = 'userWithTheme1684613779819'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "app_entity" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_785e980b5ae9d53bf5e6dc74c85" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "wordpack_word" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "wordNative" character varying NOT NULL, "wordLearning" character varying NOT NULL, CONSTRAINT "PK_f483a29fa3c8e4d13b841c9d630" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD "theme" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "accentColor" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "textSize" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "textColor" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "textColor"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "textSize"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "accentColor"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "theme"`);
        await queryRunner.query(`DROP TABLE "wordpack_word"`);
        await queryRunner.query(`DROP TABLE "app_entity"`);
    }

}
