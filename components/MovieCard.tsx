import Image from "next/image";
import { Movie } from "../typings";

interface Props {
  movie: Movie;
}

const MovieCard = ({ movie }: Props) => {
  return (
    <div className="relative h-28 min-w-[180px] cursor-pointer">
      <Image
        src={`https://image.tmdb.org/t/p/w500${
          movie.backdrop_path || movie.poster_path
        }`}
        className="rounded-sm object-cover md:rounded hover:scale-[1.02] md:hover:scale-105  transition duration-200"
        layout="fill"
        sizes=""
        alt="movieImg"
      />
    </div>
  );
};

export default MovieCard;
