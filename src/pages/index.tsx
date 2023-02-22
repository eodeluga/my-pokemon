import Head from "next/head";
import Header from "@/components/Header";
import { Pokemon } from "@/services/PokemonService";
import PokemonFeed from "@/components/PokemonFeed";
import { useEffect, useState } from "react";
import Filter from "@/components/Filter";

export default function Home({pokemon}: {pokemon: Pokemon[]}) {
 
  
  
  return (
    <div className="bg-gradient-to-t from-red-400 to-transparent pb-10 mb-20">
      <Head>
        <title>My Pokemon</title>
        <meta name="description" content="Choose your favourite Pokemon" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      
      <Filter />
      
      </div>
    
  );
}
