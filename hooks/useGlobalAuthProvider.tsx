import { useContext } from "react";
import { AuthContext } from "./useAuth";

const useGlobalAuthProvider = () => {
  return useContext(AuthContext);
};

export default useGlobalAuthProvider;
