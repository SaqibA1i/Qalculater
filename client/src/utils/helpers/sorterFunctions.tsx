import { AssessmentData, SORT_MODES } from "../../TS types/Types";
export const sortAssessments = (
  sortMode: SORT_MODES,
  assessments: AssessmentData[]
) => {
  switch (sortMode) {
    case SORT_MODES.ALPHABET:
      assessments.sort((a1: AssessmentData, a2: AssessmentData): number => {
        if (a1[0] > a2[0]) {
          return -1;
        }
        return 1;
      });
      break;
    case SORT_MODES.ALPHABET_ALT:
      assessments.sort((a1: AssessmentData, a2: AssessmentData): number => {
        if (a1[0] < a2[0]) {
          return -1;
        }
        return 1;
      });
      break;
    case SORT_MODES.GRADE:
      assessments.sort((a1: AssessmentData, a2: AssessmentData): number => {
        if (a1[1] < a2[1]) {
          return -1;
        }
        return 1;
      });
      break;
    case SORT_MODES.GRADE_ALT:
      assessments.sort((a1: AssessmentData, a2: AssessmentData): number => {
        if (a1[1] > a2[1]) {
          return -1;
        }
        return 1;
      });
      break;
  }
};
