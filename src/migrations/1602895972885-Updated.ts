import {MigrationInterface, QueryRunner} from "typeorm";

export class Updated1602895972885 implements MigrationInterface {
    name = 'Updated1602895972885'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying(100) NOT NULL, "passwordHash" character varying NOT NULL, "displayName" character varying, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "account" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "ownerId" uuid, CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "transaction" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "amount" double precision NOT NULL, "transactionDate" TIMESTAMP WITH TIME ZONE NOT NULL, "description" character varying NOT NULL, "accountId" uuid, CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "account" ADD CONSTRAINT "FK_72719f338bfbe9aa98f4439d2b4" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_3d6e89b14baa44a71870450d14d" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_3d6e89b14baa44a71870450d14d"`, undefined);
        await queryRunner.query(`ALTER TABLE "account" DROP CONSTRAINT "FK_72719f338bfbe9aa98f4439d2b4"`, undefined);
        await queryRunner.query(`DROP TABLE "transaction"`, undefined);
        await queryRunner.query(`DROP TABLE "account"`, undefined);
        await queryRunner.query(`DROP TABLE "users"`, undefined);
    }

}
