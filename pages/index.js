import axios from "axios";
import Head from "next/head";
import { Navbar, Hero, Category, Loader, MovieModal } from "../components";
import requests from "../utils/requests";
import { useGlobalMovieProvider } from "../contexts/MovieContext";

const Home = ({
  Trending,
  NetflixOriginals,
  TopRated,
  ActionMovies,
  ComedyMovies,
  HorrorMovies,
  RomanceMovies,
  Documentaries,
}) => {
  const { isModalOpen } = useGlobalMovieProvider();

  return (
    <div className="min-h-screen gradient-to-b">
      <Head>
        <title>Home - Stream Netflix Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navbar */}
      <Navbar />

      <main>
        {/* Hero */}
        <Hero NetflixOriginals={NetflixOriginals} />

        <section className="absolute top-[77vh] left-0 right-0 z-10 px-2 md:px-4 lg:px-6">
          {/* Category */}
          <Category Movies={Trending} title="Trending" />
          <Category Movies={TopRated} title="Top Rated" />
          <Category Movies={ActionMovies} title="Action Movies" />
          <Category Movies={ComedyMovies} title="Comedy Movies" />
          <Category Movies={HorrorMovies} title="Horror Movies" />
          <Category Movies={RomanceMovies} title="Romance Movies" />
          <Category Movies={Documentaries} title="Documentaries" />
        </section>
      </main>
      {/* Modal */}
      {isModalOpen && <MovieModal />}
    </div>
  );
};

export const getServerSideProps = async (context) => {
  if (!context.req?.cookies?.token) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

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
