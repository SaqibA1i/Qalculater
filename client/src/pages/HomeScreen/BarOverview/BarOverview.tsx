import { useSelector } from "react-redux";

import { getSelData } from "../../../redux/currentSelections/selectors";
import useUpdateSelection from "../../../hooks/useUpdateSelection";
import { getFilteredData } from "../../../redux/grades/selectors";
import { keys } from "lodash";
import { getColor } from "../../../utils/helpers/colors";
import { Box } from "../../../styles/Box";
import { HBox } from "../../../styles/HBox";
import styled, { ThemeContext } from "styled-components";
import { useContext } from "react";
import { Text } from "../../../styles/Text";
import { HoveringText, StyledHBox, StyledHr, StyledLine } from "./styles";

function BarOverview() {
  const { updateSelected } = useUpdateSelection();
  const theme = useContext(ThemeContext);

  const { currTerm, currCourse } = useSelector(getSelData);
  const { terms, courses } = useSelector(getFilteredData);
  if (currTerm === undefined) {
    return <></>;
  }
  const { average = 0 } = terms[currTerm] || {};

  const getWidth = () => {
    return 65 / keys(courses).length + "vw"; // 5 margin each side
  };

  const getGradient = (courseAverage: number) => {
    return (
      "linear-gradient(" +
      getColor((courseAverage + 3) / 100) +
      ", " +
      getColor((courseAverage - 10) / 100) +
      ")"
    );
  };

  const sortedCourses = keys(courses).sort((a, b) => {
    const { average: prev } = courses[a];
    const { average: next } = courses[b];
    if (prev < next) {
      return 0;
    }
    return -1;
  });

  return (
    <Box paddingTop="50px">
      <StyledLine style={{ top: -2 * average + 347 }}>
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
                  height: average * 2 || 0 + "px",
                  width: width,
                  background: getGradient(average),
                  boxShadow:
                    "0px 0px 9px 0px " + getColor((average - 10) / 100),
                }}
              >
                <HoveringText>{average.toFixed(2)}%</HoveringText>
              </Box>
              <Text
                color={currCourse === courseName ? theme.textAccent : ""}
                fontWeight={currCourse === courseName ? 700 : 200}
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
