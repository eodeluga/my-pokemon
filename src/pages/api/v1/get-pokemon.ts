// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { object, string, number, date, InferType } from "yup";

import service, { Pokemon } from "@/services/PokemonService";
import { prismaClient } from "@/services/db";

type Response = {
  status: number;
  params?: SearchParams
  msg: string;
};

type SearchParams = {
  height: number | undefined;
  weight: number | undefined;
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
    // Destructure successfully validated parameters from request query
    const { height, weight } = await searchSchema.validate(req.query);
    // Success
    res.status(200).send({
      status: 200,
      params: {
        height: height,
        weight: weight,
      },
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
