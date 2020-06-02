import React, {Component, useState} from "react";
import {Map, GoogleApiWrapper, Marker, InfoWindow} from "google-maps-react";

export class MapContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: props.data,
            mapCenter: {lat: 60.39299, lng: 5.32415},
            activeMarker: {},
            showingInfoWindow: false,
            selectedPlace: {}
        }
    }
    onMarkerClick = (props, marker, e) =>
        {
            console.log(props, marker, e)
            this.setState({
                selectedPlace: props,
                activeMarker: marker,
                showingInfoWindow: true
            })
        };
    onInfoWindowClose = () => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
    };

    displayMarkers = () => {
        return this.props.data.map((est, index) => {
            return <Marker key={index} id={index} position={{
                lat: est.googleLat,
                lng: est.googleLong
            }}
           onClick={() => {
               this.onMarkerClick(est);
           }}
           name={est.establishmentName}
            />
        })
    }

    render() {
        if (this.state.data) {
            return (
                <div style={{width: "100%", height: "100vh"}}>
                    <Map
                        google={this.props.google}
                        zoom={10}
                        initialCenter={this.state.mapCenter}
                    >
                        {this.displayMarkers()}
                        <InfoWindow
                            position={{
                                lat: parseFloat(this.state.selectedPlace.googleLat),
                                lng: parseFloat(this.state.selectedPlace.googleLong)
                            }}
                            google={this.props.google}
                            marker={this.state.activeMarker}
                            visible={this.state.showingInfoWindow}
                            map={this.props.map}
                            onClose={this.onInfoWindowClose}
                        >
                            <div>
                                <div className="h3 map__name">{this.state.selectedPlace.establishmentName}</div>
                                <img src={this.state.selectedPlace.imageUrl} alt={this.state.selectedPlace.establishmentName}/>
                            </div>
                        </InfoWindow>
                    </Map>
                </div>
            );
        }
    }
}

/*export function Map2(props) {
    const [state, setState] = useState({
        data: props.data,
        mapCenter: {lat: 60.39299, lng: 5.32415},
        activeMarker: {},
        showingInfoWindow: false,
        selectedPlace: {}
    });

    function onMarkerClick(props, marker, e) {
        console.log(props, marker, e)
        setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        })
    }
    function onInfoWindowClose() {
        if (state.showingInfoWindow) {
            setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
    }
    function displayMarkers() {
        return props.data.map((est, index) => {
            return <Marker key={index} id={index} position={{
                lat: est.googleLat,
                lng: est.googleLong
            }}
                           onClick={() => {
                               onMarkerClick(est);
                           }}
                           name={est.establishmentName}
            />
        })
    }

    return (
        <div style={{width: "100%", height: "100vh"}}>
            <Map
                google={props.google}
                zoom={10}
                initialCenter={state.mapCenter}
            >
                {displayMarkers()}
                <InfoWindow
                    position={{
                        lat: parseFloat(state.selectedPlace.googleLat),
                        lng: parseFloat(state.selectedPlace.googleLong)
                    }}
                    google={props.google}
                    marker={state.activeMarker}
                    visible={state.showingInfoWindow}
                    map={props.map}
                    onClose={onInfoWindowClose}
                >
                    <div>
                        <div className="h3 map__name">{state.selectedPlace.establishmentName}</div>
                        <img src={state.selectedPlace.imageUrl} alt={state.selectedPlace.establishmentName}/>
                    </div>
                </InfoWindow>
            </Map>
        </div>
    )
}*/

export default GoogleApiWrapper({
    apiKey: 'AIzaSyAR5On2vYk7M9iiOQF_X_61Mn6o1o8qm90',
})(MapContainer);
