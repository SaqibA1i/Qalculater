import BarOverview from "./BarOverview/BarOverview";
import {
  Book,
  GraphDownArrow,
  GraphUpArrow,
  CheckCircle,
  XCircle,
  Check2Circle,
} from "react-bootstrap-icons";
import { CurrSelection } from "../../TS types/Types";

import { useSelector } from "react-redux";
import { getSelData } from "../../redux/currentSelections/selectors";
import { getFilteredData } from "../../redux/grades/selectors";
import { keys } from "lodash";
import { StyledVBox, TextBox } from "../EditScreen/styles";
import { Box } from "../../styles/Box";
import { useContext } from "react";
import { ThemeContext } from "styled-components";
import { StyledSlider } from "../../styles/Styles";
import TermPill from "./TermPill";

function HomeScreen() {
  const theme = useContext(ThemeContext);
  const { currTerm = "", currCourse } = useSelector(
    getSelData
  ) as CurrSelection;
  const { terms, courses, assessments } = useSelector(getFilteredData);

  const { average = 0 } = terms[currTerm] || {};

  const completedCourses = () => {
    let result = 0;
    keys(courses).forEach((name) =>
      courses[name].completion >= 100 ? ++result : 0
    );
    return result;
  };

  const aboveAverage = () => {
    let result = 0;
    keys(assessments).forEach((name) => {
      const percentage = assessments[name].myScorePercentage;
      percentage > average && result++;
    });
    return result;
  };

  const failedAssessments = () => {
    let result = 0;
    keys(assessments).forEach((name) => {
      const percentage = assessments[name].myScorePercentage;
      percentage < 50 && result++;
    });
    return result;
  };

  return (
    <StyledVBox marginBottom="2rem">
      <StyledVBox>
        <TextBox>
          Key Term Statistics:&nbsp;
          <Box color={theme.textAccent}>{currTerm}</Box>
        </TextBox>
        <StyledSlider>
          <TermPill
            icon={<Book size={30} />}
            label={`${currTerm} Average`}
            value={`${average || "--"} %`}
          />
          <TermPill
            icon={<CheckCircle size={30} />}
            label={`${currTerm || ""} Courses Completed`}
            value={`${completedCourses()}`}
          />
          <TermPill
            icon={<GraphUpArrow size={30} />}
            label="Highest Term"
            value={""}
          />
          <TermPill
            icon={<GraphDownArrow size={30} />}
            label="Lowest Term"
            value={""}
          />
        </StyledSlider>
      </StyledVBox>
      <BarOverview />
      <StyledVBox>
        <TextBox>
          Key Course Statistics:&nbsp;
          <Box color={theme.textAccent}>{currCourse}</Box>
        </TextBox>
        <StyledSlider>
          <TermPill
            icon={<Check2Circle size={30} color="green" />}
            label="Above Average Assessments"
            value={`
            ${aboveAverage()} / ${keys(assessments).length}
            `}
          />
          <TermPill
            icon={<XCircle size={30} color="red" />}
            label="Failed Assessments"
            value={`
            ${failedAssessments()} / ${keys(assessments).length}
            `}
          />
        </StyledSlider>
      </StyledVBox>
    </StyledVBox>
  );
}

export default HomeScreen;
