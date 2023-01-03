import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Loader } from "../../components";
import useGlobalAuthContext from "../../hooks/useGlobalAuthProvider";

interface FormData {
  email: string;
  password: string;
}

const Login = () => {
  const [login, setLogin] = useState(false);
  const { Signin, Signup, error, isLoading } = useGlobalAuthContext();
  let formatError;
  if (error) {
    formatError = error.replace("Firebase: Error (auth/", "").replace(")", "");
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const { email, password } = data;
    if (login) {
      Signin(email, password);
    } else {
      Signup(email, password);
    }
  };

  if (isLoading) return <Loader />;
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

      <form
        className="mt-20 mx-4 z-20 sm:bg-[rgba(0,0,0,0.7)] sm:px-6 sm:py-3 sm:w-[320px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="font-bold text-3xl mb-4">Sign In</h1>
        <label className="block mb-3">
          <input
            type="text"
            placeholder="Email"
            className="input"
            {...register("email", {
              required: true,
              pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            })}
          />
          {errors.email && (
            <p className=" text-center p-1 text-[13px] font-light  text-red-300">
              Please enter a valid email address!
            </p>
          )}
        </label>
        <label className="block">
          <input
            type="password"
            placeholder="Password"
            className="input"
            {...register("password", { required: true, minLength: 6 })}
          />

          {errors.password && (
            <p className=" text-center p-1 text-[13px] font-light  text-red-300">
              Password should contain at least 6 characters!
            </p>
          )}

          {error && (
            <p className=" text-center p-1 text-[16px] font-light  text-red-300">
              {formatError}
            </p>
          )}
        </label>
        <button
          className="mt-4 w-full rounded py-2 bg-red-600"
          type="submit"
          onClick={() => setLogin(true)}
        >
          Sign In
        </button>
        <p className="mt-2 text-gray-400">
          New to Stream?{" "}
          <button
            className="cursor-pointer text-white"
            type="submit"
            onClick={() => setLogin(false)}
          >
            Sign up now
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
