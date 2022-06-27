import { useSelector } from "react-redux"
import { markersListSelector } from "../../store/slices/markers/markers.slice"
import { VirtualMarker } from "./VirtualMarker/VirtualMarker";

/*
    Component that carries of markers list
    It's more like a virtual list due markers are rendered by mapbox
    useful to handle evens and extend the markers behaviour
*/
export const MarkersList = () => {

    const markersList = useSelector(markersListSelector);

    return (
        <>
            {markersList.map((marker) => (
                <VirtualMarker
                    key={marker.markerId}
                    marker={marker}
                />
            ))}
        </>
    );
};
