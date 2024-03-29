import React from "react";
import {Link} from "react-router-dom";
import StarRating from "../StarRating";
import PropTypes from "prop-types";

export default function EstablishmentItem({odd,item, filters}) {
    function _checkout() {
        const chart = {
            ...item,
            adults: filters.adults,
            children: filters.children,
            date1: filters.date1,
            date2: filters.date2
        };
        localStorage.setItem("order", JSON.stringify(chart));
    }
    return (
        <div className="est__item  row">
            <div className="est__showcase col-3 col-s-12">
                <div className="est__image" style={{
                    backgroundImage:`url(${item.imageUrl})`
                }}/>
            </div>
            <div className="est__info col-6 col-s-12">
                <div className="h3 est__name est__content">{item.establishmentName}</div>
                <div className="est__rating est__content">
                    <div className="est__ratingStars">
                        <StarRating score={item.rating}/>
                    </div>
                </div>
                <div className="est__description est__content">
                    {item.description}
                </div>
            </div>
            <div className={`est__action${odd ? "--odd" : "--even"} col-3 col-s-12`}>
                <div className="est__price">
                    {item.price}$
                </div>
                <Link className="est__readMore link--white" to={`/specific/${item.establishmentID}`}>Read more</Link>
                <Link className="est__book btn--primary" to="/checkout" onClick={_checkout}>Book now</Link>
            </div>
        </div>
    )
}
EstablishmentItem.propTypes = {
    odd: PropTypes.bool.isRequired,
    item: PropTypes.object.isRequired,
    filters: PropTypes.object.isRequired
}