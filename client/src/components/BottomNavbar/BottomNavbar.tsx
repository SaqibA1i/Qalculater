import React, { useState } from "react";
import { House, Pen, PersonCircle } from "react-bootstrap-icons";
import { useQalcContext } from "../../context/qalculaterContext";

function BottomNavbar() {
  let iconSize = 23;
  let iconColor = "#406882";
  let iconColorChosen = "#002199";
  const { swipeSlide, setSwipeSlide } = useQalcContext()!;

  return (
    <div className="bottom-navbar-container">
      <div className="bottom-navbar">
        <div
          onClick={() => {
            let element = document
              .getElementsByClassName("control-dots")[0]
              .getElementsByClassName("dot")[0] as HTMLElement;
            element.click();
            setSwipeSlide!(0);
          }}
          className={swipeSlide == 0 ? "bottom-navbar-chosen" : ""}
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
            setSwipeSlide!(1);
          }}
          className={swipeSlide == 1 ? "bottom-navbar-chosen" : ""}
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
            setSwipeSlide!(2);
          }}
          className={swipeSlide == 2 ? "bottom-navbar-chosen" : ""}
        >
          <PersonCircle size={iconSize} />
          <p>Account</p>
        </div>
      </div>
    </div>
  );
}

export default BottomNavbar;
