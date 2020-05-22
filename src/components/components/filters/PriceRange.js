import React, {useState} from "react";
import Nouislider from "react-nouislider";

export default function ({className, sectionCol, Ref, errors}) {
    const defaultRange = {
        min: 1,
        max: 350
    };
    const [range, setRange] = useState({
        min: defaultRange.min,
        max: defaultRange.max
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
            <div className="form__range form__group">
                <div className="form__rangeControls row">
                    <label className="form__rangeLabel column" htmlFor="Price">Price</label>
                    <input className="form__rangeInput--min column" type="number" name="price1" min={defaultRange.min} max={defaultRange.max} value={range.min} onChange={event => handleMin(parseInt(event.target.value))} ref={Ref}/>
                    <input className="form__rangeInput--max column" type="number" name="price2" min={defaultRange.min} max={defaultRange.max} value={range.max} onChange={event => handleMax(parseInt(event.target.value))} ref={Ref}/>
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
                                handleMin(parseInt(values[0]));
                            } else {
                                handleMax(parseInt(values[1]))
                            }
                        }}
                    />
                </div>
            </div>
            {errors.price1 && <p className="form__error">{errors.price1.message}</p>}
            {errors.price2 && <p className="form__error">{errors.price2.message}</p>}
        </div>
    )
}