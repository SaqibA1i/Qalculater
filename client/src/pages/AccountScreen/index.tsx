import UserLogout from "../../components/userAuth/userLogout";
import { Lightbulb, LockFill, CircleFill } from "react-bootstrap-icons";
import { UserInfo } from "../../redux/userInfo/types";
import { getUserInfo } from "../../redux/userInfo/selectors";
import { useDispatch, useSelector } from "react-redux";
import { getSlide } from "../../redux/carousel/selectors";
import { Carousel } from "../../redux/carousel/types";
import { CAROUSEL_ACTIONS } from "../../redux/carousel";
import { Box } from "../../styles/Box";
import { VBox } from "../../styles/VBox";
import { Portfolio, StyledHBox, StyledHr, StyledVBox } from "./styles";
import { HBox } from "../../styles/HBox";
import styled from "styled-components";

type Props = {
  theme: any;
  darkMode: boolean;
};

const SliderPillBox = styled(HBox)<Props>`
  width: 50px;
  border-radius: 20px;

  ${({ theme, darkMode }) => `
    justify-content: ${darkMode ? "end" : "start"};
    background: ${theme.accent};
    color: ${theme.textAccent};
    border: 1px solid ${theme.backdrop}
  `}
`;

function AccountScreen() {
  const dispatch = useDispatch();
  const { firstName, lastName, imgURL } = useSelector(getUserInfo) as UserInfo;
  const { darkMode } = useSelector(getSlide) as Carousel;
  return (
    <StyledVBox>
      <Portfolio src={imgURL} alt="User Icon" />
      <Box fontWeight="bold">{firstName + ", " + lastName}</Box>
      <HBox>
        <LockFill color={"green"} size={15} />
        <Box>Your data is encrypted!</Box>
      </HBox>

      <StyledHBox>
        <HBox>
          <Lightbulb size={30} />
          <Box marginLeft="1rem" fontWeight="600">
            Dark Mode
          </Box>
        </HBox>
        <SliderPillBox
          darkMode={darkMode}
          onClick={() => {
            dispatch(CAROUSEL_ACTIONS.toggleDarkMode(!darkMode));
          }}
        >
          <CircleFill size={20} />
        </SliderPillBox>
      </StyledHBox>
      <StyledHr as="hr" />
      <UserLogout />
    </StyledVBox>
  );
}

export default AccountScreen;
