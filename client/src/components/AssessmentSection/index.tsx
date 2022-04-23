import { keys } from "lodash";
import { useState } from "react";
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

const AssessmentSection = () => {
  const { currCourse } = useSelector(getSelData);
  const dispatch = useDispatch();
  const [sortAlpha, setSortAlpha] = useState<SORT_MODES>(SORT_MODES.ALPHABET);
  const [sortGrades, setSortGrades] = useState<SORT_MODES>(SORT_MODES.GRADE);
  const { assessments, courses } = useSelector(getFilteredData);
  const { termHidden } = useSelector(getSlide);

  if (currCourse === undefined) {
    return <></>;
  }

  const { completion: courseCompletion = 0, average: courseAverage = 0 } =
    courses[currCourse] || {};

  return (
    <div className="edit-container">
      <h2>
        Assessments: <b>{currCourse}</b>
        <span onClick={() => console.log("Sort helper")}>
          {sortAlpha === SORT_MODES.ALPHABET ? (
            <SortAlphaDownAlt size={21} />
          ) : (
            <SortAlphaDown size={21} />
          )}
        </span>
        <span onClick={() => console.log("Sort helper")}>
          {sortGrades === SORT_MODES.GRADE ? (
            <SortNumericDown size={21} />
          ) : (
            <SortNumericDownAlt size={21} />
          )}
        </span>
      </h2>
      <div
        className={
          termHidden
            ? "edit-slider-vertical edit-slider-vertical-long"
            : "edit-slider-vertical"
        }
        id="assessments"
      >
        <p>
          Completed: <i>{courseCompletion} %</i>
        </p>

        <CompletionBar
          data-aos="fade-right"
          completion={courseCompletion}
          color={getColor(courseAverage / 100)}
        />
        {keys(assessments).map((assessmentName, idx: number) => {
          const { worth, myScorePercentage } = assessments[assessmentName];
          return (
            <div
              key={idx}
              data-aos="slide-up"
              data-aos-delay={idx * 100}
              className="edit-slider-edit-del"
            >
              <div className="edit-slider-term-vertical">
                <div className="bottom">
                  <h5>{assessmentName}</h5>
                  <h6>worth {worth}%</h6>
                </div>
                <p>{myScorePercentage}%</p>
              </div>
              <PenFill
                size={25}
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
              />
            </div>
          );
        })}
        <div
          className="edit-add"
          onClick={() => {
            dispatch(
              POPUP_ACTIONS.open({
                actionType: ACTION_TYPE.CREATE,
                dataType: DATA_TYPE.ASSESSMENT,
              })
            );
          }}
        >
          <Plus size={50} />
        </div>
      </div>
    </div>
  );
};

export default AssessmentSection;
