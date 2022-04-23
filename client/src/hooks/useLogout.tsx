import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CURR_SELECTION_ACTIONS } from "../redux/currentSelections";
import { LOADING_ACTIONS } from "../redux/loading";
import { USER_ACTIONS } from "../redux/userInfo";
import useNotification, { NOTICATION } from "./useNotification";

type Return = {
  logout: () => void;
};
const useLogout = (): Return => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { notify } = useNotification();

  const setLoading = (bool: boolean) => {
    dispatch(LOADING_ACTIONS.update(bool));
  };

  const logout = () => {
    setLoading(true);
    axios({
      method: "post",
      url: process.env.REACT_APP_SERVER_PROXY! + "auth/logout",
    })
      .then((res) => {
        setLoading(false);
        dispatch(USER_ACTIONS.authenticate(false));
        dispatch(CURR_SELECTION_ACTIONS.reset());
        navigate("/login");
        notify({
          title: "Logout",
          message: "Success!",
          type: NOTICATION.SUCCESS,
        });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        notify({
          title: "Logout",
          message: "Faliure!",
          type: NOTICATION.DANGER,
        });
      });
  };

  return {
    logout,
  };
};

export default useLogout;
