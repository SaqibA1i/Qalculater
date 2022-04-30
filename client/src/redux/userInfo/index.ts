import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../TS types/Types";
import { UserInfo } from "./types";

export const userInfo = createSlice({
    name: "USER_INFO",
    initialState: {
        firstName: undefined,
        lastName: undefined,
        imgURL: undefined,
        isAuthenticated: false
    } as UserInfo,
    reducers: {
        update: (state, action: PayloadAction<User>) => {
            const { payload: { firstName, lastName, imgURL } } = action;
            Object.assign(state, { firstName, lastName, imgURL });
        },
        authenticate: (state, action: PayloadAction<boolean>) => {
            state.isAuthenticated = action.payload;
        }
    },
});

export const USER_ACTIONS = userInfo.actions;
