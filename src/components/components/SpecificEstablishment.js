import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

export default function () {
    const [est, setEst] = useState();
    const {id} = useParams();
    useEffect(() => {
        fetch(`https://www.zettrex.no/Noroff/semester4/data/get-establishment.php?id=${id}`)
            .then(response => response.json())
            .then(setEst);
    });
    return (
        <div className="page">

        </div>
    )
}