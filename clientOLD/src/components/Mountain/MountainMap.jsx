import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card, CardContent, Button, FormControlLabel, Checkbox } from '@mui/material';

const okemoCoordinates = [-72.728, 43.41];

const okemoBounds = [
	[-72.80, 43.38], // Southwest coordinates
	[-72.68, 43.45]  // Northeast coordinates
  ];

const MountainMapBox = () => {
	const mapContainerRef = useRef(null);
	const [map, setMap] = useState(null);
	const [draw, setDraw] = useState(null);
	const [zoomLock, setZoomLock] = useState(false);
	const [layersVisibility, setLayersVisibility] = useState({
		huts: true,
		lodges: true,
		trails: true,
		lifts: true,
	});

	useEffect(() => {
		mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

		const mapInstance = new mapboxgl.Map({
			container: mapContainerRef.current,
			style: 'mapbox://styles/mapbox/satellite-v9',
			center: okemoCoordinates,
			zoom: 13.75,
			bearing: -65,
			minZoom: 13,
			maxBounds: okemoBounds
		});

		const drawInstance = new MapboxDraw({
			displayControlsDefault: false,
			controls: {
				point: true,
				trash: true,
			},
		});

		mapInstance.on('load', () => {
			setMap(mapInstance);
			mapInstance.addControl(drawInstance);
			mapInstance.addControl(new mapboxgl.NavigationControl());
			setDraw(drawInstance);

			// Add 3D terrain
			mapInstance.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 15 });

			// Add sky layer
			mapInstance.addLayer({
				'id': 'sky',
				'type': 'sky',
				'paint': {
					'sky-type': 'atmosphere',
					'sky-atmosphere-sun': [0.0, 0.0],
					'sky-atmosphere-sun-intensity': 15
				}
			});
		});

		mapInstance.on('draw.create', updateHuts);
		mapInstance.on('draw.update', updateHuts);
		mapInstance.on('draw.delete', updateHuts);

		function updateHuts(e) {
			const data = drawInstance.getAll();
			// Here, you can update your huts state or send the data to your server
		}

		// cleanup function to remove map on unmount
		return () => mapInstance.remove();
	}, []);

	const handleLayerVisibilityChange = (event) => {
		setLayersVisibility({ ...layersVisibility, [event.target.name]: event.target.checked });

		if (map.getLayer(event.target.name)) {
			map.setLayoutProperty(event.target.name, 'visibility', event.target.checked ? 'visible' : 'none');
		}
	};

	const enableDraw = () => {
		draw.changeMode('draw_point');
	};

	return (
		<div>
			<div ref={mapContainerRef} style={{ width: '100%', height: '80vh' }} />
			<Card sx={{ position: 'absolute', bottom: '15px', left: '180px', zIndex: 1 }}>
				<CardContent>
					<Button variant="contained" onClick={() => setZoomLock(!zoomLock)}>
						{zoomLock ? 'Unlock Zoom' : 'Lock Zoom'}
					</Button>
					<Button variant="contained" onClick={enableDraw}>
						Add Hut
					</Button>
					<FormControlLabel
						control={
							<Checkbox
								checked={layersVisibility.huts}
								onChange={handleLayerVisibilityChange}
								name="huts"
							/>
						}
						label="Huts"
					/>
					<FormControlLabel
						control={
							<Checkbox
								checked={layersVisibility.lodges}
								onChange={handleLayerVisibilityChange}
								name="lodges"
							/>
						}
						label="Lodges"
					/>
					<FormControlLabel
						control={
							<Checkbox
								checked={layersVisibility.trails}
								onChange={handleLayerVisibilityChange}
								name="trails"
							/>
						}
						label="Trails"
					/>
					<FormControlLabel
						control={
							<Checkbox
								checked={layersVisibility.lifts}
								onChange={handleLayerVisibilityChange}
								name="lifts"
							/>
						}
						label="Lifts"
					/>
				</CardContent>
			</Card>
		</div>
	);
};

export default MountainMapBox;