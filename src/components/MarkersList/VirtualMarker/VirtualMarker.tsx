import React, { useContext, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";

import { MarkerStoreContext } from "../../../features/MarkersStore";
import { Marker } from "../../../interfaces/Marker.interface";
import { MarkersModalMode, toggleMarkersModal } from "../../../store/slices/markersModal/markersModal.slice";

export interface VirtualMarkerProps {
    marker: Marker,
    event?: keyof GlobalEventHandlersEventMap,
};

export const VirtualMarker: React.FC<VirtualMarkerProps> = ({
    event = 'click',
    marker,
}) => {

    const {
        markerId
    } = marker;

    const MarkersStore = useContext(MarkerStoreContext);
    const dispatch = useDispatch();

    const markerElement = useMemo(
        () => {
            return MarkersStore
                .getMarker(markerId)
                .getElement();
        },
        [markerId, MarkersStore]
    );

    useEffect(
        () => {
            const onClickListener = () => dispatch(toggleMarkersModal({ marker, mode: MarkersModalMode.UPDATE }));

            markerElement.addEventListener(event, onClickListener);

            return () => {
                markerElement.removeEventListener(event, onClickListener);
            }
        },
        [markerElement, dispatch, marker, event]
    );

    return (<></>);

};
