import Head from "next/head";
import Image from "next/image";

const Login = () => {
  return (
    <div className="relative w-full h-screen flex sm:items-center sm:justify-center flex-col bg-black sm:bg-transparent">
      <Head>
        <title>Auth - Stream</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="z-10 absolute top-0 left-0 p-2 md:px-4 lg:px-6 md:py-3 text-red-600 font-bold text-3xl md:text-4xl uppercase items-center">
        Stream
      </h1>
      <Image
        src="https://rb.gy/p2hphi"
        layout="fill"
        className="!hidden opacity-80 sm:!inline"
        objectFit="cover"
        alt="netflixBg"
      />

      <form className="mt-20 mx-4 z-20 sm:bg-[rgba(0,0,0,0.6)] sm:px-6 sm:py-3">
        <h1 className="font-bold text-3xl mb-4">Sign In</h1>
        <label className="block mb-3">
          <input type="text" placeholder="Email" className="input" />
        </label>
        <label className="block">
          <input type="password" placeholder="password" className="input" />
        </label>
        <button className="mt-4 w-full rounded py-2 bg-red-600" type="submit">
          Sign In
        </button>
        <p className="mt-2 text-gray-400">
          New to Stream?{" "}
          <span className="cursor-pointer text-white">Sign up now</span>
        </p>
      </form>
    </div>
  );
};

export default Login;
