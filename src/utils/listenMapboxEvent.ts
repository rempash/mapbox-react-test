import { EventedListener } from "mapbox-gl";

export const listenMapboxEvent = (
    event: keyof GlobalEventHandlersEventMap,
    handler: EventedListener,
    mapboxInstance: mapboxgl.Evented
): () => mapboxgl.Evented => {
    mapboxInstance.on(event, handler);
    return () => mapboxInstance.off(event, handler);
};
