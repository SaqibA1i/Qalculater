import { AppState } from "../reduxStore";

export const getPopupSelector = (state: AppState) => {
    return state.popup;
}
