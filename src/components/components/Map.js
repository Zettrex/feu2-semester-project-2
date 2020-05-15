import React from 'react';

export default function (props) {

    return (
        <iframe className="est__map" title="Google Map" height={window.innerHeight*0.7} id="gmap_canvas"
                src="https://maps.google.com/maps?q=university%20of%20san%20francisco&t=&z=13&ie=UTF8&iwloc=&output=embed"
                frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"/>
    )
}