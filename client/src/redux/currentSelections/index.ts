import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CurrSelection } from "../../TS types/Types";
import { LOCAL_STORAGE } from "../../utils/constants";
import { CURRENT_SEL } from "./types";

const getCurrFromLocalStorage = () => {
    const currTerm: string | null = localStorage.getItem(CURRENT_SEL.TERM);
    const currCourse: string | null = localStorage.getItem(CURRENT_SEL.COURSE);
    const tempSel: CurrSelection = {
        currTerm: currTerm !== null ? currTerm : undefined,
        currCourse: currCourse !== null ? currCourse : undefined,
        currAssessment: undefined
    };

    return tempSel;
};

export const currSel = createSlice({
    name: "CURRENT_SELECTIONS",
    initialState: getCurrFromLocalStorage() as CurrSelection,
    reducers: {
        update: (state, { payload: { currTerm, currCourse } }: PayloadAction<CurrSelection>) => {
            localStorage.setItem(CURRENT_SEL.TERM, String(currTerm));
            localStorage.setItem(CURRENT_SEL.COURSE, String(currCourse));
            Object.assign(state, { currTerm, currCourse });
        },
        updateTerm: (state, { payload }: PayloadAction<string>) => {
            localStorage.setItem(CURRENT_SEL.TERM, String(payload));
            state.currTerm = payload;
            return state;
        },
        updateCourse: (state, { payload }: PayloadAction<string>) => {
            localStorage.setItem(CURRENT_SEL.COURSE, String(payload));
            state.currCourse = payload;
            return state;
        },
        updateAssessment: (state, { payload }: PayloadAction<string>) => {
            state.currAssessment = payload;
            return state;
        },
        reset: (state, { payload }: PayloadAction<undefined>) => {
            localStorage.setItem(LOCAL_STORAGE.TERM, "undefined");
            localStorage.setItem(LOCAL_STORAGE.COURSE, "undefined")
            Object.assign(state, { currCourse: undefined, currTerm: undefined });
            return state;
        }

    },
});

export const CURR_SELECTION_ACTIONS = currSel.actions;
