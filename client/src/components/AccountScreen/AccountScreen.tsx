import React from "react";
import { useQalcContext } from "../../context/qalculaterContext";
import UserLogout from "../userAuth/userLogout";
import {
  QuestionCircle,
  FileEarmarkBarGraph,
  ChevronRight,
  LightningCharge,
} from "react-bootstrap-icons";

function AccountScreen() {
  const { userInfo } = useQalcContext()!;
  return (
    <div className="account-screen">
      <div className="profile">
        <img src={userInfo?.imgURL} />
        <h4>{userInfo?.firstName + ", " + userInfo?.lastName}</h4>
      </div>

      <div className="account-settings">
        <LightningCharge size={30} color={"#333"} />
        <h6>Animations</h6>
      </div>

      <div className="account-settings accordian">
        <div className="info">
          <FileEarmarkBarGraph size={30} color={"#333"} />
          <h6>GPA scale</h6>
        </div>

        <p>
          uWaterloo
          <ChevronRight size={20} color={"black"} />
        </p>
      </div>
      <div className="account-settings">
        <QuestionCircle size={30} color={"#333"} />
        <h6>About</h6>
      </div>
      <div className="hr"></div>
      <UserLogout />
    </div>
  );
}

export default AccountScreen;