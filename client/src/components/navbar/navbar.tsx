import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { CAROUSEL_ACTIONS } from "../../redux/carousel";
import { CAROUSEL_SLIDE } from "../../redux/carousel/types";
import { getSelData } from "../../redux/currentSelections/selectors";
import { getUserInfo } from "../../redux/userInfo/selectors";
import { UserInfo } from "../../redux/userInfo/types";
import { Box } from "../../styles/Box";
import { HBox } from "../../styles/HBox";
import { VBox } from "../../styles/VBox";
import { CurrSelection } from "../../TS types/Types";

const StyledHBox = styled(HBox)`
  justify-content: space-between;
  padding: 1.4rem;
  padding-bottom: 0;
  margin-bottom: 1rem;
`;

const StyledImg = styled.img`
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
`;

const Navbar = () => {
  const dispatch = useDispatch();
  const { currTerm, currCourse } = useSelector(getSelData) as CurrSelection;
  const { firstName, imgURL } = useSelector(getUserInfo) as UserInfo;
  return (
    <StyledHBox>
      <VBox style={{ alignItems: "start" }}>
        <Box fontWeight={900} fontSize="1.5rem">
          Welcome, {firstName}
        </Box>
        <Box as="p" fontWeight="500" fontSize="1.2rem">
          {currTerm || "Choose a Term"} {currCourse ? ": " + currCourse : ""}
        </Box>
      </VBox>
      <StyledImg
        onClick={() => {
          dispatch(CAROUSEL_ACTIONS.updateSlide(CAROUSEL_SLIDE.ACCOUNT));
        }}
        src={imgURL}
        alt="User Icon"
      />
    </StyledHBox>
  );
};

export default Navbar;
