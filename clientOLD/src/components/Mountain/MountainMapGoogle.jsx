import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
    width: '400px',
    height: '400px'
};

const center = {
    lat: 43.4050,
    lng: -72.7277
};

function MountainMapGoogle() {
    return (
        <LoadScript
            googleMapsApiKey={process.env.REACT_APP_G_MAPS_API_KEY}
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={13}
                options={{
                    maxZoom: 15, // Maximum zoom level
                    restriction: {
                        latLngBounds: {
                            north: center.lat + 0.01,
                            south: center.lat - 0.01,
                            east: center.lng + 0.01,
                            west: center.lng - 0.01,
                        },
                        strictBounds: true,
                    }, // Restrict the viewable area
                    mapTypeId: 'satellite' // Set map type to satellite
                }}
            >
                {/* You can add markers or other components here */}
            </GoogleMap>
        </LoadScript>
    )
}

export default React.memo(MountainMapGoogle);