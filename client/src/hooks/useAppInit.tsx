import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CAROUSEL_ACTIONS } from "../redux/carousel";
import { DARK_MODE } from "../redux/carousel/types";
import { CURR_SELECTION_ACTIONS } from "../redux/currentSelections";
import { getUserInfo } from "../redux/userInfo/selectors";
import { LOCAL_STORAGE } from "../utils/constants";

const useAppInit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector(getUserInfo);
  const darkMode = localStorage.getItem(LOCAL_STORAGE.DARK_MODE);
  const currCourse =
    localStorage.getItem(LOCAL_STORAGE.COURSE) === undefined
      ? undefined
      : localStorage.getItem(LOCAL_STORAGE.COURSE) || undefined;
  const currTerm =
    localStorage.getItem(LOCAL_STORAGE.TERM) === undefined
      ? undefined
      : localStorage.getItem(LOCAL_STORAGE.TERM) || undefined;
  const termHidden = localStorage.getItem(LOCAL_STORAGE.IS_TERM_HIDDEN);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
    dispatch(CAROUSEL_ACTIONS.toggleDarkMode(!!Number(darkMode)));
    dispatch(CURR_SELECTION_ACTIONS.update({ currCourse, currTerm }));
    dispatch(CAROUSEL_ACTIONS.toggleTermHidden(!!Number(termHidden)));
  }, [
    currCourse,
    currTerm,
    darkMode,
    dispatch,
    isAuthenticated,
    navigate,
    termHidden,
  ]);
};

export default useAppInit;
