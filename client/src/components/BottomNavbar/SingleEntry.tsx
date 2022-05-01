import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThemeContext } from "styled-components";
import { CAROUSEL_ACTIONS } from "../../redux/carousel";
import { getSlide } from "../../redux/carousel/selectors";
import { CAROUSEL_SLIDE } from "../../redux/carousel/types";
import { Box } from "../../styles/Box";
import { VBox } from "../../styles/VBox";
import { switchSlide } from "../../utils/helpers/slide";

type Props = {
  slide: CAROUSEL_SLIDE;
  icon: JSX.Element;
  label: string;
};
const SingleEntry = ({ slide, icon, label }: Props) => {
  const { slide: swipeSlide } = useSelector(getSlide);
  const theme = useContext(ThemeContext);
  const dispatch = useDispatch();
  const selStyle = {
    color: swipeSlide === slide ? theme.textAccent : theme.text,
    fontWeight: swipeSlide === slide ? 700 : 200,
  };

  return (
    <VBox
      style={{
        gap: "0.6rem",
        cursor: "pointer",
        ...selStyle,
      }}
      onClick={() => {
        switchSlide(slide);
        dispatch(CAROUSEL_ACTIONS.updateSlide(slide));
      }}
    >
      {icon}
      <Box {...selStyle}>{label}</Box>
    </VBox>
  );
};
export default SingleEntry;
