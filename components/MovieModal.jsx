import { AiOutlineCloseCircle } from "react-icons/ai";
import { useGlobalMovieProvider } from "../contexts/MovieContext";
import { useState, useEffect } from "react";

const MovieModal = () => {
  const { dispatch, currentMovie } = useGlobalMovieProvider();
  const [trailer, setTrailer] = useState(null);
  const [genre, setGenres] = useState(null);

  useEffect(() => {
    if (!currentMovie) return;

    const fetchMovie = async () => {
      const data = await fetch(
        `https://api.themoviedb.org/3/${
          currentMovie?.media_type === "tv" ? "tv" : "movie"
        }/${currentMovie?.id}?api_key=${
          process.env.NEXT_PUBLIC_MOVIE_APIKEY
        }&language=en-US&append_to_response=videos`
      ).then((response) => response.json());
      if (data?.videos) {
        const index = data.videos.results.findIndex(
          (element) => element.type === "Trailer"
        );
        setTrailer(data.videos?.results[index]?.key);
      }
      if (data?.genres) {
        setGenres(data.genres);
      }
    };

    fetchMovie();
  }, [currentMovie]);

  console.log("trailer", trailer);
  console.log("genre", genre);
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.6)] z-[40] px-4 md:px-16 lg:px-20 flex justify-center">
      <div className="w-full h-[70vh] md:h-[75vh] bg-black rounded mt-[80px] md:mt-[100px] relative">
        <AiOutlineCloseCircle
          className="absolute top-2 right-2 text-3xl cursor-pointer"
          onClick={() => dispatch({ type: "CLOSE_MODAL" })}
        />
      </div>
    </div>
  );
};

export default MovieModal;
