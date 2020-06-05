import React, {useState, useEffect, useCallback} from "react";
import Nouislider from "react-nouislider";
import PropTypes from "prop-types";

export default function PriceRange({className, sectionCol, Ref, errors, updateFilters}) {
    const defaultRange = {
        min: 1,
        max: 350
    };
    const [range, setRange] = useState({
        min: defaultRange.min,
        max: defaultRange.max
    });
    const [inputValue, setInputValue] = useState({
        min: defaultRange.min,
        max: defaultRange.max
    })
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

    //renders updates filter when range updates
    const update = useCallback(updateFilters, []);
    useEffect(() => {
        update();
    }, [update, range])

    //updating the max value on price range, and making sure u cant place max below minimum price
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
        <div className={`${className}__priceRange form__Price form__section ${sectionCol}`}>
            <div className="form__rangeHiddenInputs">
                <input value={range.min} name="price1" type="number" disabled ref={Ref}/>
                <input value={range.max} name="price2" type="number" disabled ref={Ref}/>
            </div>
            <div className="form__range form__group">
                <div className="form__rangeControls row">
                    <label className="form__rangeLabel column" htmlFor="Price">Price</label>
                    <input className="form__rangeInput--min column" type="number" min={defaultRange.min} max={defaultRange.max} value={inputValue.min} onChange={event => {
                        handleMin(parseInt(event.target.value))
                        setInputValue({
                            ...inputValue,
                            min: event.target.value
                        })
                    }}/>
                    <input className="form__rangeInput--max column" type="number" min={defaultRange.min} max={defaultRange.max} value={inputValue.max} onChange={event => {
                        handleMax(parseInt(event.target.value))
                        setInputValue({
                            ...inputValue,
                            max: event.target.value
                        })
                    }}/>
                </div>

                {/*I decided to use the NoUiSlider Library for the slider.
                            first off i set the range on bar what its min & max should be, then i set the start
                            (which is the positions of the handles) to work with the state i have set.
                            after that i set an event listener on "slide" to update the values*/}
                <div className="form__multiRange">
                    <Nouislider
                        range={{min: defaultRange.min, max: defaultRange.max}}
                        start={[range.min, range.max]}
                        connect={true}
                        onSlide={(values, handle) => {
                            if (handle === 0) {
                                updateFilters();
                                handleMin(parseInt(values[0]));
                                setInputValue({
                                    ...inputValue,
                                    min: parseInt(values[0])
                                })
                            } else {
                                updateFilters();
                                handleMax(parseInt(values[1]))
                                setInputValue({
                                    ...inputValue,
                                    max: parseInt(values[1])
                                })
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