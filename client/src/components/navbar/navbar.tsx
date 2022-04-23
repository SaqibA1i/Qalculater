import { useDispatch, useSelector } from "react-redux";
import { CAROUSEL_ACTIONS } from "../../redux/carousel";
import { CAROUSEL_SLIDE } from "../../redux/carousel/types";
import { getSelData } from "../../redux/currentSelections/selectors";
import { getUserInfo } from "../../redux/userInfo/selectors";
import { UserInfo } from "../../redux/userInfo/types";
import { CurrSelection } from "../../TS types/Types";

const Navbar = () => {
  const dispatch = useDispatch();
  const { currTerm, currCourse } = useSelector(getSelData) as CurrSelection;
  const { firstName, imgURL } = useSelector(getUserInfo) as UserInfo;
  return (
    <div className="navbar">
      <div className="welcome">
        Welcome, {firstName}
        <br />
        <h6>
          {currTerm === undefined
            ? "Choose a Term"
            : "Term: " + currTerm + ", " + currCourse}
        </h6>
      </div>
      <img
        onClick={() => {
          dispatch(CAROUSEL_ACTIONS.updateSlide(CAROUSEL_SLIDE.ACCOUNT));
        }}
        className="nav-profile-img"
        src={imgURL}
        alt="User Icon"
      />
    </div>
  );
};

export default Navbar;
