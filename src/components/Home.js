import React, {useState} from "react";
import { useForm } from  "react-hook-form";
import * as yup from "yup";
import DateFromTo from "./components/filters/DateFromTo";
import SearchBox from "./components/filters/SearchBox";
import People from "./components/filters/People";
import {_goToCheckout, _filterEstablishments} from "../functions/handleEstablishmentForm";


export default function ({establishments}) {
    const [data, setData] = useState({
        oEstablishments: establishments,
        fEstablishments: establishments,
        sEstablishment: {}
    });

    function _updateData(values) {
        setData(values);
    }
    const {register, handleSubmit, getValues, errors} = useForm(/*{
        validationSchema : yup.object().shape({
            type: yup
                .string()
                .matches(/(hotel|bnb|cabin|^$)/),
            search: yup
                .string(),
            adults: yup
                .string()
                .matches(/\d+/)
                .required(),
            children: yup
                .string()
                .matches(/\d+/)
                .required(),
            date1: yup
                .date()
                .required(),
            date2: yup
                .date()
                .min(yup.ref("date1"), ({min}) => `Date needs to be later then ${new Date(min).toLocaleDateString()}`)/!*https://stackoverflow.com/a/57161582*!/
                .required()
        })
    }*/);
    return (
        <div className="page">
            <div className="home-hero">
                <form className="orderBox form" onChange={() => {
                    const values = getValues();
                    _filterEstablishments(data, _updateData, values)
                }} onSubmit={handleSubmit(values => _goToCheckout(data, values))}>
                    <div className="orderBox__filter">
                        <div className="form__section row">
                            <SearchBox className="orderBox" sectionCol="col-d-6 col-12" data={data} updateData={_updateData} Ref={register} results={true}/>
                            <People className="orderBox" sectionCol="col-d-6 col-12" groupCol="col-6 col-m-12" Ref={register} children={true} adults={true}/>
                        </div>
                        <div className="form__section row">
                            <DateFromTo className="orderBox" groupCol="col-6" sectionCol="col-12" Ref={register}/>
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