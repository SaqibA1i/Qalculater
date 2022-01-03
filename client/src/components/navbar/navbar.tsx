import React, { useEffect } from "react";
import { SpinnerInfinity } from "spinners-react";
import { useQalcContext } from "../../context/qalculaterContext";
import LoadingGif from "../../images/loading.gif";

function Navbar() {
  const { userInfo, selection, setSwipeSlide } = useQalcContext()!;
  return (
    <div className="navbar">
      <div className="welcome">
        Welcome, {userInfo?.firstName}
        <br />
        <h6>
          {selection?.currTerm == "undefined"
            ? "Choose a Term"
            : "Term: " + selection?.currTerm + ", " + selection?.currCourse}
        </h6>
      </div>
      <img
        onClick={() => {
          setSwipeSlide(2);
        }}
        className="nav-profile-img"
        src={userInfo!.imgURL}
      />
    </div>
  );
}

export default Navbar;
