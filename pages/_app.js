import "../styles/globals.css";
import { MovieContextProvider } from "../contexts/MovieContext";

function MyApp({ Component, pageProps }) {
  return (
    <MovieContextProvider>
      <Component {...pageProps} />
    </MovieContextProvider>
  );
}

export default MyApp;
