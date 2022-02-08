import { SpinnerInfinity } from "spinners-react";
import useAcademicData from "../hooks/useAcademicData";
import ScreenNavigator from "./ScreenNavigator";
import UserLogin from "./userAuth/userLogin";

export default function ScreenWrapper() {
  const { status, data } = useAcademicData(undefined);
  console.log(status);
  return (
    <>
      {data != undefined && data.status === 200 ? (
        <ScreenNavigator />
      ) : (
        <UserLogin />
      )}
    </>
  );
}
