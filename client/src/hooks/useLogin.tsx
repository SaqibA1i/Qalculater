import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getSelData } from "../redux/currentSelections/selectors";
import { GRADE_FILTERED_ACTIONS } from "../redux/grades";
import { convertAcademicData } from "../redux/grades/helpers";
import { LOADING_ACTIONS } from "../redux/loading";
import { USER_ACTIONS } from "../redux/userInfo";
import { AcademicData, User } from "../TS types/Types";
import { TOKEN } from "../utils/constants";
import useNotification, { NOTICATION } from "./useNotification";

type Return = {
  onSuccess: (res: unknown) => void;
  onFaliure: (res: unknown) => void;
};
const useLogin = (): Return => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { notify } = useNotification();
  const { currTerm, currCourse } = useSelector(getSelData);
  const setLoading = (bool: boolean) => {
    dispatch(LOADING_ACTIONS.update(bool));
  };
  const onSuccess = (res: any) => {
    sessionStorage.setItem(TOKEN.JWT_TOKEN, res.tokenObj.id_token);
    sessionStorage.setItem(TOKEN.ACCESS_TOKEN, res.tokenObj.access_token);
    setLoading(true);
    axios({
      method: "post",
      url: process.env.REACT_APP_SERVER_PROXY + "auth/login",

      data: {
        id_token: res.tokenObj.id_token,
        access_token: res.tokenObj.access_token,
      },
    })
      .then((responseJson) => {
        let response = responseJson.data.data as User;
        const data = response.data as AcademicData;
        dispatch(USER_ACTIONS.update(response));
        dispatch(USER_ACTIONS.authenticate(true));
        dispatch(GRADE_FILTERED_ACTIONS.update(data));
        const convertedData = convertAcademicData(data);
        if (currTerm && convertedData[currTerm]) {
          dispatch(GRADE_FILTERED_ACTIONS.updateCourses(currTerm));
          if (currCourse && convertedData[currTerm][currCourse]) {
            dispatch(
              GRADE_FILTERED_ACTIONS.updateAssessments({ currCourse, currTerm })
            );
          }
        }

        navigate("/");
        setLoading(false);
        notify({
          title: "Login",
          message: "Success!",
          type: NOTICATION.SUCCESS,
        });
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.toString());
        dispatch(USER_ACTIONS.authenticate(false));
        notify({
          title: "Login",
          message: `${err}`,
          type: NOTICATION.DANGER,
        });
      });
  };

  const onFaliure = (res: any) => {
    setLoading(false);
    dispatch(USER_ACTIONS.authenticate(false));
    notify({
      title: "Login not performed",
      message: `${res.message || " "}`,
      type: NOTICATION.WARNING,
    });
  };

  return {
    onSuccess,
    onFaliure,
  };
};

export default useLogin;
