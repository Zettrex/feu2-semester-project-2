import React, {useState} from 'react';

export default function () {
    const [mapHeight, setMapHeight] = useState(window.innerHeight-80);
    window.onresize = () => setMapHeight(window.innerHeight-80);
    return (
        <iframe className="est__map" title="Google Map" height={mapHeight} id="gmap_canvas"
                src="https://maps.google.com/maps?q=university%20of%20san%20francisco&t=&z=13&ie=UTF8&iwloc=&output=embed"
                frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"/>
    )
}