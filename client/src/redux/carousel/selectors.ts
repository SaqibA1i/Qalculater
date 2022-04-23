import { AppState } from "../reduxStore";

export const getSlide = (state: AppState) => {
    return state.carousel;
}
