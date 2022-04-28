import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { noop } from "lodash";
import { Confirmation } from "./types";

export const confirmation = createSlice({
    name: "CONFIRMATION_DIALOG",
    initialState: { isOpen: false, onSubmit: noop } as Confirmation,
    reducers: {
        open: (state) => {
            state.isOpen = true;
            return state;
        },
        close: (state) => {
            state.isOpen = false;
            return state;
        },
        handleSubmit: (state, { payload }: PayloadAction<() => void | Promise<void>>) => {
            state.onSubmit = payload;
            return state;
        }
    },
});

export const CONFIRMATION_ACTION = confirmation.actions;
