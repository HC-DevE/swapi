import { MigrationInterface, QueryRunner } from 'typeorm';

export class rest1707828923160 implements MigrationInterface {
  name = 'rest1707828923160';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "vehicle" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "model" character varying(255) NOT NULL, "vehicle_class" character varying(255) NOT NULL, "manufacturer" character varying(255) NOT NULL, "cost_in_credits" character varying(255) NOT NULL, "length" character varying(255) NOT NULL, "crew" character varying(255) NOT NULL, "passengers" character varying(255) NOT NULL, "max_atmosphering_speed" character varying(255) NOT NULL, "cargo_capacity" character varying(255) NOT NULL, "consumables" character varying(255) NOT NULL, "url" text NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), "edited" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_187fa17ba39d367e5604b3d1ec9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."users_role_enum" AS ENUM('customer', 'admin')`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying NOT NULL, "password" character varying NOT NULL, "refresh_token" character varying, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "role" "public"."users_role_enum" NOT NULL DEFAULT 'customer', CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "specie_people_people" ("specieId" integer NOT NULL, "peopleId" integer NOT NULL, CONSTRAINT "PK_f85496342f765af9b627cb7d9cd" PRIMARY KEY ("specieId", "peopleId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_0b7a51870e8cf15bfc24dc7eb4" ON "specie_people_people" ("specieId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_942c78aca9a2baec7f910baa47" ON "specie_people_people" ("peopleId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "specie_films_film" ("specieId" integer NOT NULL, "filmId" integer NOT NULL, CONSTRAINT "PK_72cd785bab49eba00bf11a4783d" PRIMARY KEY ("specieId", "filmId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2832825557b2ccf35eca8f1a25" ON "specie_films_film" ("specieId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_28c0943be888ee49ed041c9dc8" ON "specie_films_film" ("filmId") `,
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
      `CREATE TABLE "vehicle_films_film" ("vehicleId" integer NOT NULL, "filmId" integer NOT NULL, CONSTRAINT "PK_cd02742fa021a61445cca8b1a79" PRIMARY KEY ("vehicleId", "filmId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_6b3e6115252f46fa30e9211a26" ON "vehicle_films_film" ("vehicleId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_98a3873430cacac567ed5253ba" ON "vehicle_films_film" ("filmId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "vehicle_pilots_people" ("vehicleId" integer NOT NULL, "peopleId" integer NOT NULL, CONSTRAINT "PK_a71fae3148649718baa9405112a" PRIMARY KEY ("vehicleId", "peopleId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a3b38218398eb3fefc03968bee" ON "vehicle_pilots_people" ("vehicleId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_30dff399b7ad53acebf121af91" ON "vehicle_pilots_people" ("peopleId") `,
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
      `ALTER TABLE "specie_people_people" ADD CONSTRAINT "FK_0b7a51870e8cf15bfc24dc7eb4f" FOREIGN KEY ("specieId") REFERENCES "specie"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "specie_people_people" ADD CONSTRAINT "FK_942c78aca9a2baec7f910baa470" FOREIGN KEY ("peopleId") REFERENCES "people"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "specie_films_film" ADD CONSTRAINT "FK_2832825557b2ccf35eca8f1a257" FOREIGN KEY ("specieId") REFERENCES "specie"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "specie_films_film" ADD CONSTRAINT "FK_28c0943be888ee49ed041c9dc83" FOREIGN KEY ("filmId") REFERENCES "film"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "people_species_specie" ADD CONSTRAINT "FK_a5c58a307b2a71698b33c2403d3" FOREIGN KEY ("peopleId") REFERENCES "people"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "people_species_specie" ADD CONSTRAINT "FK_b3a523bcb0a735cd88cfbdb3694" FOREIGN KEY ("specieId") REFERENCES "specie"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "vehicle_films_film" ADD CONSTRAINT "FK_6b3e6115252f46fa30e9211a26f" FOREIGN KEY ("vehicleId") REFERENCES "vehicle"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "vehicle_films_film" ADD CONSTRAINT "FK_98a3873430cacac567ed5253ba1" FOREIGN KEY ("filmId") REFERENCES "film"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "vehicle_pilots_people" ADD CONSTRAINT "FK_a3b38218398eb3fefc03968bee0" FOREIGN KEY ("vehicleId") REFERENCES "vehicle"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "vehicle_pilots_people" ADD CONSTRAINT "FK_30dff399b7ad53acebf121af913" FOREIGN KEY ("peopleId") REFERENCES "people"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "film_characters_people" ADD CONSTRAINT "FK_3458d4b49e060a20d89bd53b8f4" FOREIGN KEY ("filmId") REFERENCES "film"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "film_characters_people" ADD CONSTRAINT "FK_d2da8c550582752c7225ba0eb63" FOREIGN KEY ("peopleId") REFERENCES "people"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "film_vehicles_vehicle" ADD CONSTRAINT "FK_af46f6d0bef8eba92546a8c5375" FOREIGN KEY ("filmId") REFERENCES "film"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "film_vehicles_vehicle" ADD CONSTRAINT "FK_8be4e7e1014359bb4715338cf20" FOREIGN KEY ("vehicleId") REFERENCES "vehicle"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "film_species_specie" ADD CONSTRAINT "FK_57e6df74dce55bd710f01c44bb8" FOREIGN KEY ("filmId") REFERENCES "film"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "film_species_specie" ADD CONSTRAINT "FK_5a19d397f578506a444ad76cfac" FOREIGN KEY ("specieId") REFERENCES "specie"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
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
      `ALTER TABLE "film_characters_people" DROP CONSTRAINT "FK_d2da8c550582752c7225ba0eb63"`,
    );
    await queryRunner.query(
      `ALTER TABLE "film_characters_people" DROP CONSTRAINT "FK_3458d4b49e060a20d89bd53b8f4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "vehicle_pilots_people" DROP CONSTRAINT "FK_30dff399b7ad53acebf121af913"`,
    );
    await queryRunner.query(
      `ALTER TABLE "vehicle_pilots_people" DROP CONSTRAINT "FK_a3b38218398eb3fefc03968bee0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "vehicle_films_film" DROP CONSTRAINT "FK_98a3873430cacac567ed5253ba1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "vehicle_films_film" DROP CONSTRAINT "FK_6b3e6115252f46fa30e9211a26f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "people_species_specie" DROP CONSTRAINT "FK_b3a523bcb0a735cd88cfbdb3694"`,
    );
    await queryRunner.query(
      `ALTER TABLE "people_species_specie" DROP CONSTRAINT "FK_a5c58a307b2a71698b33c2403d3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "specie_films_film" DROP CONSTRAINT "FK_28c0943be888ee49ed041c9dc83"`,
    );
    await queryRunner.query(
      `ALTER TABLE "specie_films_film" DROP CONSTRAINT "FK_2832825557b2ccf35eca8f1a257"`,
    );
    await queryRunner.query(
      `ALTER TABLE "specie_people_people" DROP CONSTRAINT "FK_942c78aca9a2baec7f910baa470"`,
    );
    await queryRunner.query(
      `ALTER TABLE "specie_people_people" DROP CONSTRAINT "FK_0b7a51870e8cf15bfc24dc7eb4f"`,
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
      `DROP INDEX "public"."IDX_d2da8c550582752c7225ba0eb6"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_3458d4b49e060a20d89bd53b8f"`,
    );
    await queryRunner.query(`DROP TABLE "film_characters_people"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_30dff399b7ad53acebf121af91"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_a3b38218398eb3fefc03968bee"`,
    );
    await queryRunner.query(`DROP TABLE "vehicle_pilots_people"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_98a3873430cacac567ed5253ba"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_6b3e6115252f46fa30e9211a26"`,
    );
    await queryRunner.query(`DROP TABLE "vehicle_films_film"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_b3a523bcb0a735cd88cfbdb369"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_a5c58a307b2a71698b33c2403d"`,
    );
    await queryRunner.query(`DROP TABLE "people_species_specie"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_28c0943be888ee49ed041c9dc8"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_2832825557b2ccf35eca8f1a25"`,
    );
    await queryRunner.query(`DROP TABLE "specie_films_film"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_942c78aca9a2baec7f910baa47"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_0b7a51870e8cf15bfc24dc7eb4"`,
    );
    await queryRunner.query(`DROP TABLE "specie_people_people"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
    await queryRunner.query(`DROP TABLE "vehicle"`);
  }
}
