import { MigrationInterface, QueryRunner } from 'typeorm';

export class planets1707828242872 implements MigrationInterface {
  name = 'planets1707828242872';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "specie" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "classification" character varying(255) NOT NULL, "designation" character varying(255) NOT NULL, "average_height" character varying(255) NOT NULL, "average_lifespan" character varying(255) NOT NULL, "hair_colors" character varying(255) NOT NULL, "skin_colors" character varying(255) NOT NULL, "eye_colors" character varying(255) NOT NULL, "language" character varying(255) NOT NULL, "url" text NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), "edited" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ae8a78cf6f1cffa5f4cfa7d58f4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "planet" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "diameter" character varying(255) NOT NULL, "rotation_period" character varying(255) NOT NULL, "orbital_period" character varying(255) NOT NULL, "gravity" character varying(255) NOT NULL, "population" character varying(255) NOT NULL, "climate" character varying(255) NOT NULL, "terrain" character varying(255) NOT NULL, "surface_water" character varying(255) NOT NULL, "url" text NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), "edited" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cb7506671ad0f19d6287ee4bfb7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "vehicule" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "model" character varying(255) NOT NULL, "vehicle_class" character varying(255) NOT NULL, "manufacturer" character varying(255) NOT NULL, "cost_in_credits" character varying(255) NOT NULL, "length" character varying(255) NOT NULL, "crew" character varying(255) NOT NULL, "passengers" character varying(255) NOT NULL, "max_atmosphering_speed" character varying(255) NOT NULL, "cargo_capacity" character varying(255) NOT NULL, "consumables" character varying(255) NOT NULL, "url" text NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), "edited" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_265cd1c18f3a0376d49bedf27ad" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "people_species_specie" ("peopleId" integer NOT NULL, "specieId" integer NOT NULL, CONSTRAINT "PK_2936af0eb3d9fec1d33e4269623" PRIMARY KEY ("peopleId", "specieId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a5c58a307b2a71698b33c2403d" ON "people_species_specie" ("peopleId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b3a523bcb0a735cd88cfbdb369" ON "people_species_specie" ("specieId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "film_characters_people" ("filmId" integer NOT NULL, "peopleId" integer NOT NULL, CONSTRAINT "PK_9dfa5d6106350d95ebc6bc38e20" PRIMARY KEY ("filmId", "peopleId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3458d4b49e060a20d89bd53b8f" ON "film_characters_people" ("filmId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d2da8c550582752c7225ba0eb6" ON "film_characters_people" ("peopleId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "planet_films_film" ("planetId" integer NOT NULL, "filmId" integer NOT NULL, CONSTRAINT "PK_db920510c3823287acffe5d047d" PRIMARY KEY ("planetId", "filmId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b8d1e881fca1b60fb24f212a74" ON "planet_films_film" ("planetId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_80d06ca2f65a80e668607394cd" ON "planet_films_film" ("filmId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "planet_residents_people" ("planetId" integer NOT NULL, "peopleId" integer NOT NULL, CONSTRAINT "PK_40005ef53475971fe5aa796e772" PRIMARY KEY ("planetId", "peopleId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2ce34da4ba34bcfd029b0cfc94" ON "planet_residents_people" ("planetId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_98874bca12deff6ab32f2095ac" ON "planet_residents_people" ("peopleId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "vehicule_films_film" ("vehiculeId" integer NOT NULL, "filmId" integer NOT NULL, CONSTRAINT "PK_3e25da03e634d6ac090645f688f" PRIMARY KEY ("vehiculeId", "filmId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3f5c6476e98f3e110cd8540268" ON "vehicule_films_film" ("vehiculeId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_967c5fc946b1194e52b18b4e02" ON "vehicule_films_film" ("filmId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "vehicule_pilots_people" ("vehiculeId" integer NOT NULL, "peopleId" integer NOT NULL, CONSTRAINT "PK_4cacd0c5fd806d6b6e6029a9d7f" PRIMARY KEY ("vehiculeId", "peopleId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f0dd2438c58343abac99422c7d" ON "vehicule_pilots_people" ("vehiculeId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e6390935c3468c7075a1991e56" ON "vehicule_pilots_people" ("peopleId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "people_species_specie" ADD CONSTRAINT "FK_a5c58a307b2a71698b33c2403d3" FOREIGN KEY ("peopleId") REFERENCES "people"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "people_species_specie" ADD CONSTRAINT "FK_b3a523bcb0a735cd88cfbdb3694" FOREIGN KEY ("specieId") REFERENCES "specie"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "film_characters_people" ADD CONSTRAINT "FK_3458d4b49e060a20d89bd53b8f4" FOREIGN KEY ("filmId") REFERENCES "film"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "film_characters_people" ADD CONSTRAINT "FK_d2da8c550582752c7225ba0eb63" FOREIGN KEY ("peopleId") REFERENCES "people"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "planet_films_film" ADD CONSTRAINT "FK_b8d1e881fca1b60fb24f212a748" FOREIGN KEY ("planetId") REFERENCES "planet"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "planet_films_film" ADD CONSTRAINT "FK_80d06ca2f65a80e668607394cdd" FOREIGN KEY ("filmId") REFERENCES "film"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "planet_residents_people" ADD CONSTRAINT "FK_2ce34da4ba34bcfd029b0cfc940" FOREIGN KEY ("planetId") REFERENCES "planet"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "planet_residents_people" ADD CONSTRAINT "FK_98874bca12deff6ab32f2095ac9" FOREIGN KEY ("peopleId") REFERENCES "people"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "vehicule_films_film" ADD CONSTRAINT "FK_3f5c6476e98f3e110cd85402682" FOREIGN KEY ("vehiculeId") REFERENCES "vehicule"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "vehicule_films_film" ADD CONSTRAINT "FK_967c5fc946b1194e52b18b4e02f" FOREIGN KEY ("filmId") REFERENCES "film"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "vehicule_pilots_people" ADD CONSTRAINT "FK_f0dd2438c58343abac99422c7da" FOREIGN KEY ("vehiculeId") REFERENCES "vehicule"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "vehicule_pilots_people" ADD CONSTRAINT "FK_e6390935c3468c7075a1991e563" FOREIGN KEY ("peopleId") REFERENCES "people"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "vehicule_pilots_people" DROP CONSTRAINT "FK_e6390935c3468c7075a1991e563"`,
    );
    await queryRunner.query(
      `ALTER TABLE "vehicule_pilots_people" DROP CONSTRAINT "FK_f0dd2438c58343abac99422c7da"`,
    );
    await queryRunner.query(
      `ALTER TABLE "vehicule_films_film" DROP CONSTRAINT "FK_967c5fc946b1194e52b18b4e02f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "vehicule_films_film" DROP CONSTRAINT "FK_3f5c6476e98f3e110cd85402682"`,
    );
    await queryRunner.query(
      `ALTER TABLE "planet_residents_people" DROP CONSTRAINT "FK_98874bca12deff6ab32f2095ac9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "planet_residents_people" DROP CONSTRAINT "FK_2ce34da4ba34bcfd029b0cfc940"`,
    );
    await queryRunner.query(
      `ALTER TABLE "planet_films_film" DROP CONSTRAINT "FK_80d06ca2f65a80e668607394cdd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "planet_films_film" DROP CONSTRAINT "FK_b8d1e881fca1b60fb24f212a748"`,
    );
    await queryRunner.query(
      `ALTER TABLE "film_characters_people" DROP CONSTRAINT "FK_d2da8c550582752c7225ba0eb63"`,
    );
    await queryRunner.query(
      `ALTER TABLE "film_characters_people" DROP CONSTRAINT "FK_3458d4b49e060a20d89bd53b8f4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "people_species_specie" DROP CONSTRAINT "FK_b3a523bcb0a735cd88cfbdb3694"`,
    );
    await queryRunner.query(
      `ALTER TABLE "people_species_specie" DROP CONSTRAINT "FK_a5c58a307b2a71698b33c2403d3"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e6390935c3468c7075a1991e56"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f0dd2438c58343abac99422c7d"`,
    );
    await queryRunner.query(`DROP TABLE "vehicule_pilots_people"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_967c5fc946b1194e52b18b4e02"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_3f5c6476e98f3e110cd8540268"`,
    );
    await queryRunner.query(`DROP TABLE "vehicule_films_film"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_98874bca12deff6ab32f2095ac"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_2ce34da4ba34bcfd029b0cfc94"`,
    );
    await queryRunner.query(`DROP TABLE "planet_residents_people"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_80d06ca2f65a80e668607394cd"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_b8d1e881fca1b60fb24f212a74"`,
    );
    await queryRunner.query(`DROP TABLE "planet_films_film"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_d2da8c550582752c7225ba0eb6"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_3458d4b49e060a20d89bd53b8f"`,
    );
    await queryRunner.query(`DROP TABLE "film_characters_people"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_b3a523bcb0a735cd88cfbdb369"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_a5c58a307b2a71698b33c2403d"`,
    );
    await queryRunner.query(`DROP TABLE "people_species_specie"`);
    await queryRunner.query(`DROP TABLE "vehicule"`);
    await queryRunner.query(`DROP TABLE "planet"`);
    await queryRunner.query(`DROP TABLE "specie"`);
  }
}
