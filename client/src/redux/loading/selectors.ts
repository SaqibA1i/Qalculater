import { AppState } from "../reduxStore";

export const getLoadingSelector = (state: AppState) => {
    return state.loading;
}
