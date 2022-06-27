import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../..";
import { Marker } from "../../../interfaces/Marker.interface";

export interface MarkersState {
    markersList: Marker[]
};

const initialState: MarkersState = {
    markersList: [],
};

const markersSlice = createSlice({
    name: 'markers',
    initialState,
    reducers: {
        addMarker(state, action: PayloadAction<Marker>) {
            state.markersList.push(action.payload);
        },
        updateMarker(state, { payload: { markerId, description, name } }: PayloadAction<Marker>) {
            const marker = state.markersList.find(({ markerId: id }) => id === markerId);
            if (marker) {
                marker.description = description;
                marker.name = name;
            } 
        },
        removeMarker(state, { payload: markerId }: PayloadAction<string>) {
            const index = state.markersList.findIndex(({ markerId: id }) => id === markerId);
            if (index) {
                state.markersList.splice(index, 1);
            }
        }
    },
});

export const markersListSelector = (state: RootState) => state.markers.markersList;

export const {
    addMarker,
    updateMarker,
    removeMarker,
} = markersSlice.actions;

export default markersSlice;
