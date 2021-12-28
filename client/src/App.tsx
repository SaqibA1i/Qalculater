import React, { useState, useEffect } from "react";
import "./App.css";
import UserLogin from "./components/userAuth/userLogin";
import Navbar from "./components/navbar/navbar";
import { currSelection, User } from "./TS types/Types";
import { Context, useQalcContext } from "./context/qalculaterContext";
import ReactNotification, { store } from "react-notifications-component";

import "react-responsive-carousel/lib/styles/carousel.min.css";

import "./sass/styles.scss";

import ScreenNavigator from "./components/ScreenNavigator";
import axios from "axios";

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
  const [swipeSlide, setSwipeSlide] = useState<number>(1);
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

  useEffect(() => {
    if (document.cookie.includes("G_AUTHUSER_H")) {
      setAuthenticated(true);
      console.log("here");
      axios({
        method: "post",
        url: process.env.REACT_APP_SERVER_PROXY + "auth/login",
        timeout: 10000, // 10 seconds timeout
        withCredentials: true
      })
        .then((responseJson) => {
          let response: User = responseJson.data.data;
          // console.log(response);

          setUserInfo(response);
          // Deal with the Current Term and Course
          let currTerm: string | null = localStorage.getItem("currentTerm");
          let currCourse: string | null = localStorage.getItem("currentCourse");

          let tempSel: currSelection = {
            currTerm: currTerm !== null ? currTerm : "undefined",
            currCourse: currCourse !== null ? currCourse : "undefined"
          };

          if (currTerm === null && response.data.length !== 0) {
            // getting the first term in the data array
            tempSel.currTerm = Object.keys(response.data[0])[0];
            tempSel.currCourse = "undefined";
          } else if (response.data.length === 0) {
            tempSel.currTerm = "undefined";
            tempSel.currCourse = "undefined";
          }

          // local storage is either a term or its an undefined string
          setSelection(tempSel);
          store.addNotification({
            title: "Login",
            message: "Success!",
            type: "success",
            insert: "top",
            container: "top-center",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 3000,
              onScreen: true
            }
          });
        })
        .catch((err) => {
          console.log(err.toString());
          setAuthenticated(false);
          store.addNotification({
            title: "Login",
            message: JSON.stringify(err),
            type: "danger",
            insert: "top",
            container: "top-center",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 3000,
              onScreen: true
            }
          });
        });
    } else {
      console.log("not authenticated");
      setAuthenticated(false);
    }
  }, []);
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
      {isAuthenticated ? <ScreenNavigator /> : <UserLogin />}
    </Context.Provider>
  );
}

export default App;
