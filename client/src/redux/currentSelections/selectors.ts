import { AppState } from "../reduxStore";

export const getSelData = (state: AppState) => {
    return state.currSel;
}
