import { useSelector } from "react-redux";

import { getSelData } from "../../../redux/currentSelections/selectors";
import useUpdateSelection from "../../../hooks/useUpdateSelection";
import { getFilteredData } from "../../../redux/grades/selectors";
import { keys } from "lodash";
import { getColor, getGradient } from "../../../utils/helpers/colors";
import { Box } from "../../../styles/Box";
import { ThemeContext } from "styled-components";
import { useContext } from "react";
import { Text } from "../../../styles/Text";
import { HoveringText, StyledHBox, StyledHr, StyledLine } from "./styles";
import { CAROUSEL_SLIDE } from "../../../redux/carousel/types";
import { getSlide } from "../../../redux/carousel/selectors";

function BarOverview() {
  const theme = useContext(ThemeContext);
  const { updateSelected } = useUpdateSelection();

  const { currTerm, currCourse } = useSelector(getSelData);
  const { terms, courses } = useSelector(getFilteredData);
  const { slide } = useSelector(getSlide);

  if (currTerm === undefined) {
    return <></>;
  }
  const { average = 0 } = terms[currTerm] || {};

  const getWidth = () => {
    return 65 / keys(courses).length + "vw"; // 5 margin each side
  };

  const isHomeSelected: number = slide === CAROUSEL_SLIDE.HOME ? 1 : 0;

  const sortedCourses = keys(courses).sort((a, b) => {
    const { average: prev } = courses[a];
    const { average: next } = courses[b];
    if (prev < next) {
      return 0;
    }
    return -1;
  });

  return (
    <Box padding="50px 30px 30px 30px" width="-webkit-fill-available">
      <StyledLine average={average}>
        <p>{average}</p>
        <StyledHr />
      </StyledLine>
      <StyledHBox marginLeft="2.5rem">
        {sortedCourses.map((courseName: string, idx) => {
          const { average } = courses[courseName];
          let width = getWidth();
          return (
            <Box key={idx}>
              <Box
                borderRadius="0.5rem"
                onClick={() => {
                  updateSelected({ currTerm, currCourse: courseName });
                }}
                style={{
                  height: isHomeSelected * (average * 2 || 0) + "px",
                  width: width,
                  background: getGradient(average),
                  transitionDelay: `${idx}00ms`,
                  boxShadow:
                    "0px 0px 9px 0px " + getColor((average - 10) / 100),
                }}
              >
                <HoveringText>{average.toFixed(2)}%</HoveringText>
              </Box>
              <Text
                color={currCourse === courseName ? theme.textAccent : ""}
                fontWeight={currCourse === courseName ? 900 : 200}
                fontSize="0.8rem"
                border={
                  "1px solid " + currCourse === courseName
                    ? "black"
                    : "transparent"
                }
              >
                {courseName}
              </Text>
            </Box>
          );
        })}
      </StyledHBox>
    </Box>
  );
}

export default BarOverview;
