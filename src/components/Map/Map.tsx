import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

import { MapContainer } from './styled/MapContainer.styled';
import { useDispatch, useSelector } from 'react-redux';
import { enabledZoomSelector } from '../../store/slices/enableZoom/enableZoom.slice';
import { listenMapboxEvent } from '../../utils/listenMapboxEvent';
import { toggleMarkersModal } from '../../store/slices/markersModal/markersModal.slice';
import { MarkerStoreContext } from '../../features/MarkersStore';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN as string;

export const Map = () => {

    const zoomEnabled = useSelector(enabledZoomSelector);
    const dispatch = useDispatch();
    const MarkersStore = useContext(MarkerStoreContext);

    const mapContainer = useRef(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const [lng, setLng] = useState(-70.9);
    const [lat, setLat] = useState(42.35);
    const [zoom, setZoom] = useState(9);

    // initialazing map
    useEffect(() => {
        map.current = new mapboxgl.Map({
            container: mapContainer.current || '',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom,
        });
    }, []);

    const dblclickHandler = useCallback(
        // 'any' type is left here intentionally, it's based on mapbox types package 
        (e: any) => {

            const mapInstance = map.current as mapboxgl.Map;
    
            if (!zoomEnabled) {
                e.preventDefault();
                const {
                    lngLat: { lng, lat }
                } = e;
    
                const marker = new mapboxgl.Marker()
                    .setLngLat([lng, lat])
                    .addTo(mapInstance);
                const markerId = MarkersStore.addMarkerLink(marker); 

                dispatch(toggleMarkersModal({
                    marker: {
                        markerId,
                        name: '',
                        description: '',
                    },
                }));
            }
        },
        [zoomEnabled],
    );

    useEffect(
        () => {
            if (map.current) {
                const removeEventListener = listenMapboxEvent(
                    'dblclick',
                    dblclickHandler,
                    map.current,
                );
                return () => {
                    removeEventListener();
                }
            }
        },
        [map.current, dblclickHandler]
    );

    return (
        <MapContainer
          ref={mapContainer}
        />
    );

};
