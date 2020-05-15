import React, {useState} from "react";
import Nouislider from "react-nouislider";
import Map from "./components/Map";
import EstablishmentItem from "./components/EstablishmentItem";

export default function ({establishments}) {
    console.log(establishments);
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
        }
    }
    return (
        <div className="page est">
            <div className="page__topBar">
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
                                <div className="form__date--left form__group col-12 col-d-6">
                                    <label className="form__label--left" htmlFor="date1">From</label>
                                    <input className="form__dateInput--left" type="date" name="date1"/>
                                </div>
                                <div className="form__date--right form__group col-12 col-d-6">
                                    <label className="form__label--right" htmlFor="date2">To</label>
                                    <input className="form__dateInput--right" type="date" name="date2"/>
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
                </form>
            </div>
            <div className="est__wrapper row">
                <aside className="col-12 col-d-5">
                    <Map/>
                </aside>
                <main className="est-list col-12 col-d-7">
                    {establishments.length > 0 ? establishments.map((est) => <EstablishmentItem item={est}/>): null}
                </main>
            </div>
        </div>
    )
}