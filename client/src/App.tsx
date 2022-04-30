import { useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "react-notifications-component/dist/theme.css";
import "./sass/styles.scss";
import axios from "axios";
import Loader from "./components/Loader";
import ReactNotification from "react-notifications-component";
import MainRoutes from "./routes/MainRoutes";
import Wrappers from "./wrappers";

function App() {
  useEffect(() => {
    axios.defaults.withCredentials = true;
  }, []);

  return (
    <Wrappers>
      <Loader />
      <ReactNotification />
      <MainRoutes />
    </Wrappers>
  );
}

export default App;
