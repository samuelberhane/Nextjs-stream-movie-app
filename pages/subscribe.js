import React, { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { Loader } from "../components";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import { BsCheck2 } from "react-icons/bs";

const Subscribe = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    await signOut(auth)
      .then(async () => {
        router.push("/auth/login");
        await axios.post("/api/logout");
      })
      .catch((error) => {
        console.log(error.message);
      });
    setLoading(false);
  };

  if (loading) return <Loader />;

  return (
    <div>
      <div className="flex items-center justify-between px-4 md:px-8 py-4 md:py-6 w-full transition-all shadow-md z-50 bg-[rgba(50,56,56,0.6)]">
        <Link
          href="/"
          className="text-red-500 font-bold text-3xl md:text-4xl uppercase items-center"
        >
          Stream
        </Link>
        <button className="px-6 py-2 rounded bg-red-500" onClick={handleLogout}>
          Sign out
        </button>
      </div>
      <div className="mt-4 px-4 md:px-8 max-w-4xl mx-auto">
        <h1 className="font-bold text-lg md:text-2xl mb-1">
          Choose the plan that&#39;s right for you
        </h1>
        <div className="flex items-center gap-1 font-light">
          <BsCheck2 className="text-red-500 text-lg" />{" "}
          <p>Watch all you want.Ad-free.</p>
        </div>
        <div className="flex items-center gap-1 font-light">
          <BsCheck2 className="text-red-500 text-lg" />{" "}
          <p>Recommendations just for you.</p>
        </div>
        <div className="flex items-center gap-1 font-light">
          <BsCheck2 className="text-red-500 text-lg" />{" "}
          <p>Change or cancel your plan anytime.</p>
        </div>
        <div className="flex mt-8 justify-between">
          <div />
          <div className="subContainer">
            <div className="bg-red-300 subContent">
              <p className="w-full text-center">Basic</p>
            </div>
            <div className="bg-red-300 subContent">
              <p className="w-full text-center">Standard</p>
            </div>
            <div className="bg-red-500 subContent">
              <p className="w-full text-center">Premium</p>
            </div>
          </div>
        </div>

        {/* Price */}
        <div className="flex mt-2 items-center justify-between border-b-2">
          <div>Monthly price</div>
          <div className="subContainer">
            <div className="subContent">
              <p>USD29</p>
            </div>
            <div className="subContent">
              <p>USD40</p>
            </div>
            <div className="subContent text-red-500">
              <p>USD52</p>
            </div>
          </div>
        </div>

        {/* Video Quality */}
        <div className="flex mt-2 items-center justify-between border-b-2">
          <div>Video quality</div>
          <div className="subContainer">
            <div className="subContent">
              <p>Good</p>
            </div>
            <div className="subContent">
              <p>Better</p>
            </div>
            <div className="subContent text-red-500">
              <p>Best</p>
            </div>
          </div>
        </div>

        {/* Resolution */}
        <div className="flex mt-2 justify-between items-center border-b-2">
          <div>Resolution</div>
          <div className="subContainer">
            <div className="subContent">
              <p>480p</p>
            </div>
            <div className="subContent">
              <p>1080p</p>
            </div>
            <div className="subContent text-red-500">
              <p>4K+HDR</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <button className="bg-red-500 text-white py-3 px-20">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async function (context) {
  if (!context.req?.cookies?.token) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default Subscribe;
