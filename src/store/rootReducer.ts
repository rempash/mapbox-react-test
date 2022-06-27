
import { combineReducers } from "@reduxjs/toolkit";
import enableZoomSlice from "./slices/enableZoom/enableZoom.slice";
import markersSlice from "./slices/markers/markers.slice";
import markersModalSlice from "./slices/markersModal/markersModal.slice";

export default combineReducers({
    enableZoom: enableZoomSlice.reducer,
    markers: markersSlice.reducer,
    markersModal: markersModalSlice.reducer,
});
