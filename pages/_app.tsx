import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthContextProvider } from "../hooks/useAuth";
import { MovieContextProvider } from "../contexts/MovieContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <MovieContextProvider>
        <Component {...pageProps} />
      </MovieContextProvider>
    </AuthContextProvider>
  );
}

export default MyApp;
