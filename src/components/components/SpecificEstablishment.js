import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import StarRating from "./StarRating";
import Map from "./establishments/Map";

export default function () {
    const [est, setEst] = useState();
    const {id} = useParams();
    useEffect(() => {
        fetch(`https://www.zettrex.no/Noroff/semester4/data/get-establishment.php?id=${id}`)
            .then(response => response.json())
            .then(setEst);
    }, [id]);
    function goToCheckout() {
        const chart = {
            ...est,
            adults: "",
            children: "",
            date1: "",
            date2: ""
        };
        localStorage.setItem("order", JSON.stringify(chart));
        window.location = "/checkout";
    }
    return (
        <div className="specific page">
            {est ? (
                <div className="specific__wrapper containerBox row">
                    <div className="specific__img col-5 col-m-12" style={{
                        backgroundImage: `url(${est.imageUrl})`
                    }}/>
                    <main className="specific__info col-7 col-m-12">
                        <div className="specific__main section row">
                            <div className="group col-auto">
                                <h1 className="h3 specific__name group">{est.establishmentName}</h1>
                                <div className="specific__rating group">
                                    <StarRating rating={est.rating}/>
                                </div>
                                <div className="specific__description group">{est.description}</div>
                            </div>
                            <div className="col-m-12 column">
                                <div className="specific__priceLabel">Price</div>
                                <div className="specific__price">{est.price}$</div>
                            </div>
                        </div>
                        <div className="specific__action section">
                            <button className="specific__order btn--primary" onClick={goToCheckout}>Order now</button>
                        </div>
                        <div className="specific__facilities section">
                            <div className="h4">Facilities</div>
                            <ul className="specific__facilitiesList group">
                                {est.selfCatering && (<li className="facility">
                                    <div className="facility__icon"><i className="fas fa-bacon"/></div>
                                    <div className="facility__name">Catering</div>
                                </li>)}
                            </ul>
                        </div>
                    </main>
                    <div className="specific__map">
                        <Map/>
                    </div>
                </div>
            ) : null}
        </div>
    )
}