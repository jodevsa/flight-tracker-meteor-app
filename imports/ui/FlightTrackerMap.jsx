import React from 'react';
import Map from 'react-map-gl';
import { PlanesCollection } from '../api/planes.js';
import { useFind, useSubscribe } from 'meteor/react-meteor-data';
import { AirplanePin } from './AirplanePin.jsx';
import { ConfigurationCollection } from '../api/configuration.js';


export function FlightTrackerMap() {
    const [viewState, setViewState] = React.useState({
        longitude: -100,
        latitude: 40,
        zoom: 3.5
    });

    const isLoadingConfiguration = useSubscribe('configuration')
    const isLoadingPlanes = useSubscribe('planes');
    // get the data
    const planes = useFind(() => PlanesCollection.find());
    const configuration = useFind(() => ConfigurationCollection.findOne());
    console.log(configuration)
    if (isLoadingConfiguration() || isLoadingPlanes()) {
        return <div>Loading...</div>;
    }

    const selected = planes.filter(e => e.selected == true)

    let obj = viewState
    if (selected.length != 0) {
        obj.longitude = selected[0].location.long
        obj.latitude = selected[0].location.lat
    }


    const markers = []

    for (const plane of planes) {
        markers.push(<AirplanePin selected={plane.selected} key={plane._id} _id={plane._id} longitude={plane.location.long} latitude={plane.location.lat} name={plane.plane} />)
    }


    return (<div className={"map-wrapper"}>
        <Map
            mapboxAccessToken={mapboxAccessToken}
            {...obj}
            onMove={e => setViewState(e.viewState)}
            mapStyle="mapbox://styles/mapbox/streets-v9"
        >
            {markers}
        </Map>
    </div>)

}