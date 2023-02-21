/*
* This service module is the API interface with the Pokemon database
*/
import { PrismaClient } from "@prisma/client";

const good = true;
const bad = false;

export type Pokemon = {
  // Optional id is automatically generated if not supplied
  id?: number,
  name: string;
  height: number;
  weight: number;
  artwork_url: string;
};

export type PokemonService = {
  createMany: (pokemon: Pokemon[]) => Promise<void>;
};

// Output a task completed status with optional task description
const statusLog = (isAllGood: boolean, task?: string) => {
  const status = isAllGood ? "✓\n" : "💩\n";
  console.log(`${task ? `${task} ${status}` : status}`);
};

export default function service(db: PrismaClient): PokemonService {
  
  return {
    
    // Create multiple records of Pokemon from array
    async createMany(pokemon: Pokemon[]): Promise<void> {
      
      try {
      
        const createdPokemon = await db.pokemon.createMany({
          // Spread the pokemon array into Prisma query
          data: [...pokemon],
          // Won't throw error if same record enetered again
          skipDuplicates: true,
        });
        
        statusLog(good, `All Pokemon caught and stored in database 😀:\n${createdPokemon}`);
      
      } catch (e) {
        statusLog(bad, `${e}\nOh...`)
        throw 'PokemonService: Database error';
      }
    },
  };
}
