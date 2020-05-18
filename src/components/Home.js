import React, {useState} from "react";
import Select from "./components/inputs/Select";
import { useForm } from  "react-hook-form";
import * as yup from "yup";


export default function ({establishments}) {
    const [data, setData] = useState({
        oEstablishments: establishments,
        fEstablishments: establishments
    });
    const [search, setSearch] = useState(false);

    function _filterEstablishments(values) {
        console.log(values);
        const original = data.oEstablishments;
        let filtered = original.filter(item => new RegExp(values.search, "gi").test(item.establishmentName));
        console.log(filtered);
        setData({
            ...data,
            fEstablishments: filtered
        })
    }
    function _goToCheckout(data) {
        console.log("checked out")
    }
    const {register, handleSubmit, getValues} = useForm({
        validationSchema : yup.object().shape({
            type: yup
                .string()
                .matches(/hotel | bnb | cabin/)
                .required()
            ,
            search: yup
                .string()
                .required(),
            adults: yup
                .string()
                .matches(/\d/)
                .required(),
            children: yup
                .string()
                .matches(/\d/)
                .required(),
            date1: yup
                .date()
                .max(yup.ref("date2"), ({max}) => `Date needs to be before ${new Date(max).toLocaleString()}`)/*https://stackoverflow.com/a/57161582*/
                .required(),
            date2: yup
                .date()
                .min(yup.ref("date1"), ({min}) => `Date needs to be later then ${new Date(min).toLocaleString()}`)/*https://stackoverflow.com/a/57161582*/
                .required()
        })
    });
    return (
        <div className="page">
            <div className="home-hero">
                <form className="orderBox form" onChange={() => {
                    const values = getValues();
                    _filterEstablishments(values)
                }} onSubmit={handleSubmit(_goToCheckout)}>
                    <div className="orderBox__types row">
                        <label className="orderBox__hotel orderBox__type--active col-4">
                            <input className="orderBox__hotelButton orderBox__typeButton" type="radio" value="hotel" name="type" ref={register}/>
                            <span className="orderBox__hotelDesign orderBox__typeDesign">Hotel</span>
                        </label>
                        <label className="orderBox__bnb orderBox__type col-4">
                            <input className="orderBox__bnbButton orderBox__typeButton" type="radio" value="bnb" name="type" ref={register}/>
                            <span className="orderBox__bnbDesign orderBox__typeDesign">B&B</span>
                        </label>
                        <label className="orderBox__cabin orderBox__type col-4">
                            <input className="orderBox__cabinButton orderBox__typeButton" type="radio" value="cabin" name="type" ref={register} onFocus={setSearch}/>
                            <span className="orderBox__cabinDesign orderBox__typeDesign">Cabin</span>
                        </label>
                    </div>
                    <div className="orderBox__filter">
                        <div className="form__section row">
                            <div className="orderBox__search col-d-6 col-12">
                                <div className="orderBox__place form__group">
                                    <label className="orderBox__placeLabel form__label--compact" htmlFor="est-search">Place</label>
                                    <input className="orderBox__placeInput form__input--compact" type="text" placeholder="Name or area" name="search" ref={register} onFocus={() => setSearch(true)} onBlur={() => setSearch(false)}/>
                                    {search && (
                                        <div className="searchResults">
                                            {data.fEstablishments.map(est => {
                                                return (
                                                    <div className="resultItem">
                                                        <div className="resultItem__img"/>
                                                         <div className="resultItem__name">
                                                             {est.establishmentName}
                                                         </div>
                                                        <div className="resultItem__info">
                                                            <span className="resultItem__type">
                                                            </span>
                                                            <span className="resultItem__price">
                                                                Price: {est.price}
                                                            </span>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="orderBox__people col-d-6 col-12 row">
                                <div className="orderBox__adults form__group col-6 col-m-12">
                                    <Select className="orderBox__adultsInput" name="adults" label="Adults" Ref={register}>
                                        <option className="form__option" value="placeholder" defaultValue hidden/>
                                        <option className="form__option" value="1">0</option>
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
                                    </Select>
                                </div>
                                <div className="orderBox__children form__group col-6 col-m-12">
                                    <Select className="orderBox__childrenInput" label="Children" name="children" Ref={register}>
                                        <option className="form__option" value="placeholder" defaultValue hidden/>
                                        <option className="form__option" value="1">0</option>
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
                                    </Select>
                                </div>
                            </div>
                        </div>
                        <div className="form__section row">
                            <div className="orderBox__date form__section col-12 row">
                                <div className="form__date--left form__group col-6">
                                    <label className="orderBox__dateLabel--left form__label--left" htmlFor="date1">From</label>
                                    <input className="orderBox__dateInput--left form__dateInput--left" type="date" name="date1" ref={register}/>
                                </div>
                                <div className="form__date--right form__group col-6">
                                    <label className="orderBox__dateLabel--right form__label--right" htmlFor="date2">To</label>
                                    <input className="orderBox__dateInput--right form__dateInput--right" type="date" name="date2" ref={register}/>
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