/*
 * This service module is the API interface with the Pokemon database
 */
import { PrismaClient } from "@prisma/client";

const good = true;
const bad = false;

export type Pokemon = {
  // Optional id is automatically generated if not supplied
  id?: number;
  name: string;
  height: number;
  weight: number;
  artwork_url: string;
};

export type PokemonService = {
  createMany: (pokemon: Pokemon[]) => Promise<void>;
};

/** Output a task status message with optional status message
 * @constructor
 * @param {boolean} isAllGood - Boolean representing whether status is ok or not
 * @param {string} msg - Optional status message
 */
const statusLog = (isAllGood: boolean, msg?: string) => {
  const status = isAllGood ? "✓\n" : "💩\n";
  console.log(`${msg ? `${msg} ${status}` : status}`);
};

export default function service(db: PrismaClient): PokemonService {
  
  return {
    
    /** Creates multiple database records from an array
     * @constructor
     * @param {Pokemon []} pokemon - An array of Pokemon objects
     * @returns {Promise<void>} - Promise of void type
     */
    async createMany(pokemon: Pokemon[]): Promise<void> {
      try {
        const createdPokemon = await db.pokemon.createMany({
          // Spread the pokemon array into Prisma query
          data: [...pokemon],
          // Won't throw error if same record enetered again
          skipDuplicates: true,
        });

        statusLog(
          good,
          `All Pokemon caught and stored in database 😀:\n${createdPokemon}`
        );
      } catch (e) {
        statusLog(bad, `${e}\nOh...`);
        throw "PokemonService: Database error";
      }
    },
  };
}
