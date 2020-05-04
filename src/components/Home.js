import React, {useState} from "react";
import Checkbox from "./components/selectors/Checkbox";
import RadioButton from "./components/selectors/RadioButton";
import Nouislider from "react-nouislider";

export default function () {
    const [checked, setChecked] = useState({
        radio: false,
        checkbox: false
    });
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
            {console.log(range)}
            <button className="btn--primary">
                save
            </button>
            <form className="form" action="">
                <div className="form__section row">
                    <div className="form__group col-6">
                        <label className="form__label--compact" htmlFor="something">Input</label>
                        <input className="form__input--compact" name="something" type="text" placeholder="testing if this looks good"/>
                    </div>
                    <div className="form__group col-6">
                        <label className="form__label--compact" htmlFor="something2">Input</label>
                        <input className="form__input--compact" name="something2" type="text" placeholder="testing if this looks good"/>
                    </div>
                </div>
                <div className="form__group">
                    <label className="form__label--compact form__label--textarea" htmlFor="else">Text area</label>
                    <textarea className="form__textarea--compact" name="else" placeholder="text to test with"/>
                </div>
                <div className="form__group">
                    <label className="form__label--compact" htmlFor="meme">Adults</label>
                    <select className="form__select--compact" name="meme">
                        <option className="form__option" value="1">1</option>
                        <option className="form__option" value="1">2</option>
                        <option className="form__option" value="1">3</option>
                        <option className="form__option" value="1">4</option>
                        <option className="form__option" value="1">5</option>
                        <option className="form__option" value="1">6</option>
                        <option className="form__option" value="1">7</option>
                        <option className="form__option" value="1">8</option>
                        <option className="form__option" value="1">9</option>
                        <option className="form__option" value="1">10</option>
                    </select>
                </div>
                <div className="form__group">
                    <label className="form__label--compact" htmlFor="meme">Children</label>
                    <select className="form__select--compact" name="meme">
                        <option className="form__option" value="1">1</option>
                        <option className="form__option" value="1">2</option>
                        <option className="form__option" value="1">3</option>
                        <option className="form__option" value="1">4</option>
                        <option className="form__option" value="1">5</option>
                        <option className="form__option" value="1">6</option>
                        <option className="form__option" value="1">7</option>
                        <option className="form__option" value="1">8</option>
                        <option className="form__option" value="1">9</option>
                        <option className="form__option" value="1">10</option>
                    </select>
                </div>
                <div className="form__section">
                    <div className="form__group--compact">
                        <label className="form__label--left" htmlFor="date1">From</label>
                        <input className="form__date--left" type="date" name="date1"/>
                    </div>
                    <div className="form__group--compact">
                        <label className="form__label--right" htmlFor="date2">To</label>
                        <input className="form__date--right" type="date" name="date2"/>
                    </div>
                </div>
                <div className="form__group">
                    <label className="form__radio" onClick={event => setChecked({radio: event.target.checked})}>
                        <input className="form__radioButton" type="radio"/>
                        <span className="form__radioDesign">
                        <RadioButton checked={checked.radio}/>
                    </span>
                        <span className="form__radioLabel">Option 1</span>
                    </label>
                </div>

                <div className="form__group">
                    <label className="form__checkbox" onClick={event => setChecked({checkbox: event.target.checked})}>
                        <input className="form__checkboxButton" type="checkbox"/>
                        <span className="form__checkboxDesign">
                            <Checkbox checked={checked.checkbox}/>
                        </span>
                        <span className="form__checkboxLabel">Option 1</span>
                    </label>
                </div>
                <div className="form__group">
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
            </form>
        </div>
    )
}