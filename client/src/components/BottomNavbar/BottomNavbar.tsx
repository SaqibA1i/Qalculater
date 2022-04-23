import { House, Pen, PersonCircle } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { CAROUSEL_ACTIONS } from "../../redux/carousel";
import { getSlide } from "../../redux/carousel/selectors";
import { Carousel, CAROUSEL_SLIDE } from "../../redux/carousel/types";

function BottomNavbar() {
  let iconSize = 23;
  const dispatch = useDispatch();
  const { slide: swipeSlide } = useSelector(getSlide) as Carousel;
  const setSwipeSlide = (slide: CAROUSEL_SLIDE) => {
    dispatch(CAROUSEL_ACTIONS.updateSlide(slide));
  };
  return (
    <div className="bottom-navbar-container">
      <div className="bottom-navbar">
        <div
          onClick={() => {
            let element = document
              .getElementsByClassName("control-dots")[0]
              .getElementsByClassName("dot")[0] as HTMLElement;
            element.click();
            setSwipeSlide(CAROUSEL_SLIDE.HOME);
          }}
          className={
            swipeSlide === CAROUSEL_SLIDE.HOME ? "bottom-navbar-chosen" : ""
          }
        >
          <House size={iconSize} />
          <p>Home</p>
        </div>
        <div
          onClick={() => {
            let element = document
              .getElementsByClassName("control-dots")[0]
              .getElementsByClassName("dot")[1] as HTMLElement;
            element.click();
            setSwipeSlide(CAROUSEL_SLIDE.EDIT);
          }}
          className={
            swipeSlide === CAROUSEL_SLIDE.EDIT ? "bottom-navbar-chosen" : ""
          }
        >
          <Pen size={iconSize} />
          <p>Edit</p>
        </div>
        <div
          onClick={() => {
            let element = document
              .getElementsByClassName("control-dots")[0]
              .getElementsByClassName("dot")[2] as HTMLElement;
            element.click();
            setSwipeSlide(CAROUSEL_SLIDE.ACCOUNT);
          }}
          className={
            swipeSlide === CAROUSEL_SLIDE.ACCOUNT ? "bottom-navbar-chosen" : ""
          }
        >
          <PersonCircle size={iconSize} />
          <p>Account</p>
        </div>
      </div>
    </div>
  );
}

export default BottomNavbar;
