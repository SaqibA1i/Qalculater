import React, { useState, useEffect } from "react";
import "./App.css";
import UserLogin from "./components/userAuth/userLogin";
import Navbar from "./components/navbar/navbar";
import { User } from "./TS types/Types";
import { Context, useQalcContext } from "./context/qalculaterContext";
import "./sass/styles.scss";

function App() {
  const [userInfo, setUserInfo] = useState<User>({
    firstName: "NULL",
    lastName: "NULL",
    imgURL: "NULL",
  });

  useEffect(() => {}, []);

  const setUserInfoHelper = (newUser: User) => {
    setUserInfo(newUser);
  };

  return (
    <Context.Provider
      value={{
        userInfo: userInfo,
        setUserInfo: setUserInfoHelper,
      }}
    >
      <Navbar />
      <UserLogin />
    </Context.Provider>
  );
}

export default App;
