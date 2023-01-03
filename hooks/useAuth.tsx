import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";

import { useRouter } from "next/router";
import React, { useState, createContext, useMemo, useEffect } from "react";
import { auth } from "../firebase/config";

interface Auth {
  user: User | null;
  Signup: (email: string, password: string) => Promise<void>;
  Signin: (email: string, password: string) => Promise<void>;
  Logout: () => Promise<void>;
  error: string | null;
  isLoading: boolean;
  initialLoading: boolean;
}

export const AuthContext = createContext<Auth>({
  user: null,
  Signup: async () => {},
  Signin: async () => {},
  Logout: async () => {},
  error: null,
  isLoading: false,
  initialLoading: true,
});

interface AuthContextProp {
  children: React.ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProp) => {
  const [initialLoading, setInitialLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        setInitialLoading(true);
        if (user) {
          setInitialLoading(false);
          setUser(user);
          setIsLoading(false);
        } else {
          setInitialLoading(false);
          setUser(null);
          setIsLoading(false);
          router.push("/auth/login");
        }
      }),
    [auth]
  );
  // create user
  const Signup = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
        setIsLoading(false);
        router.push("/");
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error.message);
      });
  };

  //  signin user
  const Signin = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
        setIsLoading(false);
        router.push("/");
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error.message);
      });
  };

  // user logout
  const Logout = async () => {
    setIsLoading(true);
    setError(null);
    await signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const memoedValue = useMemo(
    () => ({ user, Signup, Signin, error, isLoading, Logout, initialLoading }),
    [user, isLoading, error]
  );

  return (
    <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>
  );
};
