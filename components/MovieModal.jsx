import { AiOutlineCloseCircle } from "react-icons/ai";
import { useGlobalMovieProvider } from "../contexts/MovieContext";

const MovieModal = () => {
  const { dispatch } = useGlobalMovieProvider();
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.6)] z-[40] px-4 flex justify-center">
      <div className="w-full h-[70vh] bg-black rounded mt-[80px] md:mt-[100px] md:w-[700px] lg:w-[900px] relative">
        <AiOutlineCloseCircle
          className="absolute top-2 right-2 text-3xl cursor-pointer"
          onClick={() => dispatch({ type: "CLOSE_MODAL" })}
        />
      </div>
    </div>
  );
};

export default MovieModal;
