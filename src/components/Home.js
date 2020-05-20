import React, {useState} from "react";
import Select from "./components/inputs/Select";
import { useForm } from  "react-hook-form";
import * as yup from "yup";


export default function ({establishments}) {
    const [data, setData] = useState({
        oEstablishments: establishments,
        fEstablishments: establishments,
        sEstablishment: {}
    });
    const [search, setSearch] = useState({
        focus: false,
        input: ""
    });

    function _handleSearchInput(event) {
        setSearch({
            ...search,
            input: event.target.value
        })
    }

    function _filterEstablishments(values) {
        console.log(values);
        const original = data.oEstablishments;
        let filtered = original.filter(item => new RegExp(`^${values.search}`, "gi").test(item.establishmentName));
        console.log(filtered);
        setData({
            ...data,
            fEstablishments: filtered
        })
    }
    function selectEstablishment(target, item) {
        setData({
            ...data,
            sEstablishment: item
        })
        setSearch({
            focus: false,
            input: item.establishmentName
        })
    }
    function _goToCheckout(values) {
        console.log("we get here?!")
        const chart = {
            ...values,
            establishment: data.sEstablishment
        }
        localStorage.setItem("chart", JSON.stringify(chart))
        console.log(chart)
    }
    const {register, handleSubmit, getValues, errors} = useForm({
        validationSchema : yup.object().shape({
            type: yup
                .string()
                .matches(/(hotel|bnb|cabin|^$)/),
            search: yup
                .string(),
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
                .required(),
            date2: yup
                .date()
                .min(yup.ref("date1"), ({min}) => `Date needs to be later then ${new Date(min).toLocaleDateString()}`)/*https://stackoverflow.com/a/57161582*/
                .required()
        })
    });
    return (
        <div className="page">
            {console.log("Search-focus: ",search.focus)}
            <div className="home-hero">
                <form className="orderBox form" onChange={() => {
                    const values = getValues();
                    _filterEstablishments(values)
                }} onSubmit={handleSubmit(_goToCheckout)}>
                    <div className="orderBox__filter">
                        <div className="form__section row">
                            <div className="orderBox__search col-d-6 col-12">
                                <div className="orderBox__place form__group">
                                    <label className="orderBox__placeLabel form__label--compact" htmlFor="est-search">Place</label>
                                    <input className="orderBox__placeInput form__input--compact" type="text" placeholder="Name or area" name="search" ref={register}
                                           onInput={() => setSearch({...search, focus: true})}
                                           onClick={() => setSearch({...search, focus: true})}
                                           onFocus={() => setSearch({...search, focus: true})}
                                           value={search.input} onChange={_handleSearchInput}
                                    />
                                    {search.focus && (
                                        <ul className="searchResults">
                                            {data.fEstablishments.map(est => {
                                                return (
                                                    <li className="searchResults__item" key={est.id}>
                                                        <label className="resultItem row"
                                                            onClick={(item) => {
                                                                selectEstablishment(item.target, est)
                                                            }}
                                                            onKeyDown={(event => {
                                                               console.log(event.target)
                                                                if (event.key === "Enter") {
                                                                    selectEstablishment(event.target, est)
                                                                }
                                                            })}
                                                        >
                                                            <input className="form__checkboxButton" type="checkbox" name="establishment"
                                                                /*onFocus={() => setSearch({...search, focus: true})}
                                                                onBlur={() => setSearch({...search, focus: false})}*/
                                                            />
                                                            <div className="form__checkboxDesign">
                                                                <div className="resultItem__img bgImage" style={{
                                                                    backgroundImage: `url(${est.imageUrl})`
                                                                }}/>
                                                                <div className="resultItem__info">
                                                                    <div className="resultItem__name">
                                                                        {est.establishmentName}
                                                                    </div>
                                                                    <span className="resultItem__price">
                                                                        Price: {est.price}$
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </label>
                                                    </li>
                                                )
                                            })}
                                        </ul>
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
                    {errors.search && (<p>search: {errors.search.message}</p>)}
                    {errors.adults && (<p>search: {errors.adults.message}</p>)}
                    {errors.children && (<p>search: {errors.children.message}</p>)}
                    {errors.date1 && (<p>search: {errors.date1.message}</p>)}
                    {errors.date2 && (<p>search: {errors.date2.message}</p>)}
                    {errors.type && (<p>search: {errors.type.message}</p>)}
                </div>
            </div>
        </div>
    )
}