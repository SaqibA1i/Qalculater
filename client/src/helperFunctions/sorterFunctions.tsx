import { AssessmentData, SortModes } from "../TS types/Types";
export const sortAssessments = (
  sortMode: SortModes,
  assessments: AssessmentData[]
) => {
  if (sortMode === "alpha") {
    console.log("alpha");
    assessments.sort((a1: AssessmentData, a2: AssessmentData): number => {
      if (a1[0] > a2[0]) {
        return -1;
      }
      return 1;
    });
  } else if (sortMode === "alpha-alt") {
    console.log("alpha-alt");
    assessments.sort((a1: AssessmentData, a2: AssessmentData): number => {
      if (a1[0] < a2[0]) {
        return -1;
      }
      return 1;
    });
  } else if (sortMode === "grades") {
    console.log("grades");
    assessments.sort((a1: AssessmentData, a2: AssessmentData): number => {
      if (a1[1] < a2[1]) {
        return -1;
      }
      return 1;
    });
  } else if (sortMode === "grades-alt") {
    console.log("grades-alt");
    assessments.sort((a1: AssessmentData, a2: AssessmentData): number => {
      if (a1[1] > a2[1]) {
        return -1;
      }
      return 1;
    });
  }
};
