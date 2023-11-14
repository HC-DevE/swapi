import { MigrationInterface, QueryRunner } from 'typeorm';

export class films1699952275884 implements MigrationInterface {
  name = 'films1699952275884';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "film" ("id" SERIAL NOT NULL, "title" character varying(255) NOT NULL, "episod_id" character varying(255) NOT NULL, "opening_crawl" character varying(255) NOT NULL, "director" character varying(255) NOT NULL, "producer" character varying(255) NOT NULL, "release_date" character varying(255) NOT NULL, "url" text NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), "edited" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_37ec0ffe0011ccbe438a65e3c6e" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "film"`);
  }
}
