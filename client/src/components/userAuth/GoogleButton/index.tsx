import WaveImage from "./Wave";
import googleIcon from "../../../images/google.png";
import { useSelector } from "react-redux";
import { getLoadingSelector } from "../../../redux/loading/selectors";

type Props = {
  renderProps: { onClick: () => void };
  bubbles: JSX.Element[];
};

const GoogleButton = ({ renderProps, bubbles }: Props) => {
  const loading = useSelector(getLoadingSelector);
  return (
    <div className="login">
      <div className="top-section">
        <div className="bubble-container">
          <div className="bubble-wrap">{bubbles}</div>
        </div>
        <h1>Welcome to the grades app!</h1>
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
