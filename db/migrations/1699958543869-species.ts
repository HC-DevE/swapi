import { MigrationInterface, QueryRunner } from 'typeorm';

export class species1699958543869 implements MigrationInterface {
  name = 'species1699958543869';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "specie" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "classification" character varying(255) NOT NULL, "designation" character varying(255) NOT NULL, "average_height" character varying(255) NOT NULL, "average_lifespan" character varying(255) NOT NULL, "hair_colors" character varying(255) NOT NULL, "skin_colors" character varying(255) NOT NULL, "eye_colors" character varying(255) NOT NULL, "language" character varying(255) NOT NULL, "url" text NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), "edited" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ae8a78cf6f1cffa5f4cfa7d58f4" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "specie"`);
  }
}
