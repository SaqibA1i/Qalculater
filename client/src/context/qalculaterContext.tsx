import React, { useState } from "react";
import { User } from "../TS types/Types";

export type graph_t = {
  userInfo?: User;
  setUserInfo?: (newUserInfo: User) => void;
};

export const Context = React.createContext<graph_t>({});

export const useQalcContext = () => React.useContext(Context);
