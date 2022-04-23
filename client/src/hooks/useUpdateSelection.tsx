import { isUndefined } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { CURR_SELECTION_ACTIONS } from "../redux/currentSelections";
import { getSelData } from "../redux/currentSelections/selectors";
import { GRADE_FILTERED_ACTIONS } from "../redux/grades";
import { AcademicData, CurrSelection } from "../TS types/Types";

const useUpdateSelection = () => {
  const dispatch = useDispatch();
  const { currTerm, currCourse } = useSelector(getSelData);
  const updateSelected = ({ currCourse, currTerm }: CurrSelection) => {
    dispatch(CURR_SELECTION_ACTIONS.update({ currCourse, currTerm }));
    dispatch(GRADE_FILTERED_ACTIONS.updateCourses(currTerm));
    if (!isUndefined(currCourse) && !isUndefined(currTerm)) {
      dispatch(
        GRADE_FILTERED_ACTIONS.updateAssessments({ currCourse, currTerm })
      );
    }
  };

  const reGenerateFields = (data: AcademicData) => {
    dispatch(GRADE_FILTERED_ACTIONS.update(data));
    dispatch(GRADE_FILTERED_ACTIONS.updateCourses(currTerm));
  };

  return { updateSelected, reGenerateFields };
};

export default useUpdateSelection;
