import React from "react";

export default function () {
    return (
        <div className="page">
            <div className="home-hero">
                <form className="orderBox form">
                    <div className="orderBox__types row">
                        <label className="orderBox__hotel orderBox__type--active col-4">
                            <input className="orderBox__hotelButton orderBox__typeButton" type="radio" value="hotel"/>
                            <span className="orderBox__hotelDesign orderBox__typeDesign">Hotel</span>
                        </label>
                        <label className="orderBox__bnb orderBox__type col-4">
                            <input className="orderBox__bnbButton orderBox__typeButton" type="radio" value="bnb"/>
                            <span className="orderBox__bnbDesign orderBox__typeDesign">B&B</span>
                        </label>
                        <label className="orderBox__cabin orderBox__type col-4">
                            <input className="orderBox__cabinButton orderBox__typeButton" type="radio" value="hotel"/>
                            <span className="orderBox__cabinDesign orderBox__typeDesign">Cabin</span>
                        </label>
                    </div>
                    <div className="orderBox__filter">
                        <div className="form__section row">
                            <div className="orderBox__search col-d-6 col-12">
                                <div className="orderBox__place form__group">
                                    <label className="orderBox__placeLabel form__label--compact" htmlFor="est-search">Place</label>
                                    <input className="orderBox__placeInput form__input--compact" type="text" placeholder="Name or area"/>
                                </div>
                            </div>
                            <div className="orderBox__people col-d-6 col-12">
                                <div className="orderBox__adults form__group col-12">
                                    <label className="orderBox__adultsLabel form__label--compact" htmlFor="adults">Adults</label>
                                    <select className="orderBox__adultsInput form__select--compact" name="adults">
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
                                <div className="orderBox__children form__group col-12">
                                    <label className="orderBox__childrenLabel form__label--compact" htmlFor="children">Children</label>
                                    <select className="orderBox__childrenInput form__select--compact" name="children">
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
                        </div>
                        <div className="form__section row">
                            <div className="orderBox__date form__section col-d-6 col-12">
                                <div className="form__group--compact col-6">
                                    <label className="orderBox__dateLabel--left form__label--left" htmlFor="date1">From</label>
                                    <input className="orderBox__dateInput--left form__date--left" type="date" name="date1"/>
                                </div>
                                <div className="form__group--compact col-6">
                                    <label className="orderBox__dateLabel--right form__label--right" htmlFor="date2">To</label>
                                    <input className="orderBox__dateInput--right form__date--right" type="date" name="date2"/>
                                </div>
                            </div>
                            <div className="orderBox__action form__section">
                                <div className="form__group">
                                    <button type="submit" className="orderBox__submit btn--primary">Find place</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
                <div className="greet">

                </div>
            </div>
        </div>
    )
}