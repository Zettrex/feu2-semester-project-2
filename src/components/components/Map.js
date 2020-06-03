import React, {Component} from "react";
import {Map, GoogleApiWrapper, Marker, InfoWindow} from "google-maps-react";
import StarRating from "./StarRating";
import PropTypes from "prop-types";

export class MapContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            zoom: 11.5,
            data: props.data,
            mapCenter: {lat: 60.39299, lng: 5.32415},
            activeMarker: {},
            showingInfoWindow: false,
            selectedPlace: {},
            mapHeight: null
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

    updateMapHeight() {
        if (this.props.fixHeight && window.innerWidth > 1200) {
            this.setState({
                mapHeight: `${window.innerHeight-80}px`
            })
        } else {
            this.setState({
                mapHeight: "60vh"
            })
        }
    }

    componentDidMount() {
        this.updateMapHeight();
        window.addEventListener("resize", this.updateMapHeight.bind(this));
    }

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
                <div style={{position: "relative", width: "100%", height: this.state.mapHeight}}>
                    <Map
                        google={this.props.google}
                        zoom={10}
                        initialCenter={this.state.mapCenter}
                        style={{
                            maxWidth: "100%",
                        }}
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
                            mapCenter={true}
                        >
                            <div>
                                <i className="map__close fas fa-times"/>
                                <div className="map__img bgImage" style={{
                                    backgroundImage: `url(${this.state.selectedPlace.imageUrl})`
                                }}/>
                                <div className="h3 map__name">{this.state.selectedPlace.establishmentName}</div>
                                {this.state.selectedPlace && (
                                    <div className="map__stars">
                                        <StarRating score={this.state.selectedPlace.rating}/>
                                    </div>
                                )}
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

MapContainer.propTypes = {
    data: PropTypes.array.isRequired,
    fixHeight: PropTypes.bool
}