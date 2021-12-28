import React, { useEffect } from "react";
import { SpinnerInfinity } from "spinners-react";
import { useQalcContext } from "../../context/qalculaterContext";
import LoadingGif from "../../images/loading.gif";

function Navbar() {
  const { userInfo, selection } = useQalcContext()!;
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
      {userInfo?.imgURL != "NULL" ? (
        <img className="nav-profile-img" src={userInfo!.imgURL} />
      ) : (
        <SpinnerInfinity size={50} color={"red"} />
      )}
    </div>
  );
}

export default Navbar;
