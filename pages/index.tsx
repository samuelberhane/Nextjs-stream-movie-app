import axios from "axios";
import Head from "next/head";
import { Navbar, Hero } from "../components";
import requests from "../utils/requests";
import { Movie } from "../typings";

interface Props {
  Trending: [Movie];
  NetflixOriginals: [Movie];
  TopRated: [Movie];
  ActionMovies: [Movie];
  ComedyMovies: [Movie];
  HorrorMovies: [Movie];
  RomanceMovies: [Movie];
  Documentaries: [Movie];
}

const Home = ({
  Trending,
  NetflixOriginals,
  TopRated,
  ActionMovies,
  ComedyMovies,
  HorrorMovies,
  RomanceMovies,
  Documentaries,
}: Props) => {
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
        <Hero />

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

export const getServerSideProps = async () => {
  const [
    Trending,
    NetflixOriginals,
    TopRated,
    ActionMovies,
    ComedyMovies,
    HorrorMovies,
    RomanceMovies,
    Documentaries,
  ] = await Promise.all([
    axios.get(requests.Trending),
    axios.get(requests.NetflixOriginals),
    axios.get(requests.TopRated),
    axios.get(requests.ActionMovies),
    axios.get(requests.ComedyMovies),
    axios.get(requests.HorrorMovies),
    axios.get(requests.RomanceMovies),
    axios.get(requests.Documentaries),
  ]);

  return {
    props: {
      Trending: Trending.data.results,
      NetflixOriginals: NetflixOriginals.data.results,
      TopRated: TopRated.data.results,
      ActionMovies: ActionMovies.data.results,
      ComedyMovies: ComedyMovies.data.results,
      HorrorMovies: HorrorMovies.data.results,
      RomanceMovies: RomanceMovies.data.results,
      Documentaries: Documentaries.data.results,
    },
  };
};

export default Home;
