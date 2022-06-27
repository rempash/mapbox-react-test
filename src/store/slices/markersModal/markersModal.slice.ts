import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../..";

import { Marker } from "../../../interfaces/Marker.interface";

export enum MarkersModalMode {
    CREATE = 'create',
    UPDATE = 'update'
};

export interface MarkersModalState {
    isOpen: boolean,
    marker: Marker,
    mode: MarkersModalMode,
};

export const emptyMarker: Marker = {
    markerId: '',
    name: '',
    description: ''
};

const initialState: MarkersModalState = {
    isOpen: false,
    marker: emptyMarker,
    mode: MarkersModalMode.CREATE,
};

export const markersModalSlice = createSlice({
    name: 'markersModal',
    initialState,
    reducers: {
        toggleMarkersModal(
            state,
            { payload: { marker, mode = MarkersModalMode.CREATE }
        }: PayloadAction<{ marker: Marker, mode?: MarkersModalMode }>) {
            return {
                isOpen: !state.isOpen,
                marker,
                mode,
            };
        },
    },
});

export const { toggleMarkersModal } = markersModalSlice.actions;

export const markersModalSelector = (state: RootState): MarkersModalState => state.markersModal;

export default markersModalSlice;
