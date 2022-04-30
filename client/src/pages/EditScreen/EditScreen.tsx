import { useContext } from "react";
import { DashCircle, PlusCircle } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { getSelData } from "../../redux/currentSelections/selectors";
import { getFilteredData } from "../../redux/grades/selectors";
import PillRow from "../../components/PillRow";
import AssessmentSection from "../../components/AssessmentSection";
import { CAROUSEL_ACTIONS } from "../../redux/carousel";
import { getSlide } from "../../redux/carousel/selectors";
import { Box } from "../../styles/Box";
import { StyledVBox, TextBox } from "./styles";
import { ThemeContext } from "styled-components";

function EditScreen() {
  // Fixed variables
  const dispatch = useDispatch();
  const theme = useContext(ThemeContext);
  const { currCourse, currTerm } = useSelector(getSelData);
  const { terms, courses } = useSelector(getFilteredData);
  const { termHidden } = useSelector(getSlide);

  return (
    <StyledVBox>
      <StyledVBox>
        <TextBox>
          Terms&nbsp;
          {termHidden ? (
            <PlusCircle
              size={15}
              onClick={() => {
                dispatch(CAROUSEL_ACTIONS.toggleTermHidden(false));
              }}
            />
          ) : (
            <DashCircle
              size={15}
              onClick={() => {
                dispatch(CAROUSEL_ACTIONS.toggleTermHidden(true));
              }}
            />
          )}
        </TextBox>
        <PillRow data={terms} isTermRow hidden={termHidden} />
      </StyledVBox>

      <StyledVBox>
        <TextBox>
          Courses:&nbsp;<Box color={theme.textAccent}>{currTerm}</Box>
        </TextBox>
        <PillRow data={courses} isTermRow={false} hidden={!!!currTerm} />
      </StyledVBox>

      <StyledVBox>
        <TextBox>
          Assessments:&nbsp;<Box color={theme.textAccent}>{currCourse}</Box>
        </TextBox>
        {currCourse && <AssessmentSection />}
      </StyledVBox>
    </StyledVBox>
  );
}

export default EditScreen;
