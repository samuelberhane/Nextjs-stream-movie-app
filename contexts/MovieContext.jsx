import React, { useContext, useReducer, createContext } from "react";

const MovieContext = createContext();

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "OPEN_MODAL":
      return { ...state, isModalOpen: true };

    case "CLOSE_MODAL":
      return { ...state, isModalOpen: false };

    default:
      break;
  }
};

const initialState = {
  isModalOpen: true,
  modalContent: null,
};

const MovieContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log("state", state);
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
