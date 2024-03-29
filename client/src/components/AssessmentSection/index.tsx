import { keys } from "lodash";
import { useContext, useState } from "react";
import {
  PenFill,
  Plus,
  SortAlphaDown,
  SortAlphaDownAlt,
  SortNumericDown,
  SortNumericDownAlt,
} from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { CURR_SELECTION_ACTIONS } from "../../redux/currentSelections";
import { getSelData } from "../../redux/currentSelections/selectors";
import { getFilteredData } from "../../redux/grades/selectors";
import { POPUP_ACTIONS } from "../../redux/popup";
import { SORT_MODES } from "../../TS types/Types";
import { ACTION_TYPE, DATA_TYPE } from "../../utils/constants";
import { getColor } from "../../utils/helpers/colors";
import CompletionBar from "../../pages/EditScreen/CompletionBar";
import { getSlide } from "../../redux/carousel/selectors";
import { AddButton } from "../../styles/Styles";
import { Box } from "../../styles/Box";
import { VBox } from "../../styles/VBox";
import styled, { ThemeContext } from "styled-components";
import { HBox } from "../../styles/HBox";
import { BackWrapper, StyledVBox } from "../PillRow/Pill/styles";
import { CAROUSEL_SLIDE } from "../../redux/carousel/types";

export const StyledHBox = styled(HBox)`
  padding: 10px 30px;
  width: max-content;
  align-items: flex-start;
  width: -webkit-fill-available;
  justify-content: space-between;
  align-items: "center";
  border-radius: 45px;
  ${({ theme }) => `
        background: ${theme.accent};
    `};
`;

const StyledBackWrapper = styled(BackWrapper)`
  border-radius: 45px;
`;

const AssessmentSection = () => {
  const { currCourse } = useSelector(getSelData);
  const dispatch = useDispatch();
  const theme = useContext(ThemeContext);
  const { assessments, courses } = useSelector(getFilteredData);
  const { termHidden, slide } = useSelector(getSlide);

  if (currCourse === undefined) {
    return <></>;
  }

  const isPageSelected = slide === CAROUSEL_SLIDE.EDIT ? 1 : 0;

  const { completion: courseCompletion = 0, average: courseAverage = 0 } =
    courses[currCourse] || {};

  return (
    <VBox
      overflowY="scroll"
      style={{
        alignItems: "stretch",
        justifyContent: "start",
        gap: "0.6rem",
      }}
      padding="10px 25px"
      maxHeight={termHidden ? "calc(100vh - 340px)" : "calc(100vh - 423px)"}
      minWidth="-webkit-fill-available"
    >
      <VBox marginBottom="10px">
        <Box marginBottom="10px">Completed: {courseCompletion} %</Box>
        <CompletionBar
          completion={courseCompletion}
          color={getColor(courseAverage / 100)}
        />
      </VBox>

      {keys(assessments).map((assessmentName, idx: number) => {
        const { worth, myScorePercentage } = assessments[assessmentName];
        return (
          <StyledBackWrapper
            key={idx}
            style={{
              opacity: isPageSelected,
              transitionDelay: `${idx + 3}00ms`,
              marginLeft: isPageSelected ? `0` : `200px`,
            }}
          >
            <StyledHBox>
              <StyledVBox style={{ padding: 0, gap: 0 }}>
                <Box
                  fontSize="0.9rem"
                  fontWeight="700"
                  color={theme.textAccent}
                >
                  {assessmentName}
                </Box>
                <Box fontSize="0.7rem" fontWeight="bolder">
                  worth {worth}%
                </Box>
              </StyledVBox>
              <Box fontWeight="bold" fontSize="1.2rem" color={theme.textAccent}>
                {myScorePercentage}%
              </Box>
            </StyledHBox>
            <Box
              padding="10px 0"
              onClick={() => {
                dispatch(
                  CURR_SELECTION_ACTIONS.updateAssessment(assessmentName)
                );
                dispatch(
                  POPUP_ACTIONS.open({
                    actionType: ACTION_TYPE.EDIT,
                    dataType: DATA_TYPE.ASSESSMENT,
                  })
                );
              }}
            >
              <Box paddingRight="20px" color={theme.main}>
                <PenFill size={20} />
              </Box>
            </Box>
          </StyledBackWrapper>
        );
      })}
      <AddButton
        borderRadius="45px"
        onClick={() => {
          dispatch(
            POPUP_ACTIONS.open({
              actionType: ACTION_TYPE.CREATE,
              dataType: DATA_TYPE.ASSESSMENT,
            })
          );
        }}
      />
    </VBox>
  );
};

export default AssessmentSection;
