import { ACTION_TYPE, DATA_TYPE } from "../../utils/constants";

export const DARK_MODE = 'darkMode';

export enum CAROUSEL_SLIDE {
    HOME = 0,
    EDIT = 1,
    ACCOUNT = 2,
}
export type Carousel = {
    slide: CAROUSEL_SLIDE;
    darkMode: boolean;
    termHidden: boolean;

}
