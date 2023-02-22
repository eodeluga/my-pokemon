import React, { useEffect, useState } from "react";
import { SearchParams } from "@/services/PokemonService";
import PokemonFeed from "./PokemonFeed";

export default function Filter() {
    // Use state to update pokemon on page from search results
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchPokemon = async () => {
            const res = await fetch("http://localhost:3000/api/v1/get-pokemon");
            setData(await res.json());
        };
        fetchPokemon();
    }, []);

    const filter = async (searchParams: SearchParams) => {
        let { height, weight } = searchParams;
        // Ensure not passing undefined value as search params
        height = height ? height : 0;
        weight = weight ? weight : 0;

        const newPokemon = await fetch(
            `http://localhost:3000/api/v1/get-pokemon?height=${height}&weight=${weight}`
        ).then((res) => res.json());

        // Update the page with search results
        setData(newPokemon);
    };

    return (
        <>
            <main className="max-w-screen-2xl mx-auto mt-5">
                {/* Search */}
                <div className="hidden sm:flex items-center h-10 rounded-md flex-grow col-span-3">
                    {/* Height */}
                    <input
                        className="p-2 m-10 h-full w-96 flex-shrink rounded-l-md focus:outline-none bg-red-300 placeholder-slate-800"
                        name="height"
                        type="number"
                        placeholder="Search by height"
                        onChange={(e) =>
                            filter({
                                // Don't allow negative values
                                height:
                                    parseInt(e.target.value) >= 0
                                        ? parseInt(e.target.value)
                                        : 0,
                                weight: 0,
                            })
                        }
                    />
                    {/* Weight */}
                    <input
                        className="p-2 m-10 h-full w-96 flex-shrink rounded-l-md focus:outline-none bg-red-300 placeholder-slate-800"
                        name="weight"
                        type="number"
                        placeholder="Search by weight"
                        onChange={(e) =>
                            filter({
                                // Don't allow negative values
                                weight:
                                    parseInt(e.target.value) >= 0
                                        ? parseInt(e.target.value)
                                        : 0,
                                height: 0,
                            })
                        }
                    />
                    {/* PokemonFeed */}
                    {/* Limit Pokemon to 100 */}
                </div>
                <div className="flex items-center mt-96">
                    {<PokemonFeed pokemon={data.splice(0, 100)} />}
                </div>
            </main>
        </>
    );
}
