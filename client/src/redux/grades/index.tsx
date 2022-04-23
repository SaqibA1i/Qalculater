import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { get, keys } from "lodash";
import { Assessment, CourseData, TermData } from "../../TS types";
import { AcademicData, CurrSelection } from "../../TS types/Types";
import {
  convertAcademicData,
  getFilteredCourseData,
  getFilteredTermData,
} from "./helpers";
import { AssessmentFiltered, CourseFiltered, GradeFiltered } from "./types";

export const gradeDataFiltered = createSlice({
  name: "GRADES",
  initialState: {
    terms: {},
    courses: {},
    assessments: {},
    unfilteredData: {},
  } as GradeFiltered,
  reducers: {
    update: (state, { payload: academicData }: PayloadAction<AcademicData>) => {
      const data: GradeFiltered = {
        terms: {},
        courses: {},
        assessments: {},
        unfilteredData: convertAcademicData(academicData),
      };
      keys(data.unfilteredData).forEach((termName: string) => {
        data.terms[termName] = getFilteredTermData(
          data.unfilteredData[termName]
        );
      });

      Object.assign(state, data);
    },
    updateCourses: (
      state,
      { payload: termName }: PayloadAction<string | undefined>
    ) => {
      if (termName !== undefined) {
        const term: TermData = get(state.unfilteredData, termName);
        const courses: CourseFiltered = {};
        keys(term).forEach((courseName: string) => {
          const courseData = term[courseName];
          courses[courseName] = getFilteredCourseData(courseData);
        });
        state.courses = courses;
      }
      return state;
    },
    updateAssessments: (
      state,
      { payload: { currCourse, currTerm } }: PayloadAction<CurrSelection>
    ) => {
      if (currCourse !== undefined && currTerm !== undefined) {
        const { assessments }: CourseData =
          state.unfilteredData[currTerm][currCourse];

        const dataFiltered: AssessmentFiltered = {};
        keys(assessments).forEach((name: string) => {
          const { myPercentageScore, worth } = assessments[name];
          dataFiltered[name] = {
            myScorePercentage: myPercentageScore,
            worth: worth,
          };
        });
        state.assessments = dataFiltered;
      }

      return state;
    },
  },
});

export const GRADE_FILTERED_ACTIONS = gradeDataFiltered.actions;
