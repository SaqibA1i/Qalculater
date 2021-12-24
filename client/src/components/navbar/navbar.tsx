import React, { useEffect } from "react";
import { useQalcContext } from "../../context/qalculaterContext";
import LoadingGif from "../../images/loading.gif";

function Navbar() {
  const { userInfo } = useQalcContext();
  return (
    <div className="navbar">
      <img
        className="nav-profile-img"
        src={userInfo?.imgURL != "NULL" ? userInfo!.imgURL : LoadingGif}
      />
    </div>
  );
}

export default Navbar;
