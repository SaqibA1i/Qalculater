import React, { useState } from "react";
import { currSelection, User } from "../TS types/Types";

export type graph_t = {
  userInfo: User;
  setUserInfo: (newUserInfo: User) => void;
  selection: currSelection;
  setSelection: (sel: currSelection) => void;
  swipeSlide: number;
  setSwipeSlide: (slide: number) => void;
  isAuthenticated: boolean;
  setAuthenticated: (isAuth: boolean) => void;
  carouselSwipable: boolean;
  setCarouselSwipable: (b: boolean) => void;
  darkMode: boolean;
  setDarkMode: (b: boolean) => void;
};

export const Context = React.createContext<graph_t | undefined>(undefined);

export const useQalcContext = () => React.useContext(Context);
