import React from "react";
import { Navbar } from "../components";
import { HiDocumentDuplicate } from "react-icons/hi";
import { useGlobalMovieProvider } from "../contexts/MovieContext";
import moment from "moment";
import { auth } from "../firebase/config";

const Account = () => {
  const { userSubscribe } = useGlobalMovieProvider();
  let date = moment.unix(userSubscribe?.timestamp?.seconds);
  console.log(date.format("dddd, Do MMM YYYY, h:mm:ss A"), userSubscribe);

  return (
    <div>
      <Navbar />
      <div className="mt-[90px] px-4 md:px-8 max-w-4xl mx-auto">
        <h1 className="font-bold text-xl md:text-2xl lg:text-3xl">Account</h1>
        <div className="flex gap-1 items-center text-gray-500 mt-2">
          <HiDocumentDuplicate className="text-lg text-red-500" />{" "}
          <p className="text-sm md:text-[16px]">
            Member since {date.format("dddd, Do MMM YYYY, h:mm:ss A")}
          </p>
        </div>
        <div>
          <div className="mt-2 md:mt-4 border-2 md:border-0 md:border-b-2 border-gray-500 px-3 py-2">
            <p className="text-gray-400">Membership & Billing</p>
            <button className="text-black bg-white max-w-[350px] px-20 py-3 my-2">
              Cancel Membership
            </button>
            <p className="my-1">Email: {auth?.currentUser?.email}</p>
            <p className="text-gray-500">Password: ********</p>
            <p className="text-sm">
              Your next billing is on{" "}
              {date.add(1, "M").format("dddd, Do MMM YYYY, h:mm:ss A")}
            </p>
          </div>
          <div className="mt-2 mb:mt-4 border-2 md:border-0 md:border-b-2 border-gray-500 px-3 py-2">
            <p>Plan Details</p>
            <p className="font-bold ">{userSubscribe?.planName}</p>
            <button className="text-blue-500">Change Plan</button>
          </div>
          <div className="mt-2 mb:mt-4 border-2 md:border-0 md:border-b-2 border-gray-500 px-3 py-2">
            <p>Settings</p>
            <button className="text-blue-500">Sign out of all devices</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
