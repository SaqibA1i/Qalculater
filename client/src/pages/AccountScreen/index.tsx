import UserLogout from "../../components/userAuth/userLogout";
import {
  Lightbulb,
  LockFill,
  CircleFill,
  QuestionCircle,
  Mailbox,
  BoxArrowUpRight,
  Envelope,
} from "react-bootstrap-icons";
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
import SectionRow from "./SectionRow";
import { DEV_EMAIL } from "../../utils/constants";

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

      <SectionRow
        label="Dark Mode"
        icon={<Lightbulb size={30} />}
        element={
          <SliderPillBox
            darkMode={darkMode}
            onClick={() => {
              dispatch(CAROUSEL_ACTIONS.toggleDarkMode(!darkMode));
            }}
          >
            <CircleFill size={20} />
          </SliderPillBox>
        }
      />
      <SectionRow
        label="Contact developer"
        icon={<Envelope size={30} />}
        element={
          <Box as="a" href={`mailto:${DEV_EMAIL}?subject=Grades Application`}>
            <BoxArrowUpRight size={30} />
          </Box>
        }
      />
      <StyledHr as="hr" />
      <UserLogout />
    </StyledVBox>
  );
}

export default AccountScreen;
