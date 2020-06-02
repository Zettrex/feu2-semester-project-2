import React, {useEffect, useState} from 'react';
import {GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow} from 'react-google-maps';

export default function ({data}) {
    const [mapHeight, setMapHeight] = useState(window.innerHeight-80);
    window.onresize = () => setMapHeight(window.innerHeight-80);
    function Map(){
        const [selectedLocation, setSelectedLocation,] = useState(null);
        const [mapCenter, setMapCenter,] = useState({lat: 60.39299, lng: 5.32415}, "Red");
        const [selectedPin, setSelectedPin]= useState('#111111')
        const [infoWindow, setInfoWindow] = useState(null);

        useEffect(() => {
            if (selectedLocation) {
                setInfoWindow(true)
            }
        }, [selectedLocation])

        return (
            <GoogleMap
                defaultZoom={10}
                defaultCenter={mapCenter}
                zoom={10}
                center={mapCenter}

            >
                {data.map((est)=>(
                    <Marker
                        key={est.id}
                        position={{
                            lat: parseFloat(est.googleLat),
                            lng: parseFloat(est.googleLong)
                        }}
                        onClick={() => {
                            setSelectedLocation(est);
                            setMapCenter(est.googleLat, est.googleLong);
                        }}
                    />
                ))}

                {selectedLocation && infoWindow && (
                    <InfoWindow
                        position={{
                            lat: parseFloat(selectedLocation.googleLat) + 0.000018,
                            lng: parseFloat(selectedLocation.googleLong)
                        }}
                        onCloseClick={()=> {
                            setSelectedLocation(null);
                        }}

                    >
                        <div>

                            <h1 style={{width: "200px", height: "100px"}}>{selectedLocation.establishmentName}</h1>
                            <img style={{width: "200px", height: "100px"}} src={selectedLocation.imageUrl} alt={selectedLocation.establishmentName}/>
                            <p style={{width: "200px", height: "100px"}}>{selectedLocation.description}</p>
                        </div>
                    </InfoWindow>
                )}
            </GoogleMap>
        );
    }
    const WrappedMap = withScriptjs(withGoogleMap(Map));
    return (
        <div style={{height: '50vh', width: '100%'}}>
            <WrappedMap
                googleMapURL={'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyA_IgIVNfuP7tLfFlN-BtAOYhto63s0Ulk'}
                loadingElement={<div style={{height: mapHeight}}/>}
                containerElement={<div style={{height: mapHeight}}/>}
                mapElement={<div style={{height: mapHeight}}/>}

            />
        </div>
    );
}