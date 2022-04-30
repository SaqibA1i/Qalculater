import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PopupContext } from "./types";

export const popup = createSlice({
    name: "LOADING",
    initialState: {
        isOpen: false,
        dataType: "Term",
        actionType: "Create",
    } as PopupContext,
    reducers: {
        open: (state, { payload }: PayloadAction<PopupContext>) => {
            state.isOpen = true;
            Object.assign(state, payload);
            return state;
        },
        close: (state) => {
            state.isOpen = false;
            return state;
        },
    },
});

export const POPUP_ACTIONS = popup.actions;
