import { Pokemon } from "@/services/PokemonService";
import React from "react";
import Image from "next/image";

function PokemonCard({ id, name, height, weight, artwork_url, }: Pokemon) {
  return (
    <div className="relative flex-col m-5 bg-white z-30 p-10">
      
      <h4 className="font-extrabold my-3">{name}</h4>
      <Image
        className="object-fill"
        src={artwork_url}
        height={200}
        width={200}
        alt={`${name} image`}
      />
      

      <p className="text-xsmy-2 line-clamp-2">Height: {height}</p>
      <p className="text-xsmy-2 line-clamp-2">Weight: {weight}</p>
      
    </div>
  );
}

export default PokemonCard;
