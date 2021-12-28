import React, { useState, useEffect } from "react";
import "./App.css";
import UserLogin from "./components/userAuth/userLogin";
import Navbar from "./components/navbar/navbar";
import { currSelection, User } from "./TS types/Types";
import { Context, useQalcContext } from "./context/qalculaterContext";
import ReactNotification from "react-notifications-component";
import {
  BrowserRouter as Router,
  Navigate,
  Routes,
  Route,
  Link
} from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import "./sass/styles.scss";

import ScreenNavigator from "./components/ScreenNavigator";

function App() {
  /** STATE **/
  const [userInfo, setUserInfo] = useState<User>({
    firstName: "NULL",
    lastName: "NULL",
    imgURL: "NULL",
    data: []
  });

  const [isAuthenticated, setAuthenticated] = useState<boolean>(false);
  const [selection, setSelection] = useState<currSelection>({
    currTerm: "undefined",
    currCourse: "undefined"
  });
  const [swipeSlide, setSwipeSlide] = useState<number>(0);
  const [carouselSwipable, setCarouselSwipable] = useState<boolean>(true);

  /** Helper Functions to modify state **/
  const setUserInfoHelper = (newUser: User) => {
    setUserInfo(newUser);
  };
  const setAuthenticatedHelper = (isAuth: boolean) => {
    setAuthenticated(isAuth);
  };
  const setSelectionHelper = (sel: currSelection) => {
    localStorage.setItem("currentTerm", sel.currTerm);
    localStorage.setItem("currentCourse", sel.currCourse);

    setSelection(sel);
  };
  const setSwipeSlideHelper = (slide: number) => {
    setSwipeSlide(slide);
  };

  const setCarouselSwipableHelper = (slideBool: boolean) => {
    setCarouselSwipable(slideBool);
  };

  useEffect(() => {}, []);
  return (
    <Context.Provider
      value={{
        userInfo: userInfo,
        selection: selection,
        swipeSlide: swipeSlide,
        setSwipeSlide: setSwipeSlideHelper,
        setSelection: setSelectionHelper,
        isAuthenticated: isAuthenticated,
        setUserInfo: setUserInfoHelper,
        setAuthenticated: setAuthenticatedHelper,
        carouselSwipable: carouselSwipable,
        setCarouselSwipable: setCarouselSwipableHelper
      }}
    >
      <ReactNotification />
      <Router basename={process.env.PUBLIC_URL}>
        {!isAuthenticated ? (
          <Routes>
            <Route path="/" element={<UserLogin />} />
          </Routes>
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <ScreenNavigator />
                </>
              }
            />
          </Routes>
        )}
      </Router>
    </Context.Provider>
  );
}

export default App;
