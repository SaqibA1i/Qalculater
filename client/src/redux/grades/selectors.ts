import { AppState } from "../reduxStore";

export const getFilteredData = (state: AppState) => {
    return state.gradeDataFiltered;
}
