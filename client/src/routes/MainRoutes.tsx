import { Route, Routes } from "react-router-dom";
import ScreenNavigator from "../components/ScreenNavigator";
import UserLogin from "../components/userAuth/userLogin";
import useAppInit from "../hooks/useAppInit";

const MainRoutes = () => {
  useAppInit();
  return (
    <Routes>
      <Route path="/login" element={<UserLogin />} />
      <Route index element={<ScreenNavigator />} />
    </Routes>
  );
};

export default MainRoutes;
