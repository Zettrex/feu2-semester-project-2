import React from "react";
import Checkbox from "../selectors/Checkbox";

export default function ({est, closeF}) {
    return (
        <div className="view-est">
            <h2 className="h2">Edit Establishment</h2>
            <div className="view-est__id">
                <span>ID: </span>
                <span>{est.id}</span>
            </div>
            <form className="view-est__content">
                <div className="form__section row">
                    <div className="view-est__name form__group col-6 col-m-12">
                        <label className="form__label" htmlFor="name">Establishment name</label>
                        <input className="form__input" name="name" type="text" value={est.establishmentName}/>
                    </div>
                    <div className="view-est__address form__group col-6 col-m-12">
                        <label className="form__label" htmlFor="address">Establishment address</label>
                        <input className="form__input" name="address" type="text" value={est.establishmentAddress && (est.establishmentAddress)}/>
                    </div>
                </div>
                <div className="form__section row">
                    <div className="view-est__latitude form__group col-6 col-m-12">
                        <label className="form__label" htmlFor="address">Google Latitude</label>
                        <input className="form__input" name="googleLat" type="text" value={est.googleLat}/>
                    </div>
                    <div className="view-est__longitude form__group col-6 col-m-12">
                        <label className="form__label" htmlFor="address">Google Longitude</label>
                        <input className="form__input" name="googleLong" type="text" value={est.googleLong}/>
                    </div>
                </div>
                <div className="view-est__image form__section">
                    <img className="view-est__showcase" src={est.imageUrl} alt="showcase of what image page would display for establishment"/>
                    <div className="form__group">
                        <label className="form__label" htmlFor="img">Image URL</label>
                        <input className="form__input" name="img" type="text" value={est.imageUrl}/>
                    </div>
                </div>
                <div className="view-est__price form__group">
                    <label className="form__label" htmlFor="price">Establishment Price</label>
                    <input className="form__number" name="price" type="number" value={est.price}/>
                </div>
                <div className="view-est__facilities form__group">
                    <span className="form__label">Facilities</span>
                    <div className="view-est__facilitiesList">
                        <div className="form__group">
                            <label className="form__checkbox">
                                <input className="form__checkboxButton" name="catering" type="checkbox" value="true"/>
                                <span className="form__checkboxDesign">
                                        <Checkbox checked={!est.selfCatering}/>
                                </span>
                                <span className="form__checkboxLabel">Catering</span>
                            </label>
                        </div>
                    </div>
                </div>
                <div className="view-window__actions form__group">
                    <button className="view-est__cancelBtn btn" onClick={() => closeF("close")}>Cancel</button>
                    <button className="view-est__saveBtn btn--primary" type="submit">Save</button>
                </div>
            </form>
        </div>
    )
}