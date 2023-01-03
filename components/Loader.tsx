import spinner from "../public/Spinner.gif";
import Image from "next/image";

const Loader = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <Image src={spinner} alt="spinner" width={100} height={100} />
    </div>
  );
};

export default Loader;
