import axios from "axios";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { Loader } from "../../components";
import { auth, db } from "../../firebase/config";
import { useGlobalMovieProvider } from "../../contexts/MovieContext";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch } = useGlobalMovieProvider();
  const router = useRouter();

  const handleSubmit = async (string) => {
    setLoading(true);
    if (string === "login") {
      //login user
      await signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          const user = userCredential.user;
          if (user) {
            await axios.post("/api/login", { email });
            const userRef = doc(db, "users", email);
            const userExists = await getDoc(userRef);
            if (!userExists.data()) router.push("/subscribe");
            else {
              dispatch({ type: "SUBSCRIBE", payload: userExists.data() });
              router.push("/");
            }
          }
        })
        .catch((error) => {
          setError(error.message);
        });
    } else {
      await createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          const user = userCredential.user;
          await axios.post("/api/login");
          router.push("/subscribe");
        })
        .catch((error) => {
          setError(error.message);
        });
    }
    setLoading(false);
  };

  if (loading) return <Loader />;
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

      <form className="mt-20 mx-4 z-20 sm:bg-[rgba(0,0,0,0.7)] sm:px-6 sm:py-3 sm:w-[320px]">
        <h1 className="font-bold text-3xl mb-4">Sign In</h1>
        <label className="block mb-3">
          <input
            type="email"
            placeholder="Email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            pattern={`${/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/}`}
          />
        </label>
        <label className="block">
          <input
            type="password"
            placeholder="Password"
            className="input"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            min={6}
          />
        </label>
        {error && (
          <p className=" text-center p-1 text-[16px] font-light  text-red-300">
            {error.replace("Firebase: Error (auth/", "").replace(")", "")}
          </p>
        )}
        <button
          className="mt-4 w-full rounded py-2 bg-red-600"
          type="submit"
          onClick={() => handleSubmit("login")}
        >
          Sign In
        </button>
        <p className="mt-2 text-gray-400">
          New to Stream?{" "}
          <button
            className="cursor-pointer text-white"
            type="submit"
            onClick={() => handleSubmit("signup")}
          >
            Sign up now
          </button>
        </p>
      </form>
    </div>
  );
};

export const getServerSideProps = async function (context) {
  if (context?.req?.cookies?.token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default Login;
