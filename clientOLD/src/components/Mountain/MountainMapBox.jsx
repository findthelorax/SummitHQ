import { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import { AddLiftForm } from '../Lifts/LiftsForm';

const okemoCoordinates = [-72.7170, 43.4018];

function MountainMapBox() {
    const [map, setMap] = useState(null);
    const [draw, setDraw] = useState(null);
    // eslint-disable-next-line
    const [selectedOption, setSelectedOption] = useState(null);
    const [clickedCoordinates, setClickedCoordinates] = useState(null);

    useEffect(() => {
        mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

        const mapInstance = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: okemoCoordinates,
            zoom: 13,
            pitch: 60, // tilt angle
            bearing: -60, // rotation angle
        });

        const drawInstance = new MapboxDraw({
            displayControlsDefault: false,
            controls: {
                line_string: true,
                trash: true
            }
        });
        mapInstance.addControl(drawInstance);

        mapInstance.on('load', () => {
            setMap(mapInstance);
            setDraw(drawInstance);
        });

        return () => mapInstance.remove();
    }, []);

    useEffect(() => {
        if (!map || !draw) return; // wait for map and draw to initialize

        // handle map click
        map.on('click', (e) => {
            if (selectedOption === 'lift' || selectedOption === 'trail') {
                setClickedCoordinates([e.lngLat.lng, e.lngLat.lat]);
                draw.changeMode('draw_line_string');
            }
            // handle other options...
        });

        // handle draw.create event
        map.on('draw.create', (e) => {
            // eslint-disable-next-line
            const coordinates = e.features[0].geometry.coordinates;
            // create new lift or trail with these coordinates and send to your server...
        });
    }, [map, draw, selectedOption]);

    return (
        <div>
            <div id="map" style={{ width: '100%', height: '100vh' }} />
            {clickedCoordinates && selectedOption === 'lift' && <AddLiftForm coordinates={clickedCoordinates} />}
            {/* render other forms conditionally... */}
        </div>
    );
}

export default MountainMapBox;