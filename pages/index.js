import axios from "axios";
import Head from "next/head";
import { Navbar, Hero, Category, Loader, MovieModal } from "../components";
import requests from "../utils/requests";
import { useGlobalMovieProvider } from "../contexts/MovieContext";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { onAuthStateChanged } from "firebase/auth";

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
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // check if user subscribed
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, "users", user?.email);
        const userExists = await getDoc(userRef);
        if (userExists.data()) {
          setUser(userExists.data());
        } else {
          router.push("/subscribe");
        }
        setLoading(false);
      }
    });
  }, [user]);

  if (loading || !user) return <Loader />;

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
  // redirect user to login page if not logged in
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
