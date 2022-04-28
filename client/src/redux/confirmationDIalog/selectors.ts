import { AppState } from "../reduxStore";

export const getConfirmationSelector = (state: AppState) => {
    return state.confirmation;
}
