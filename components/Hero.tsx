import Image from "next/image";
import { useEffect, useState } from "react";
import { Movie } from "../typings";
import { baseUrl } from "../utils/variables";
import { BsPlayFill, BsFillInfoCircleFill } from "react-icons/bs";
interface Prop {
  NetflixOriginals: [Movie];
}

const Hero = ({ NetflixOriginals }: Prop) => {
  const [currentMovie, setCurrentMovie] = useState<Movie | null>(null);

  useEffect(() => {
    setCurrentMovie(
      NetflixOriginals[Math.floor(Math.random() * NetflixOriginals.length)]
    );
  }, []);

  return (
    <div className="text-white w-full h-screen relative">
      <div className="absolute top-0 left-0 w-full h-screen -z-10">
        <Image
          src={`${baseUrl}${
            currentMovie?.backdrop_path || currentMovie?.poster_path
          }`}
          alt="Movie-img"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="absolute z-10 top-[20%] left-10">
        <h1 className="text-2xl font-bold text-white md:text-4xl lg:text-5xl mb-1 md:mb-2 lg:mb-3">
          {currentMovie?.name ||
            currentMovie?.title ||
            currentMovie?.original_name}
        </h1>
        <p className="w-3/4 md:w-1/2 text-sm md:text-md lg:text-lg">
          {currentMovie?.overview}
        </p>
        <div className="flex space-x-2 md:space-x-4 lg:space-x-5 items-center mt-2 md:mt-4">
          <button className="heroBtn flex items-center bg-white text-black">
            <BsPlayFill className="text-black md:w-7 md:h-7" /> Play
          </button>
          <button className="heroBtn bg-[rgba(82,63,63,0.4)] flex items-center gap-2">
            More Info <BsFillInfoCircleFill className="md:w-7 md:h-7" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
