import { MigrationInterface, QueryRunner } from 'typeorm';

export class people1699968639681 implements MigrationInterface {
  name = 'people1699968639681';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "people" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "height" character varying(255) NOT NULL, "mass" character varying(255) NOT NULL, "hair_color" character varying(255) NOT NULL, "skin_color" character varying(255) NOT NULL, "eye_color" character varying(255) NOT NULL, "birth_year" character varying(255) NOT NULL, "gender" character varying(255) NOT NULL, "url" text NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), "edited" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_aa866e71353ee94c6cc51059c5b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "film_starships_starship" ("filmId" integer NOT NULL, "starshipId" integer NOT NULL, CONSTRAINT "PK_130ea5faa82565e819f8d575289" PRIMARY KEY ("filmId", "starshipId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ed79253745f81534b737ce768c" ON "film_starships_starship" ("filmId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_21297c5d74a841542bcb7fe063" ON "film_starships_starship" ("starshipId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "people_films_film" ("peopleId" integer NOT NULL, "filmId" integer NOT NULL, CONSTRAINT "PK_602dedd456a76670b0ac8643d9a" PRIMARY KEY ("peopleId", "filmId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_99ce84505b9d277789a5742906" ON "people_films_film" ("peopleId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c4597771baad7514441c33793f" ON "people_films_film" ("filmId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "people_starships_starship" ("peopleId" integer NOT NULL, "starshipId" integer NOT NULL, CONSTRAINT "PK_de05d9b7a9dfae21830dbae215a" PRIMARY KEY ("peopleId", "starshipId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_cd69a89b18df6a4e42c67877cf" ON "people_starships_starship" ("peopleId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_baf66aafe260a12223240c8d4a" ON "people_starships_starship" ("starshipId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "film_starships_starship" ADD CONSTRAINT "FK_ed79253745f81534b737ce768c1" FOREIGN KEY ("filmId") REFERENCES "film"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "film_starships_starship" ADD CONSTRAINT "FK_21297c5d74a841542bcb7fe063a" FOREIGN KEY ("starshipId") REFERENCES "starship"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "people_films_film" ADD CONSTRAINT "FK_99ce84505b9d277789a5742906b" FOREIGN KEY ("peopleId") REFERENCES "people"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "people_films_film" ADD CONSTRAINT "FK_c4597771baad7514441c33793f5" FOREIGN KEY ("filmId") REFERENCES "film"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "people_starships_starship" ADD CONSTRAINT "FK_cd69a89b18df6a4e42c67877cf5" FOREIGN KEY ("peopleId") REFERENCES "people"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "people_starships_starship" ADD CONSTRAINT "FK_baf66aafe260a12223240c8d4a5" FOREIGN KEY ("starshipId") REFERENCES "starship"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "people_starships_starship" DROP CONSTRAINT "FK_baf66aafe260a12223240c8d4a5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "people_starships_starship" DROP CONSTRAINT "FK_cd69a89b18df6a4e42c67877cf5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "people_films_film" DROP CONSTRAINT "FK_c4597771baad7514441c33793f5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "people_films_film" DROP CONSTRAINT "FK_99ce84505b9d277789a5742906b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "film_starships_starship" DROP CONSTRAINT "FK_21297c5d74a841542bcb7fe063a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "film_starships_starship" DROP CONSTRAINT "FK_ed79253745f81534b737ce768c1"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_baf66aafe260a12223240c8d4a"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_cd69a89b18df6a4e42c67877cf"`,
    );
    await queryRunner.query(`DROP TABLE "people_starships_starship"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_c4597771baad7514441c33793f"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_99ce84505b9d277789a5742906"`,
    );
    await queryRunner.query(`DROP TABLE "people_films_film"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_21297c5d74a841542bcb7fe063"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_ed79253745f81534b737ce768c"`,
    );
    await queryRunner.query(`DROP TABLE "film_starships_starship"`);
    await queryRunner.query(`DROP TABLE "people"`);
  }
}
