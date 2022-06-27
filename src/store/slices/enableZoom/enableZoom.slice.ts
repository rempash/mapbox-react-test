import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../..";

export interface enableZoomState {
    enabled: boolean,
}

const initialState: enableZoomState = {
    enabled: false,
};

const enableZoomSlice = createSlice({
    name: 'enableZoom',
    initialState,
    reducers: {
        toggleEnableZoom(state, action: PayloadAction<boolean>) {
            state.enabled = action.payload;
        },
    },
});

export const enabledZoomSelector = (state: RootState): boolean => state.enableZoom.enabled;

export const { toggleEnableZoom } = enableZoomSlice.actions;

export default enableZoomSlice;
