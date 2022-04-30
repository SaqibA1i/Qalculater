import { useContext } from "react";
import { Lock } from "react-bootstrap-icons";
import { GoogleLogout } from "react-google-login";
import styled, { ThemeContext } from "styled-components";
import useLogout from "../../hooks/useLogout";
import { StyledHBox } from "../../pages/AccountScreen/styles";
import { Box } from "../../styles/Box";
import { HBox } from "../../styles/HBox";
import { getColor } from "../../utils/helpers/colors";

function UserLogout() {
  const { logout } = useLogout();
  const theme = useContext(ThemeContext);
  return (
    <GoogleLogout
      clientId={process.env.REACT_APP_CLIENT_ID!}
      buttonText="Logout"
      onLogoutSuccess={logout}
      render={(renderProps) => (
        <StyledHBox
          style={{ cursor: "pointer" }}
          background={theme.error}
          onClick={renderProps.onClick}
        >
          <HBox>
            <Lock size={30} color={theme.light} />
            <Box color={theme.light}>Logout</Box>
          </HBox>
        </StyledHBox>
      )}
    />
  );
}

export default UserLogout;
