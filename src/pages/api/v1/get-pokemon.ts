// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { object, number } from "yup";
import service, { Pokemon } from "@/services/PokemonService";
import { prismaClient } from "@/services/db";

type Response = {
  status: number;
  pokemon?: Pokemon[] | []
  msg: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  // Describe search schema
  const searchSchema = object({
    height: number().optional().positive().integer(),
    weight: number().optional().positive().integer(),
  });

  try {
    // Destructure parameters on successfull validation of request query
    const { height, weight } = await searchSchema.validate(req.query);
    // Success
    // Initiate service with database client
    const pokemonService = service(prismaClient);
    const pokemon = await pokemonService.findMany({height, weight})
    console.log(pokemon);
    res.status(200).send({
      status: 200,
      pokemon: pokemon,
      msg: 'OK',
    });
  } catch {
    // Failure
    res.status(200).send({
      status: 400,
      msg: 'Invalid request',
    })
  }
}
