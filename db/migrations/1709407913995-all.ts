import { MigrationInterface, QueryRunner } from 'typeorm';

export class all1709407913995 implements MigrationInterface {
  name = 'all1709407913995';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "planet" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "edited_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(255) NOT NULL, "diameter" character varying(255) NOT NULL, "rotation_period" character varying(255) NOT NULL, "orbital_period" character varying(255) NOT NULL, "gravity" character varying(255) NOT NULL, "population" character varying(255) NOT NULL, "climate" character varying(255) NOT NULL, "terrain" character varying(255) NOT NULL, "surface_water" character varying(255) NOT NULL, CONSTRAINT "PK_cb7506671ad0f19d6287ee4bfb7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "specie" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "edited_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(255) NOT NULL, "classification" character varying(255) NOT NULL, "designation" character varying(255) NOT NULL, "average_height" character varying(255) NOT NULL, "average_lifespan" character varying(255) NOT NULL, "hair_colors" character varying(255) NOT NULL, "skin_colors" character varying(255) NOT NULL, "eye_colors" character varying(255) NOT NULL, "language" character varying(255) NOT NULL, "homeworldId" integer, CONSTRAINT "PK_ae8a78cf6f1cffa5f4cfa7d58f4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "starship" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "edited_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(255) NOT NULL, "model" character varying(255) NOT NULL, "starship_class" character varying(255) NOT NULL, "manufacturer" character varying(255) NOT NULL, "cost_in_credits" character varying(255) NOT NULL, "length" character varying(255) NOT NULL, "crew" character varying(255) NOT NULL, "passengers" character varying(255) NOT NULL, "max_atmosphering_speed" character varying(255) NOT NULL, "hyperdrive_rating" character varying(255) NOT NULL, "MGLT" character varying(255) NOT NULL, "cargo_capacity" character varying(255) NOT NULL, "consumables" character varying(255) NOT NULL, CONSTRAINT "PK_398cab92a55d977f03881dda8e1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "vehicle" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "edited_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(255) NOT NULL, "vehicle_class" character varying(255) NOT NULL, "manufacturer" character varying(255) NOT NULL, "cost_in_credits" character varying(255) NOT NULL, "length" character varying(255) NOT NULL, "crew" character varying(255) NOT NULL, "passengers" character varying(255) NOT NULL, "max_atmosphering_speed" character varying(255) NOT NULL, "cargo_capacity" character varying(255) NOT NULL, "consumables" character varying(255) NOT NULL, CONSTRAINT "PK_187fa17ba39d367e5604b3d1ec9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "people" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "edited_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(255) NOT NULL, "height" character varying(255) NOT NULL, "mass" character varying(255) NOT NULL, "hair_color" character varying(255) NOT NULL, "skin_color" character varying(255) NOT NULL, "eye_color" character varying(255) NOT NULL, "birth_year" character varying(255) NOT NULL, "gender" character varying(255) NOT NULL, "homeworldId" integer, CONSTRAINT "PK_aa866e71353ee94c6cc51059c5b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "film" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "edited_at" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying(255) NOT NULL, "episod_id" character varying(255) NOT NULL, "opening_crawl" character varying(255) NOT NULL, "director" character varying(255) NOT NULL, "producer" character varying(255) NOT NULL, "release_date" character varying(255) NOT NULL, CONSTRAINT "PK_37ec0ffe0011ccbe438a65e3c6e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."users_role_enum" AS ENUM('customer', 'admin')`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "edited_at" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying NOT NULL, "password" character varying NOT NULL, "refresh_token" character varying, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "role" "public"."users_role_enum" NOT NULL DEFAULT 'customer', CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
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
      `CREATE TABLE "people_vehicles_vehicle" ("peopleId" integer NOT NULL, "vehicleId" integer NOT NULL, CONSTRAINT "PK_abdfef92ec95f3e00ccc38ffbbd" PRIMARY KEY ("peopleId", "vehicleId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_0c4799c95577dd53de3c919206" ON "people_vehicles_vehicle" ("peopleId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_69511f955e4694544aa0056f25" ON "people_vehicles_vehicle" ("vehicleId") `,
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
      `CREATE TABLE "film_characters_people" ("filmId" integer NOT NULL, "peopleId" integer NOT NULL, CONSTRAINT "PK_9dfa5d6106350d95ebc6bc38e20" PRIMARY KEY ("filmId", "peopleId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3458d4b49e060a20d89bd53b8f" ON "film_characters_people" ("filmId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d2da8c550582752c7225ba0eb6" ON "film_characters_people" ("peopleId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "film_planets_planet" ("filmId" integer NOT NULL, "planetId" integer NOT NULL, CONSTRAINT "PK_b0996a2f9f2ef9b1f80223d30b2" PRIMARY KEY ("filmId", "planetId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9e9d858b064b7d0fa02a9764e1" ON "film_planets_planet" ("filmId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_6821d91826ca31cc4e4588b535" ON "film_planets_planet" ("planetId") `,
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
      `CREATE TABLE "film_vehicles_vehicle" ("filmId" integer NOT NULL, "vehicleId" integer NOT NULL, CONSTRAINT "PK_ace6d3e1be3bbc2107df07eade5" PRIMARY KEY ("filmId", "vehicleId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_af46f6d0bef8eba92546a8c537" ON "film_vehicles_vehicle" ("filmId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_8be4e7e1014359bb4715338cf2" ON "film_vehicles_vehicle" ("vehicleId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "film_species_specie" ("filmId" integer NOT NULL, "specieId" integer NOT NULL, CONSTRAINT "PK_31a636b542677941395bbe0b42f" PRIMARY KEY ("filmId", "specieId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_57e6df74dce55bd710f01c44bb" ON "film_species_specie" ("filmId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_5a19d397f578506a444ad76cfa" ON "film_species_specie" ("specieId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "specie" ADD CONSTRAINT "FK_55bd54b68d6b9484ec932556182" FOREIGN KEY ("homeworldId") REFERENCES "planet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "people" ADD CONSTRAINT "FK_8f79bb098a482fa585da15ef3a6" FOREIGN KEY ("homeworldId") REFERENCES "planet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "people_species_specie" ADD CONSTRAINT "FK_a5c58a307b2a71698b33c2403d3" FOREIGN KEY ("peopleId") REFERENCES "people"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "people_species_specie" ADD CONSTRAINT "FK_b3a523bcb0a735cd88cfbdb3694" FOREIGN KEY ("specieId") REFERENCES "specie"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "people_vehicles_vehicle" ADD CONSTRAINT "FK_0c4799c95577dd53de3c9192060" FOREIGN KEY ("peopleId") REFERENCES "people"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "people_vehicles_vehicle" ADD CONSTRAINT "FK_69511f955e4694544aa0056f256" FOREIGN KEY ("vehicleId") REFERENCES "vehicle"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "people_starships_starship" ADD CONSTRAINT "FK_cd69a89b18df6a4e42c67877cf5" FOREIGN KEY ("peopleId") REFERENCES "people"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "people_starships_starship" ADD CONSTRAINT "FK_baf66aafe260a12223240c8d4a5" FOREIGN KEY ("starshipId") REFERENCES "starship"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "film_characters_people" ADD CONSTRAINT "FK_3458d4b49e060a20d89bd53b8f4" FOREIGN KEY ("filmId") REFERENCES "film"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "film_characters_people" ADD CONSTRAINT "FK_d2da8c550582752c7225ba0eb63" FOREIGN KEY ("peopleId") REFERENCES "people"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "film_planets_planet" ADD CONSTRAINT "FK_9e9d858b064b7d0fa02a9764e18" FOREIGN KEY ("filmId") REFERENCES "film"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "film_planets_planet" ADD CONSTRAINT "FK_6821d91826ca31cc4e4588b5355" FOREIGN KEY ("planetId") REFERENCES "planet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "film_starships_starship" ADD CONSTRAINT "FK_ed79253745f81534b737ce768c1" FOREIGN KEY ("filmId") REFERENCES "film"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "film_starships_starship" ADD CONSTRAINT "FK_21297c5d74a841542bcb7fe063a" FOREIGN KEY ("starshipId") REFERENCES "starship"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "film_vehicles_vehicle" ADD CONSTRAINT "FK_af46f6d0bef8eba92546a8c5375" FOREIGN KEY ("filmId") REFERENCES "film"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "film_vehicles_vehicle" ADD CONSTRAINT "FK_8be4e7e1014359bb4715338cf20" FOREIGN KEY ("vehicleId") REFERENCES "vehicle"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "film_species_specie" ADD CONSTRAINT "FK_57e6df74dce55bd710f01c44bb8" FOREIGN KEY ("filmId") REFERENCES "film"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "film_species_specie" ADD CONSTRAINT "FK_5a19d397f578506a444ad76cfac" FOREIGN KEY ("specieId") REFERENCES "specie"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "film_species_specie" DROP CONSTRAINT "FK_5a19d397f578506a444ad76cfac"`,
    );
    await queryRunner.query(
      `ALTER TABLE "film_species_specie" DROP CONSTRAINT "FK_57e6df74dce55bd710f01c44bb8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "film_vehicles_vehicle" DROP CONSTRAINT "FK_8be4e7e1014359bb4715338cf20"`,
    );
    await queryRunner.query(
      `ALTER TABLE "film_vehicles_vehicle" DROP CONSTRAINT "FK_af46f6d0bef8eba92546a8c5375"`,
    );
    await queryRunner.query(
      `ALTER TABLE "film_starships_starship" DROP CONSTRAINT "FK_21297c5d74a841542bcb7fe063a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "film_starships_starship" DROP CONSTRAINT "FK_ed79253745f81534b737ce768c1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "film_planets_planet" DROP CONSTRAINT "FK_6821d91826ca31cc4e4588b5355"`,
    );
    await queryRunner.query(
      `ALTER TABLE "film_planets_planet" DROP CONSTRAINT "FK_9e9d858b064b7d0fa02a9764e18"`,
    );
    await queryRunner.query(
      `ALTER TABLE "film_characters_people" DROP CONSTRAINT "FK_d2da8c550582752c7225ba0eb63"`,
    );
    await queryRunner.query(
      `ALTER TABLE "film_characters_people" DROP CONSTRAINT "FK_3458d4b49e060a20d89bd53b8f4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "people_starships_starship" DROP CONSTRAINT "FK_baf66aafe260a12223240c8d4a5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "people_starships_starship" DROP CONSTRAINT "FK_cd69a89b18df6a4e42c67877cf5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "people_vehicles_vehicle" DROP CONSTRAINT "FK_69511f955e4694544aa0056f256"`,
    );
    await queryRunner.query(
      `ALTER TABLE "people_vehicles_vehicle" DROP CONSTRAINT "FK_0c4799c95577dd53de3c9192060"`,
    );
    await queryRunner.query(
      `ALTER TABLE "people_species_specie" DROP CONSTRAINT "FK_b3a523bcb0a735cd88cfbdb3694"`,
    );
    await queryRunner.query(
      `ALTER TABLE "people_species_specie" DROP CONSTRAINT "FK_a5c58a307b2a71698b33c2403d3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "people" DROP CONSTRAINT "FK_8f79bb098a482fa585da15ef3a6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "specie" DROP CONSTRAINT "FK_55bd54b68d6b9484ec932556182"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_5a19d397f578506a444ad76cfa"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_57e6df74dce55bd710f01c44bb"`,
    );
    await queryRunner.query(`DROP TABLE "film_species_specie"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_8be4e7e1014359bb4715338cf2"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_af46f6d0bef8eba92546a8c537"`,
    );
    await queryRunner.query(`DROP TABLE "film_vehicles_vehicle"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_21297c5d74a841542bcb7fe063"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_ed79253745f81534b737ce768c"`,
    );
    await queryRunner.query(`DROP TABLE "film_starships_starship"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_6821d91826ca31cc4e4588b535"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_9e9d858b064b7d0fa02a9764e1"`,
    );
    await queryRunner.query(`DROP TABLE "film_planets_planet"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_d2da8c550582752c7225ba0eb6"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_3458d4b49e060a20d89bd53b8f"`,
    );
    await queryRunner.query(`DROP TABLE "film_characters_people"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_baf66aafe260a12223240c8d4a"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_cd69a89b18df6a4e42c67877cf"`,
    );
    await queryRunner.query(`DROP TABLE "people_starships_starship"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_69511f955e4694544aa0056f25"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_0c4799c95577dd53de3c919206"`,
    );
    await queryRunner.query(`DROP TABLE "people_vehicles_vehicle"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_b3a523bcb0a735cd88cfbdb369"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_a5c58a307b2a71698b33c2403d"`,
    );
    await queryRunner.query(`DROP TABLE "people_species_specie"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
    await queryRunner.query(`DROP TABLE "film"`);
    await queryRunner.query(`DROP TABLE "people"`);
    await queryRunner.query(`DROP TABLE "vehicle"`);
    await queryRunner.query(`DROP TABLE "starship"`);
    await queryRunner.query(`DROP TABLE "specie"`);
    await queryRunner.query(`DROP TABLE "planet"`);
  }
}
