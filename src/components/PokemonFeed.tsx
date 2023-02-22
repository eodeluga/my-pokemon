import { Pokemon} from "@/services/PokemonService";
import PokemonCard from "./PokemonCard";
import React from "react";


export default function PokemonFeed({ pokemon }: { pokemon: Pokemon[] }) {
    
  return (
    <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 mx-auto">    
        {pokemon.map(({ id, name, artwork_url, height, weight }) => (
          <PokemonCard
            key={id}
            name={name}
            artwork_url={artwork_url}
            height={height}
            weight={weight}
          />
        ))}
    </div>
  );
}
