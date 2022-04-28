import axios from "axios";
import { cloneDeep } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { AssessmentFormSchema } from "../components/Forms/Assessments/type";
import { CourseFormSchema } from "../components/Forms/Courses/types";
import { CONFIRMATION_ACTION } from "../redux/confirmationDIalog";
import { CURR_SELECTION_ACTIONS } from "../redux/currentSelections";
import { getSelData } from "../redux/currentSelections/selectors";
import { GRADE_FILTERED_ACTIONS } from "../redux/grades";
import { convertFilteredToApi } from "../redux/grades/helpers";
import { getFilteredData } from "../redux/grades/selectors";
import { LOADING_ACTIONS } from "../redux/loading";
import { POPUP_ACTIONS } from "../redux/popup";
import { Assessment, Terms } from "../TS types";
import { TOKEN } from "../utils/constants";
import useNotification, { NOTICATION } from "./useNotification";
import useUpdateSelection from "./useUpdateSelection";

type Props = {
  addTerm: (term: string) => void;
  editTerm: (oldName: string, newTerm: string) => void;
  addCourse: (course: CourseFormSchema) => void;
  editCourse: (oldCourse: string, newCourse: CourseFormSchema) => void;
  addAssessment: (assessment: AssessmentFormSchema) => void;
  editAssessments: (
    oldAssessment: string,
    newAssessment: AssessmentFormSchema
  ) => void;
  deleteTerm: () => void;
  deleteCourse: () => void;
  deleteAssessment: () => void;
};

