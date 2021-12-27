import React, { useState } from "react";
import { House, Pen, PersonCircle } from "react-bootstrap-icons";
import { useQalcContext } from "../../context/qalculaterContext";

function BottomNavbar() {
  let iconSize = 23;
  let iconColor = "#406882";
  let iconColorChosen = "#1A374D";
  const { swipeSlide, setSwipeSlide } = useQalcContext()!;

  return (
    <div className="bottom-navbar-container">
      <div className="bottom-navbar">
        <div className={swipeSlide == 0 ? "bottom-navbar-chosen" : ""}>
          <House
            size={iconSize}
            color={swipeSlide == 0 ? iconColorChosen : iconColor}
            onClick={() => {
              let element = document
                .getElementsByClassName("control-dots")[0]
                .getElementsByClassName("dot")[0] as HTMLElement;
              element.click();
              setSwipeSlide!(0);
            }}
          />
          <p>Home</p>
        </div>
        <div className={swipeSlide == 1 ? "bottom-navbar-chosen" : ""}>
          <Pen
            size={iconSize}
            color={swipeSlide == 1 ? iconColorChosen : iconColor}
            onClick={() => {
              let element = document
                .getElementsByClassName("control-dots")[0]
                .getElementsByClassName("dot")[1] as HTMLElement;
              element.click();
              setSwipeSlide!(1);
            }}
          />
          <p>Edit</p>
        </div>
        <div className={swipeSlide == 2 ? "bottom-navbar-chosen" : ""}>
          <PersonCircle
            size={iconSize}
            color={swipeSlide == 2 ? iconColorChosen : iconColor}
            onClick={() => {
              let element = document
                .getElementsByClassName("control-dots")[0]
                .getElementsByClassName("dot")[2] as HTMLElement;
              element.click();
              setSwipeSlide!(2);
            }}
          />
          <p>Account</p>
        </div>
      </div>
    </div>
  );
}

export default BottomNavbar;
