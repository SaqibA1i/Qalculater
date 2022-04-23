import { Lock } from "react-bootstrap-icons";
import { GoogleLogout } from "react-google-login";
import useLogout from "../../hooks/useLogout";

function UserLogout() {
  const { logout } = useLogout();
  return (
    <GoogleLogout
      clientId={process.env.REACT_APP_CLIENT_ID!}
      buttonText="Logout"
      onLogoutSuccess={logout}
      render={(renderProps) => (
        <div className="logout-account-settings" onClick={renderProps.onClick}>
          <Lock size={30} color={"#fff"} />
          <h6>Logout</h6>
        </div>
      )}
    />
  );
}

export default UserLogout;
