import type { NextPage } from "next";
import Head from "next/head";
import { Navbar } from "../components";

const Home: NextPage = () => {
  return (
    <div className="min-h-screen">
      <Head>
        <title>Home - Stream Netflix Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navbar */}
      <Navbar />

      <main>
        {/* Hero */}
        <h1>Stream Netflix Clone</h1>
        <section>
          {/* Row */}
          {/* Row */}
          {/* Row */}
          {/* Row */}
        </section>
      </main>
      {/* Modal */}
    </div>
  );
};

export default Home;
