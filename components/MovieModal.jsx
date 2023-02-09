import { AiOutlineCloseCircle, AiOutlineCheckCircle } from "react-icons/ai";
import { BsVolumeUp, BsVolumeMute } from "react-icons/bs";
import { useGlobalMovieProvider } from "../contexts/MovieContext";
import { useState, useEffect } from "react";
import React from "react";
import ReactPlayer from "react-player/lazy";

const MovieModal = () => {
  const { dispatch, currentMovie } = useGlobalMovieProvider();
  const [trailer, setTrailer] = useState(null);
  const [genres, setGenres] = useState(null);
  const [muted, setMuted] = useState(false);

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

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.6)] z-[40] px-4  flex justify-center">
      <div className="w-full md:w-[700px] lg:w-[900px] h-[85vh] bg-white text-black rounded mt-[80px] md:mt-[100px] relative">
        <AiOutlineCloseCircle
          className="absolute top-2 right-2 text-3xl cursor-pointer text-white"
          onClick={() => dispatch({ type: "CLOSE_MODAL" })}
        />
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${trailer}`}
          width="100%"
          height="70%"
          playing
          muted={muted}
        />
        <div className="relative">
          <div className="flex justify-between items-center absolute -top-10 px-10 md:px-12 text-3xl text-white w-full">
            {/* <AiOutlineCheckCircle className="cursor-pointer" /> */}
            <div onClick={() => setMuted((prev) => !prev)}>
              {!muted ? (
                <BsVolumeUp className="cursor-pointer" />
              ) : (
                <BsVolumeMute className="cursor-pointer" />
              )}
            </div>
          </div>
          <div className="flex px-2 justify-between pt-2 overflow-hidden">
            <div className="w-full sm:w-[65%]">
              <div className="flex items-center space-x-2 text-sm">
                <p className="font-semibold text-green-400">
                  {currentMovie?.vote_average * 10}% Match
                </p>
                <p className="font-light">
                  {currentMovie?.release_date || currentMovie?.first_air_date}
                </p>
              </div>
              <p className="text-sm mt-1">{currentMovie?.overview}</p>
            </div>

            <div className="flex-col font-light md:flex-row hidden sm:flex mt-4">
              <div className="flex flex-col space-y-3 text-sm">
                <div>
                  <span className="text-[gray]">Genres:</span>{" "}
                  {genres?.map((genre) => genre.name).join(", ")}
                </div>

                <div>
                  <span className="text-[gray]">Original language:</span>{" "}
                  {currentMovie?.original_language}
                </div>

                <div>
                  <span className="text-[gray]">Total votes:</span>{" "}
                  {currentMovie?.vote_count}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
