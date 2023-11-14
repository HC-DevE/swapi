import { MigrationInterface, QueryRunner } from 'typeorm';

export class starships1698244235151 implements MigrationInterface {
  name = 'starships1698244235151';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "starship" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "model" character varying(255) NOT NULL, "starship_class" character varying(255) NOT NULL, "manufacturer" character varying(255) NOT NULL, "cost_in_credits" character varying(255) NOT NULL, "length" character varying(255) NOT NULL, "crew" character varying(255) NOT NULL, "passengers" character varying(255) NOT NULL, "max_atmosphering_speed" character varying(255) NOT NULL, "hyperdrive_rating" character varying(255) NOT NULL, "MGLT" character varying(255) NOT NULL, "cargo_capacity" character varying(255) NOT NULL, "consumables" character varying(255) NOT NULL, "url" text NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), "edited" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_398cab92a55d977f03881dda8e1" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "starship"`);
  }
}
