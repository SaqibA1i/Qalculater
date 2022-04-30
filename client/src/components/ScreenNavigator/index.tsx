import { Carousel } from "react-responsive-carousel";
import EditScreen from "../../pages/EditScreen/EditScreen";
import Navbar from "../navbar/navbar";
import { useDispatch, useSelector } from "react-redux";
import { getSlide } from "../../redux/carousel/selectors";
import { CAROUSEL_ACTIONS } from "../../redux/carousel";
import { getUserInfo } from "../../redux/userInfo/selectors";
import { useNavigate } from "react-router-dom";
import PopupModal from "../PopUpModal";
import { ScreenNav } from "./styles";
import BottomNavbar from "../BottomNavbar";
import HomeScreen from "../../pages/HomeScreen";
import AccountScreen from "../../pages/AccountScreen";

function ScreenNavigator() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector(getUserInfo);
  const { darkMode } = useSelector(getSlide);
  const { slide: swipeSlide } = useSelector(getSlide);

  if (!isAuthenticated) {
    navigate("/login");
    return <></>;
  }

  const getConfigurableProps: any = () => ({
    showArrows: false,
    showStatus: true,
    showIndicators: true,
    axis: "horizontal",
    infiniteLoop: false,
    showThumbs: false,
    useKeyboardArrows: false,
    autoPlay: false,
    stopOnHover: true,
    dynamicHeight: false,
    swipeable: false,
    emulateTouch: false,
    thumbWidth: 200,
    interval: 10,
    transitionTime: 300,
    swipeScrollTolerance: 50,

    preventMovementUntilSwipeScrollTolerance: true,
  });

  return (
    <ScreenNav>
      <PopupModal />
      <Navbar />
      <Carousel
        {...getConfigurableProps()}
        selectedItem={swipeSlide}
        onSwipeEnd={() => {
          setTimeout(() => {
            let statusElement = document.getElementsByClassName(
              "carousel-status"
            )[0] as HTMLBodyElement;
            let status = statusElement.innerText;
            dispatch(
              CAROUSEL_ACTIONS.updateSlide(parseInt(status.split("of")[0]) - 1)
            );
          }, 300);
        }}
      >
        <HomeScreen />
        <EditScreen />
        <AccountScreen />
      </Carousel>
      <BottomNavbar />
    </ScreenNav>
  );
}

export default ScreenNavigator;
