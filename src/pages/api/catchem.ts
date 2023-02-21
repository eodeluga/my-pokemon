//import { PrismaClient } from "@prisma/client";
//const prisma = new PrismaClient();

//console.log("catch em");

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import catchemService from "@/services/catchem";

type Response = {
  status?: number;
  msg: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  fetch(
    "https://raw.githubusercontent.com/PokeAPI/pokeapi/master/data/v2/csv/pokemon.csv"
  )
    .then(async (data) => {
      // Throw object to catch block if errors
      if (!data.ok) throw data;

      const status = data.status;
      const body = await data.text();
      //service.insertCsv(body)
      catchemService
    })
    .catch((err) => {
      // Error response
      res.status(err.status).send({
        status: err.status,
        msg: err.statusText,
      });
    });
}
