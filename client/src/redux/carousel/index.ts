import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LOCAL_STORAGE } from "../../utils/constants";
import { Carousel, THEME } from "./types";

export const carousel = createSlice({
    name: "CAROUSEL",
    initialState: {
        slide: 1,
        darkMode: false,
        termHidden: false,
        theme: THEME.LIGHT
    } as Carousel,
    reducers: {
        updateSlide: (state, { payload: slide }: PayloadAction<Partial<number>>) => {
            state.slide = slide;
            return state;
        },
        toggleDarkMode: (state, { payload }: PayloadAction<boolean>) => {
            localStorage.setItem(LOCAL_STORAGE.DARK_MODE, (String(Number(payload))))
            state.darkMode = payload;
            state.theme = payload ? THEME.DARK : THEME.LIGHT;
            return state;
        },
        toggleTermHidden: (state, { payload }: PayloadAction<boolean>) => {
            localStorage.setItem(LOCAL_STORAGE.IS_TERM_HIDDEN, (String(Number(payload))))
            state.termHidden = payload;
            return state;
        }
    }
});

export const CAROUSEL_ACTIONS = carousel.actions;