const useApi = (): Props => {
  const dispatch = useDispatch();
  const { unfilteredData } = useSelector(getFilteredData);
  const {
    currTerm = "",
    currCourse = "",
    currAssessment = "",
  } = useSelector(getSelData);
  const { notify } = useNotification();

  const push = async (updatedUserData: Terms) => {
    // convert to api acceptable format
    const uploadData = convertFilteredToApi(updatedUserData);
    dispatch(LOADING_ACTIONS.update(true));
    dispatch(POPUP_ACTIONS.close());
    try {
      const result = await axios({
        url: process.env.REACT_APP_SERVER_PROXY + "term/update",
        method: "POST",
        data: {
          data: uploadData,
          id_token: sessionStorage.getItem(TOKEN.JWT_TOKEN),
          access_token: sessionStorage.getItem(TOKEN.ACCESS_TOKEN),
        },
      });
      const {
        msg,
        data: { data },
      } = result.data;
      notify({
        title: "Success",
        message: msg,
        type: NOTICATION.SUCCESS,
      });
      dispatch(GRADE_FILTERED_ACTIONS.update(data));
      dispatch(LOADING_ACTIONS.update(false));
    } catch (error) {
      console.error(error);
      notify({
        title: "Error updating",
        message: ` `,
        type: NOTICATION.DANGER,
      });
      dispatch(LOADING_ACTIONS.update(false));
    }
  };

  const addTerm = (term: string) => {
    const data = cloneDeep(unfilteredData);
    data[term] = {};
    push(data).then(() => {
      dispatch(
        CURR_SELECTION_ACTIONS.update({ currTerm: term, currCourse: undefined })
      );
    });
  };

  const editTerm = (oldName: string, newName: string) => {
    const data = cloneDeep(unfilteredData);
    data[newName] = data[oldName];
    delete data[oldName];
    push(data).then(() => {
      dispatch(CURR_SELECTION_ACTIONS.updateTerm(newName));
      dispatch(GRADE_FILTERED_ACTIONS.updateCourses(newName));
    });
  };

  const deleteTerm = () => {
    const data = cloneDeep(unfilteredData);
    delete data[currTerm];
    dispatch(CONFIRMATION_ACTION.open());
    dispatch(
      CONFIRMATION_ACTION.handleSubmit(() =>
        push(data).then(() => {
          dispatch(
            CURR_SELECTION_ACTIONS.update({
              currCourse: undefined,
              currTerm: undefined,
            })
          );
        })
      )
    );
  };

  const addCourse = ({ name, credit }: CourseFormSchema) => {
    const data = cloneDeep(unfilteredData);
    data[currTerm][name] = { credit, assessments: {} };

    push(data).then(() => {
      dispatch(GRADE_FILTERED_ACTIONS.updateCourses(currTerm));
      dispatch(CURR_SELECTION_ACTIONS.updateCourse(name));
      dispatch(
        GRADE_FILTERED_ACTIONS.updateAssessments({
          currCourse: name,
          currTerm,
        })
      );
    });
  };

  const editCourse = (oldCourse: string, newCourse: CourseFormSchema) => {
    const data = cloneDeep(unfilteredData);
    if (newCourse.name === oldCourse) {
      data[currTerm][oldCourse].credit = newCourse.credit;
    } else {
      data[currTerm][newCourse.name] = data[currTerm][oldCourse];
      delete data[currTerm][oldCourse];
    }

    push(data).then(() => {
      dispatch(GRADE_FILTERED_ACTIONS.updateCourses(currTerm));
      dispatch(CURR_SELECTION_ACTIONS.updateCourse(newCourse.name));
      dispatch(
        GRADE_FILTERED_ACTIONS.updateAssessments({
          currCourse: newCourse.name,
          currTerm,
        })
      );
    });
  };

  const deleteCourse = () => {
    const data = cloneDeep(unfilteredData);
    delete data[currTerm][currCourse];
    push(data).then(() => {
      dispatch(
        CURR_SELECTION_ACTIONS.update({ currTerm, currCourse: undefined })
      );
      dispatch(GRADE_FILTERED_ACTIONS.updateCourses(currTerm));
    });
  };

  const addAssessment = ({
    name,
    myPercentageScore,
    worth,
  }: AssessmentFormSchema) => {
    const data = cloneDeep(unfilteredData);
    data[currTerm][currCourse].assessments[name] = { myPercentageScore, worth };
    push(data).then(() => {
      dispatch(GRADE_FILTERED_ACTIONS.updateCourses(currTerm));
      dispatch(CURR_SELECTION_ACTIONS.updateCourse(currCourse));
      dispatch(
        GRADE_FILTERED_ACTIONS.updateAssessments({ currTerm, currCourse })
      );
    });
  };

  const editAssessments = (
    oldAssessment: string,
    newAssessment: AssessmentFormSchema
  ) => {
    const data = cloneDeep(unfilteredData);
    if (newAssessment.name === oldAssessment) {
      data[currTerm][currCourse].assessments[oldAssessment] =
        newAssessment as Assessment;
    } else {
      data[currTerm][currCourse].assessments[newAssessment.name] =
        data[currTerm][currCourse].assessments[oldAssessment];
      delete data[currTerm][currCourse].assessments[oldAssessment];
    }
    push(data).then(() => {
      dispatch(GRADE_FILTERED_ACTIONS.updateCourses(currTerm));
      dispatch(CURR_SELECTION_ACTIONS.updateCourse(currCourse));
      dispatch(
        GRADE_FILTERED_ACTIONS.updateAssessments({ currTerm, currCourse })
      );
    });
  };

  const deleteAssessment = () => {
    const data = cloneDeep(unfilteredData);
    delete data[currTerm][currCourse].assessments[currAssessment!];
    push(data).then(() => {
      dispatch(GRADE_FILTERED_ACTIONS.updateCourses(currTerm));
      dispatch(CURR_SELECTION_ACTIONS.updateCourse(currCourse));
      dispatch(
        GRADE_FILTERED_ACTIONS.updateAssessments({ currTerm, currCourse })
      );
    });
  };

  return {
    addTerm,
    editTerm,
    deleteTerm,
    addCourse,
    editCourse,
    deleteCourse,
    addAssessment,
    editAssessments,
    deleteAssessment,
  };
};

export default useApi;
