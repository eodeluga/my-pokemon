// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import service, { Pokemon } from "@/services/PokemonService";
import { prismaClient } from "@/services/db";
import { object } from "yup";
import statusLog from "@/services/logger";

/** Creates and returns a Pokemon object by parsing CSV line values 
 * @param {string} csvLine - Line of text representing a CSV record
 * @returns {Pokemon} - A Pokemon object representation of the CSV
*/
const parseCsvLine = (csvLine: string): Pokemon => {
  // Split lines at commas to get CSV values and destructure
  // required values into variables
  const [id, name, , height, weight, , ,] = csvLine.split(",");
  const artwork_url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${id}.png`;

  const pokemon: Pokemon = {
    id: parseInt(id),
    name: name,
    artwork_url: artwork_url,
    height: parseInt(height),
    weight: parseInt(weight),
  };

  return pokemon;
};

type Response = {
  status: number;
  msg: string;
};

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Response>
) {
  // Get list of Pokemon
  return fetch("https://raw.githubusercontent.com/PokeAPI/pokeapi/master/data/v2/csv/pokemon.csv")
    .then(async (data) => {
      // Throw object to catch block if errors
      if (!data.ok) throw data;
      
      const pokemonArr: Pokemon [] = [];
      // Split the text at line breaks to create CSV record array
      const csvArr = (await data.text()).split("\n");
      
      // Skip first element as its the CSV header row and last as some bad data
      for (let i = 1; i < csvArr.length - 1; i++) {
        pokemonArr.push(
          parseCsvLine(csvArr[i])
        );
      }
            
      // Initiate service with database client
      const pokemonService = service(prismaClient);

      // Insert pokemon into database
      await pokemonService.createMany(pokemonArr)
      
      // Success 
      res.send({
        status: data.status,
        msg: data.statusText
      });
    })
    .catch((err) => {
      // Error response
      statusLog(false, `catch-pokemon: Couldn't download Pokemon data\n${JSON.stringify(err)}\nOh...`);
      res.send ({
        status: err?.status,
        msg: err?.statusText,
      });
    });
}
