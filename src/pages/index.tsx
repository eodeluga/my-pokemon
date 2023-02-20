import Head from "next/head";
import Header from "@/components/Header";
export default function Home() {
  return (
    <div className="bg-gradient-to-t from-red-400 to-transparent">
      <Head>
        <title>My Pokemon</title>
        <meta name="description" content="Choose your favourite Pokemon" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
      <main className="max-w-screen-2xl mx-auto">
        
      </main>
    </div>
  );
}
