import React, { useContext, useReducer, createContext } from "react";

const MovieContext = createContext();

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "OPEN_MODAL":
      return { ...state, isModalOpen: true, currentMovie: payload };
    case "CLOSE_MODAL":
      return { ...state, isModalOpen: false, currentMovie: null };
    case "SUBSCRIBE":
      return { ...state, userSubscribe: payload };
    default:
      return state;
  }
};

const initialState = {
  isModalOpen: false,
  currentMovie: null,
  userSubscribe: null,
};

const MovieContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <MovieContext.Provider value={{ dispatch, ...state }}>
      {children}
    </MovieContext.Provider>
  );
};

const useGlobalMovieProvider = () => {
  return useContext(MovieContext);
};

export { MovieContextProvider, useGlobalMovieProvider };
