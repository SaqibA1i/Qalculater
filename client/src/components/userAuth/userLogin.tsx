import { useState, useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import GoogleButton from "./GoogleButton";
import useLogin from "../../hooks/useLogin";
import { useDispatch } from "react-redux";
import { LOADING_ACTIONS } from "../../redux/loading";

function UserLogin() {
  const dispatch = useDispatch();
  const { onSuccess, onFaliure } = useLogin();
  const [bubbles, setBubbles] = useState<JSX.Element[]>([]);

  useEffect(() => {
    let tempBubbles = [];
    for (let i = 0; i < 100; i++) {
      tempBubbles.push(<div key={i} className="bubble"></div>);
    }
    setBubbles(tempBubbles);
  }, []);

  const setLoading = (bool: boolean) => {
    dispatch(LOADING_ACTIONS.update(bool));
  };
  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_CLIENT_ID!}
      onRequest={() => {
        setLoading(true);
      }}
      onAutoLoadFinished={setLoading}
      onSuccess={onSuccess}
      onFailure={onFaliure}
      cookiePolicy={"single_host_origin"}
      render={(renderProps) => (
        <GoogleButton renderProps={renderProps} bubbles={bubbles} />
      )}
      style={{ marginTop: "100px" }}
      isSignedIn={true}
    />
  );
}

export default UserLogin;
