// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { object, number } from "yup";
import service from "@/services/PokemonService";
import { prismaClient } from "@/services/db";

type Response = {
  /* status: number;
  pokemon?: Pokemon[] | []
  msg: string; */
} | [];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  // Describe search schema
  const searchSchema = object({
    height: number().optional().moreThan(-1).integer(),
    weight: number().optional().moreThan(-1).integer(),
  });

  try {
    // Destructure parameters on successfull validation of request query
    const { height, weight } = await searchSchema.validate(req.query);
    
    // Success
    // Initiate service with database client
    const pokemonService = service(prismaClient);
    const pokemon = await pokemonService.findMany({height, weight})
    res.status(200).send(
      pokemon
    );
  } catch {
    // Failure
    res.status(200).send({
      status: 400,
      msg: 'Invalid request',
    })
  }
}
