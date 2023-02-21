// This class is used to add Pokemon objects into the database
import { DBClient } from "@/services/db";
import { Prisma } from "@prisma/client";

const good = true;
const bad = false;

export type Pokemon = {
  // Optional id is automatically generated if not supplied
  //id?: number,
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
  process.stdout.write(`${task ? `${task} ${status}` : status}`);
};

export default function service(db: DBClient): PokemonService {
  return {
    // Create multiple records of Pokemon from array
    async createMany(pokemon: Pokemon[]): Promise<void> {
      try {
      
        await db.pokemon.createMany({
          // Spread the pokemon array into Prisma query
          data: [...pokemon],
          // Won't throw error if same record enetered again
          skipDuplicates: true,
        });
        
        statusLog(good, "All Pokemon caught and stored in database 😀");
      
      } catch (e) {
        
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          // The .code property can be accessed in a type-safe manner
          switch(e.code) {
            case 'P1000': statusLog(bad, 'Authentication failed');
            break;
            case 'P1001': statusLog(bad, 'Can\'t reach database');
            break;
            case 'P1008': statusLog(bad, 'Operation timed  out');
            break;
            default: statusLog(bad, `There was a database error ${e?.code}`);
          } 
          throw e;
        }
      }
    },
  };
}
