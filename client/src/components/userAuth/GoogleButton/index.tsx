import WaveImage from "./Wave";
import googleIcon from "../../../images/google.png";
import { useSelector } from "react-redux";
import { getLoadingSelector } from "../../../redux/loading/selectors";
import { Box } from "styles/Box";
import { useContext } from "react";
import { ThemeContext } from "styled-components";

type Props = {
  renderProps: { onClick: () => void };
  bubbles: JSX.Element[];
};

const GoogleButton = ({ renderProps, bubbles }: Props) => {
  const loading = useSelector(getLoadingSelector);
  const theme = useContext(ThemeContext);
  return (
    <div className="login">
      <div className="top-section">
        <div className="bubble-container">
          <div className="bubble-wrap">{bubbles}</div>
        </div>
        <h1>
          Welcome to the Grades Tracker App!
          <p style={{ fontSize: "15px", fontWeight: "500", textAlign: "left" }}>
            This Application is a copyright of{" "}
            <a href="https://codele.ca" style={{ color: theme.textAccent }}>
              @Codele Web Dev
            </a>
            , founded by{" "}
            <a href="https://saqibali.ca" style={{ color: theme.textAccent }}>
              @Saqib Ali
            </a>
          </p>
        </h1>

        <WaveImage />
      </div>
      <div className="bottom-section">
        {!loading && (
          <button onClick={renderProps.onClick}>
            <img src={googleIcon} alt="Google Icon" />
            Sign in
          </button>
        )}
      </div>
    </div>
  );
};

export default GoogleButton;
