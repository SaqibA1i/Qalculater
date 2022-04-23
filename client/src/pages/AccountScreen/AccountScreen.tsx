import UserLogout from "../../components/userAuth/userLogout";
import { Lightbulb, LockFill, CircleFill } from "react-bootstrap-icons";
import { UserInfo } from "../../redux/userInfo/types";
import { getUserInfo } from "../../redux/userInfo/selectors";
import { useDispatch, useSelector } from "react-redux";
import { getSlide } from "../../redux/carousel/selectors";
import { Carousel } from "../../redux/carousel/types";
import { CAROUSEL_ACTIONS } from "../../redux/carousel";

function AccountScreen() {
  const dispatch = useDispatch();
  const { firstName, lastName, imgURL } = useSelector(getUserInfo) as UserInfo;
  const { darkMode } = useSelector(getSlide) as Carousel;
  return (
    <div className="account-screen">
      <div className="profile">
        <img src={imgURL} alt="User Icon" />
        <h4>{firstName + ", " + lastName}</h4>
        <span>
          <LockFill color={"green"} size={15} />
          <p>Your data is encrypted!</p>
        </span>
      </div>

      <div
        className="account-settings"
        onClick={() => {
          dispatch(CAROUSEL_ACTIONS.toggleDarkMode(!darkMode));
        }}
      >
        <div className="left-section">
          <Lightbulb size={30} />
          <h6>Dark Mode</h6>
        </div>
        <div className={"slider-click"}>
          <CircleFill />
        </div>
      </div>
      <div className="hr"></div>
      <UserLogout />
    </div>
  );
}

export default AccountScreen;
