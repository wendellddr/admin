import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableUserAndPerson1646181668913
  implements MigrationInterface
{
  name = 'CreateTableUserAndPerson1646181668913';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tb_users" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "status" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "person_id" integer, CONSTRAINT "REL_253e956751167c44e18168c4a9" UNIQUE ("person_id"), CONSTRAINT "PK_a2c23e0679749c22ffa6c2be910" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "tb_persons" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "cpf" character varying NOT NULL, "email" character varying NOT NULL, "status" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_2af079ba897e0e01ca2ae609e42" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "tb_users" ADD CONSTRAINT "FK_253e956751167c44e18168c4a93" FOREIGN KEY ("person_id") REFERENCES "tb_persons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tb_users" DROP CONSTRAINT "FK_253e956751167c44e18168c4a93"`,
    );
    await queryRunner.query(`DROP TABLE "tb_persons"`);
    await queryRunner.query(`DROP TABLE "tb_users"`);
  }
}
