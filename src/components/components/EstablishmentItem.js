import React from "react";
import {Link} from "react-router-dom";

export default function ({item}) {
    return (
        <div className="est__item row">
            <div className="est__showcase col-3 col-m-4">
                <div className="est__image" style={{
                    backgroundImage:`url(${item.imageUrl})`
                }}/>
            </div>
            <div className="est__info col-6 col-m-8">
                <h3 className="est__name est__content">{item.establishmentName}</h3>
                <div className="est__rating est__content">
                    <span className="est__ratingLabel">Rating</span>
                    <div className="est__ratingStars">
                        X X X X X
                    </div>
                </div>
                <div className="est__description est__content">
                    {item.description}
                </div>
            </div>
            <div className="est__action col-3 col-m-12">
                <div className="est__price">
                    {item.price}$
                </div>
                <Link className="est__readMore link--white" to={`/specific/?id=${item.id}`}>Read more</Link>
                <Link className="est__book btn--primary" to="/checkout" onClick={localStorage.setItem("order", JSON.stringify(item))}>Book now</Link>
            </div>
        </div>
    )
}