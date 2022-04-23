import { AppState } from "../reduxStore";

export const getUserInfo = (state: AppState) => {
    return state.userInfo;
}
