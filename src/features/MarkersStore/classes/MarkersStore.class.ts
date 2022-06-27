import mapboxgl from "mapbox-gl";
import { nanoid } from 'nanoid'

export type MarkerLinksMap = {
    [key: string]: mapboxgl.Marker,
};

class MarkersStore {

    private markersLinks: MarkerLinksMap = {};

    public addMarkerLink(marker: mapboxgl.Marker): string {
        const id = nanoid();
        this.markersLinks[id] = marker;
        return id;
    }

    public removeMarkerLink(id: string): void {
        delete this.markersLinks[id];
    }

    public getMarker(id: string): mapboxgl.Marker {
        return this.markersLinks[id] || null;
    }

}

export default new MarkersStore();
