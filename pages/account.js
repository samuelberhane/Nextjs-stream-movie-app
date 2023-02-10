import React, { useEffect, useState } from "react";
import { Loader, Navbar } from "../components";
import { HiDocumentDuplicate } from "react-icons/hi";
import moment from "moment";
import { auth, db } from "../firebase/config";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Link from "next/link";
import axios from "axios";

const Account = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const router = useRouter();

  // check if user subscribed
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, "users", user?.email);
        const userExists = await getDoc(userRef);
        if (!userExists.data()) {
          router.push("/subscribe");
        }
        setLoading(false);
      }
    });
  }, []);

  onSnapshot(doc(db, "users", auth?.currentUser?.email), (snapshot) => {
    setUser(snapshot.data());
  });
  console.log("user", user);

  // logout user
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

  console.log("user", user);

  const restartMembership = async () => {
    if (auth?.currentUser) {
      await updateDoc(doc(db, "users", auth?.currentUser?.email), {
        canceled: false,
      });
    }
  };

  const cancelMembership = async () => {
    if (auth?.currentUser) {
      await updateDoc(doc(db, "users", auth?.currentUser?.email), {
        canceled: true,
      });
    }
  };

  if (loading || !user) return <Loader />;

  return (
    <div>
      <Navbar />
      <div className="mt-[90px] px-4 md:px-8 max-w-4xl mx-auto">
        <h1 className="font-bold text-xl md:text-2xl lg:text-3xl">Account</h1>
        <div className="flex gap-1 items-center text-gray-500 mt-2">
          <HiDocumentDuplicate className="text-lg text-red-500" />{" "}
          <p className="text-sm md:text-[16px]">
            Member since{" "}
            {moment
              .unix(user?.timestamp?.seconds)
              .format("dddd, Do MMM YYYY, h:mm:ss A")}
          </p>
        </div>
        <div>
          <div className="mt-2 md:mt-4 border-2 md:border-0 md:border-b-2 border-gray-500 px-3 py-2">
            <p className="text-gray-400">Membership & Billing</p>
            {user.canceled ? (
              <button
                className="text-black bg-white max-w-[350px] px-20 py-3 my-2"
                onClick={restartMembership}
              >
                Restart Membership
              </button>
            ) : (
              <button
                className="text-black bg-white max-w-[350px] px-20 py-3 my-2"
                onClick={cancelMembership}
              >
                Cancel Membership
              </button>
            )}

            <p className="my-1">Email: {auth?.currentUser?.email}</p>
            <p className="text-gray-500">Password: ********</p>
            <p className="text-sm">
              {user.canceled
                ? "Your membership will be expired on"
                : "Your next billing is on"}{" "}
              {moment
                .unix(user?.timestamp?.seconds)
                .add(user.paymentCycle, "M")
                .format("dddd, Do MMM YYYY, h:mm:ss A")}
            </p>
            {user.paymentCycle > 1 && (
              <p className="text-sm text-gray-500 mt-1">
                Your {user.planName} plan will start on{" "}
                {moment
                  .unix(user?.timestamp?.seconds)
                  .add(1, "M")
                  .format("dddd, Do MMM YYYY, h:mm:ss A")}
              </p>
            )}
          </div>
          <div className="mt-2 mb:mt-4 border-2 md:border-0 md:border-b-2 border-gray-500 px-3 py-2">
            <p>Plan Details</p>
            <p className="font-bold ">{user?.planName}</p>
            <Link href="/subscribe" className="text-blue-500">
              Change Plan
            </Link>
          </div>
          <div className="mt-2 mb:mt-4 border-2 md:border-0 md:border-b-2 border-gray-500 px-3 py-2">
            <p>Settings</p>
            <button className="text-blue-500" onClick={handleLogout}>
              Sign out of all devices
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  // redirect user to login page if not logged in
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

export default Account;
