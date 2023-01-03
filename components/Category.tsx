import { Movie } from "../typings";
import { MovieCard } from "./";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useRef, useState } from "react";

interface Props {
  Movies: [Movie];
  title: string;
}

const Category = ({ Movies, title }: Props) => {
  const categoryRef = useRef<HTMLDivElement>(null);
  const [moving, setMoving] = useState(false);

  const handleScroll = (direction: string) => {
    setMoving(true);
    if (categoryRef.current) {
      const { scrollLeft, clientWidth } = categoryRef.current;

      const scrollDirection =
        direction === "right"
          ? scrollLeft + clientWidth
          : scrollLeft - clientWidth;

      categoryRef.current.scrollTo({
        left: scrollDirection,
        behavior: "smooth",
      });
    }
  };
  return (
    <div className="mb-6">
      <p className="text-xl font-semibold mb-1 mx:font-bold md:text-2xl">
        {title}
      </p>
      <div className="relative h-30 group">
        {moving && (
          <AiOutlineLeft
            className="absolute cursor-pointer left-2 top-[50%] translate-y-[-50%] text-2xl md:text-5xl opacity-0 group-hover:opacity-100  z-20"
            onClick={() => handleScroll("left")}
          />
        )}
        <div
          className="flex items-center gap-2 md:gap-3 overflow-x-scroll scrollbar-hide"
          ref={categoryRef}
        >
          {Movies.map((movie, index) => (
            <MovieCard key={index} movie={movie} />
          ))}
        </div>
        <AiOutlineRight
          className="absolute cursor-pointer right-2 top-[50%] translate-y-[-50%] text-2xl md:text-5xl opacity-0 group-hover:opacity-100  z-20"
          onClick={() => handleScroll("right")}
        />
      </div>
    </div>
  );
};

export default Category;
