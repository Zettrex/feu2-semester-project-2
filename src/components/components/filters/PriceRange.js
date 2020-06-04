import React, {useEffect, useState} from "react";
import Nouislider from "react-nouislider";
import PropTypes from "prop-types";

export default function PriceRange({className, sectionCol, Ref, errors, updateFilters}) {
    const defaultRange = {
        min: 1,
        max: 350
    };
    //range
    const [rangeMin, setRangeMin] = useState(defaultRange.min);
    const [rangeMax, setRangeMax] = useState(defaultRange.max);
    //input
    const [inputMin, setInputMin] = useState(defaultRange.min);
    const [inputMax, setInputMax] = useState(defaultRange.max);

    useEffect(() => {
        setInputMin(rangeMin);
    }, [rangeMin]);
    useEffect(() => {
        setInputMax(rangeMax);
    }, [rangeMax]);

    function handleMin(targetValue) {
        if (targetValue <= rangeMax) {
            setRangeMin(targetValue);
        } else if (targetValue > rangeMax){
            setRangeMin(rangeMax);
        }
    }
    //updating the max value on price range, and making sure u cant place max below minimum price
    function handleMax(targetValue) {
        if (targetValue > rangeMin) {
            setRangeMin(targetValue);
        } else if (targetValue <= rangeMin){
            setRangeMax(rangeMin);
        }
    }

    return (
        <div className={`${className}__priceRange form__Price form__section ${sectionCol}`}>
            <div className="priceRange__hiddenInputs">
                <input value={rangeMin} name="price1" type="number" disabled ref={Ref}/>
                <input value={rangeMax} name="price2" type="number" disabled ref={Ref}/>
            </div>
            <div className="form__range form__group">
                <div className="form__rangeControls row">
                    <label className="form__rangeLabel column" htmlFor="Price">Price</label>
                    <input className="form__rangeInput--min column" type="number" min={defaultRange.min} max={defaultRange.max} value={inputMin} onBlur={event => handleMin(parseInt(event.target.value))} onKeyDown={event => {
                        if (event.keyCode === 13) {
                            handleMin(parseInt(event.target.value));
                        }
                    }} onChange={event => {
                        setInputMin(event.target.value);
                    }}/>
                    <input className="form__rangeInput--max column" type="number" min={defaultRange.min} max={defaultRange.max} value={inputMax} onBlur={event => handleMax(parseInt(event.target.value))} onKeyUp={event => {
                        if (event.keyCode === 13) {
                            handleMax(parseInt(event.target.value));
                        }
                    }} onChange={event => {
                        setInputMax(event.target.value)
                    }}/>
                </div>

                {/*I decided to use the NoUiSlider Library for the slider.
                            first off i set the range on bar what its min & max should be, then i set the start
                            (which is the positions of the handles) to work with the state i have set.
                            after that i set an event listener on "slide" to update the values*/}
                <div className="form__multiRange">
                    <Nouislider
                        range={{min: defaultRange.min, max: defaultRange.max}}
                        start={[rangeMin, rangeMax]}
                        connect={true}
                        onSlide={(values, handle) => {
                            if (handle === 0) {
                                updateFilters();
                                handleMin(parseInt(values[0]));
                            } else {
                                updateFilters();
                                handleMax(parseInt(values[1]));
                            }
                        }}
                    />
                </div>
            </div>
            {errors.price1 && <p className="form__error">{errors.price1.message}</p>}
            {errors.price2 && <p className="form__error">{errors.price2.message}</p>}
        </div>
    );
}
PriceRange.propTypes = {
    className: PropTypes.string,
    sectionCol: PropTypes.string,
    Ref: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    updateFilters: PropTypes.func.isRequired
};