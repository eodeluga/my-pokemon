import Head from "next/head";
import Header from "@/components/Header";
import { useEffect, useState } from "react";
import Filter from "@/components/Filter";
import { ClipLoader } from "react-spinners";
import statusLog from "@/services/logger";

export default function Home() {
    // Catch Pokemon! (seed the database)
    const [isLoading, setLoadingState] = useState(true);
    useEffect(() => {
        const seedDatabase = async () => {
            try {
            const res = await fetch("http://localhost:3000/api/internal/catch-pokemon");
            if (res.ok) {
                setLoadingState(false);    
            } else {
                fetch("http://localhost:3000/api/internal/catch-pokemon")
            }
        } catch (err) {
            
            statusLog(false, `index.tsx: Internal server error${err}\nOh...`);
        }
            
        };
        seedDatabase();
    }, []);

    if (isLoading) {
        return (
            <div className="bg-gradient-to-t from-red-400 to-transparent pb-10 mb-20">
                <p className="text-lg font-semibold">LOADING POKEMON</p>
                <ClipLoader
                    size={150}
                    aria-label="Loading Pokemon"
                    data-testid="loader"
                />
            </div>
        );
    } else {
        return (
            <div className="bg-gradient-to-t from-red-400 to-transparent pb-10 mb-20">
                <Head>
                    <title>My Pokemon</title>
                    <meta
                        name="description"
                        content="Choose your favourite Pokemon"
                    />
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1"
                    />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <Header />

                <Filter />
            </div>
        );
    }
}
