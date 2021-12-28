import React from "react";
import { Carousel } from "react-responsive-carousel";
import BottomNavbar from "./BottomNavbar/BottomNavbar";
import EditScreen from "./EditScreen/EditScreen";
import HomeScreen from "./HomeScreen/HomeScreen";
import Navbar from "./navbar/navbar";
import AccountScreen from "./AccountScreen/AccountScreen";
import { useQalcContext } from "../context/qalculaterContext";

function ScreenNavigator() {
  const { setSwipeSlide, swipeSlide, carouselSwipable, setCarouselSwipable } =
    useQalcContext()!;

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

    preventMovementUntilSwipeScrollTolerance: true
  });

  return (
    <div className="screen-navigator">
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
            setSwipeSlide!(parseInt(status.split("of")[0]) - 1);
          }, 300);
        }}
      >
        <HomeScreen />
        <EditScreen />
        <AccountScreen />
      </Carousel>
      <BottomNavbar />
    </div>
  );
}

export default ScreenNavigator;
