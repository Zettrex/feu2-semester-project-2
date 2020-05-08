import React, {useState} from "react";
import Nouislider from "react-nouislider";
import {Link} from "react-router-dom";

export default function () {
    const [range, setRange] = useState({
        min: 1,
        max: 350
    });

    function handleMin(targetValue) {
        if (targetValue <= range.max) {
            setRange({
                ...range,
                min: targetValue
            });
        } else if (targetValue > range.max){
            setRange({
                ...range,
                min: range.max
            });
        }
    }
    function handleMax(targetValue) {
        if (targetValue > range.min) {
            setRange({
                ...range,
                max: targetValue
            });
        } else if (targetValue <= range.min){
            setRange({
                ...range,
                max: range.min
            });
        } else {
            console.error("fuck you")
        }
    }
    return (
        <div className="page">
            <form className="filterArea row">
                <div className="filterArea__filters col-12 col-d-10">
                    <div className="filterArea__section row">
                        <div className="filterArea__search filterArea__section col-12 col-d-6">
                            <div className="filterArea__place filterArea__group">
                                <label className="filterArea__placeLabel form__label--compact" htmlFor="est-search">Place</label>
                                <input className="filterArea__placeInput form__input--compact" type="text" placeholder="Name or area"/>
                            </div>
                        </div>
                        <div className="filterArea__date filterArea__section col-12 col-d-6">
                            <div className="filterArea__group--compact col-12 col-d-6">
                                <label className="form__dateLabel--left" htmlFor="date1">From</label>
                                <input className="form__date--left" type="date" name="date1"/>
                            </div>
                            <div className="filterArea__group--compact col-12 col-d-6">
                                <label className="form__dateLabel--right" htmlFor="date2">To</label>
                                <input className="form__date--right" type="date" name="date2"/>
                            </div>
                        </div>
                    </div>
                    <div className="filterArea__section row">
                        <div className="filterArea__people filterArea__section col-m-12 col-6">
                            <div className="filterArea__adults filterArea__group column">
                                <label className="filterArea__adultsLabel form__label--compact" htmlFor="adults">Adults</label>
                                <select className="filterArea__adultsInput form__select--compact" name="adults">
                                    <option className="form__option" value="1">1</option>
                                    <option className="form__option" value="2">2</option>
                                    <option className="form__option" value="3">3</option>
                                    <option className="form__option" value="4">4</option>
                                    <option className="form__option" value="5">5</option>
                                    <option className="form__option" value="6">6</option>
                                    <option className="form__option" value="7">7</option>
                                    <option className="form__option" value="8">8</option>
                                    <option className="form__option" value="9">9</option>
                                    <option className="form__option" value="10">10</option>
                                </select>
                            </div>
                            <div className="filterArea__children filterArea__group column">
                                <label className="filterArea__childrenLabel form__label--compact" htmlFor="children">Children</label>
                                <select className="filterArea__childrenInput form__select--compact" name="children">
                                    <option className="form__option" value="1">1</option>
                                    <option className="form__option" value="2">2</option>
                                    <option className="form__option" value="3">3</option>
                                    <option className="form__option" value="4">4</option>
                                    <option className="form__option" value="5">5</option>
                                    <option className="form__option" value="6">6</option>
                                    <option className="form__option" value="7">7</option>
                                    <option className="form__option" value="8">8</option>
                                    <option className="form__option" value="9">9</option>
                                    <option className="form__option" value="10">10</option>
                                </select>
                            </div>
                        </div>
                        <div className="form__Price filterArea__section col-m-12 col-6">
                            <div className="form__range filterArea__group">
                                <div className="form__rangeControls row">
                                    <label className="form__rangeLabel column" htmlFor="Price">Price</label>
                                    <input className="form__rangeInput--min column" type="number" min="1" max="350" value={range.min} onChange={event => handleMin(parseInt(event.target.value))}/>
                                    <input className="form__rangeInput--max column" type="number" min="1" max="350" value={range.max} onChange={event => handleMax(parseInt(event.target.value))}/>
                                </div>

                                {/*I decided to use the NoUiSlider Library for the slider.
                            first off i set the range on bar what its min & max should be, then i set the start
                            (which is the positions of the handles) to work with the state i have set.
                            after that i set an event listener on "slide" to update the values*/}
                                <div className="form__multiRange">
                                    <Nouislider
                                        range={{min: 1, max: 350}}
                                        start={[range.min, range.max]}
                                        connect={true}
                                        onSlide={(values, handle) => {
                                            if (handle === 0) {
                                                handleMin(parseInt(values[0]));
                                            } else {
                                                handleMax(parseInt(values[1]))
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="filterArea__action filterArea__section col-d-2">
                    <div className="filterArea__matches">
                        Found 9<br/>Matches
                    </div>
                    <div className="filterArea__group filterArea__buttons">
                        <button type="submit" className="filterArea__submit btn--primary">Find place</button>
                    </div>
                </div>
                <aside className="map col-5 col-m-12">
                    {/*MAP*/}
                </aside>
                <main className="est-list col-7 col-m-12">
                    <div className="est row">
                        <div className="est__showcase col-3">
                            <div className="est__image" style={{
                                backgroundImage:`url(https://images.unsplash.com/photo-1439130490301-25e322d88054?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=80)`
                            }}/>
                        </div>
                        <div className="est__info col-6">
                            <h3 className="est__name est__content">Super duper place</h3>
                            <div className="est__rating est__content">
                                <span className="est__ratingLabel">Rating</span>
                                <div className="est__ratingStars">
                                    X X X X X
                                </div>
                            </div>
                            <div className="est__description est__content">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto error et impedit iste nam suscipit tempora veritatis.
                            </div>
                        </div>
                        <div className="est__action col-3">
                            <div className="est__price">
                                88$
                            </div>
                            <Link className="est__readMore link--white" to="/specific">Read more</Link>
                            <Link className="est__book btn--primary" to="/checkout">Book now</Link>
                        </div>
                    </div>
                </main>
            </form>
        </div>
    )
}