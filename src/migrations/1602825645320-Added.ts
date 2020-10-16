import {MigrationInterface, QueryRunner} from "typeorm";

export class Added1602825645320 implements MigrationInterface {
    name = 'Added1602825645320'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account" DROP CONSTRAINT "FK_60328bf27019ff5498c4b977421"`, undefined);
        await queryRunner.query(`ALTER TABLE "account" RENAME COLUMN "userId" TO "ownerId"`, undefined);
        await queryRunner.query(`ALTER TABLE "account" ADD CONSTRAINT "FK_72719f338bfbe9aa98f4439d2b4" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account" DROP CONSTRAINT "FK_72719f338bfbe9aa98f4439d2b4"`, undefined);
        await queryRunner.query(`ALTER TABLE "account" RENAME COLUMN "ownerId" TO "userId"`, undefined);
        await queryRunner.query(`ALTER TABLE "account" ADD CONSTRAINT "FK_60328bf27019ff5498c4b977421" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

}
