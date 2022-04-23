import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const loading = createSlice({
    name: "LOADING",
    initialState: true,
    reducers: {
        update: (state, { payload }: PayloadAction<boolean>) => {
            state = payload
            return state;
        },
    },
});

export const LOADING_ACTIONS = loading.actions;
