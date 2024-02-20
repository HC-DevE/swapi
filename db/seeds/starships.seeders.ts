import { getRepository } from 'typeorm';
import * as fs from 'fs';
// import * as path from 'path';
import { Starship } from 'src/starships/entities/starship.entity';

async function seedStarships() {
  // const connection = await createConnection();
  const starshipRepository = getRepository(Starship);

  // Charger les données JSON
  const data = JSON.parse(
    fs.readFileSync('../../Json/starships.json', 'utf-8'),
  );
  console.log(data.fields);

  // Itérer sur chaque objet starship et l'insérer dans la base de données
  for (const item of data.fields) {
    // console.log('Inserting starship: ', item.name);
    const starship = starshipRepository.create(item);
    await starshipRepository.save(starship);
  }

  console.log('Starships seeded successfully');
}

seedStarships().catch(console.error);
