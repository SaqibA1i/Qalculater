import { House, Pen, PersonCircle } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { CAROUSEL_ACTIONS } from "../../redux/carousel";
import { getSlide } from "../../redux/carousel/selectors";
import { Carousel, CAROUSEL_SLIDE } from "../../redux/carousel/types";
import { Box } from "../../styles/Box";
import { HBox } from "../../styles/HBox";
import SingleEntry from "./SingleEntry";

const StyledBar = styled(HBox)`
  justify-content: space-around;
  padding: 10px;
  position: fixed;
  bottom: 0;
  width: 100vw;
  ${({ theme }) => `
    background: ${theme.main}
  `}
`;

const BottomNavbar = () => {
  return (
    <StyledBar>
      <SingleEntry
        label="Home"
        icon={<House size={23} />}
        slide={CAROUSEL_SLIDE.HOME}
      />
      <SingleEntry
        label="Edit"
        icon={<Pen size={23} />}
        slide={CAROUSEL_SLIDE.EDIT}
      />
      <SingleEntry
        label="Account"
        icon={<PersonCircle size={23} />}
        slide={CAROUSEL_SLIDE.ACCOUNT}
      />
    </StyledBar>
  );
};

export default BottomNavbar;
