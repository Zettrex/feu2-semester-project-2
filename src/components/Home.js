import React, {useState} from "react";
import { useForm } from  "react-hook-form";
import DateFromTo from "./components/filters/DateFromTo";
import SearchBox from "./components/filters/SearchBox";
import People from "./components/filters/People";
import {_filterEstablishments} from "../functions/handleEstablishmentForm";
import * as yup from "yup";



export default function ({establishments}) {
    const [data, setData] = useState({
        oEstablishments: establishments,
        fEstablishments: establishments,
        sEstablishment: null
    });
    function _checkout(filters) {
        console.log(filters);
        const chart = {
            ...data.sEstablishment,
            adults: filters.adults,
            children: filters.children,
            date1: filters.date1,
            date2: filters.date2
        };
        localStorage.setItem("order", JSON.stringify(chart));
        window.location="/checkout";
    }

    function _updateData(values) {
        setData(values);
    }
    const {register, handleSubmit, getValues, errors} = useForm({
        validationSchema : yup.object().shape({
            search: yup
                .string()
                .test({
                    message: "please select an establishment",
                    test: () => {
                        return data.sEstablishment !== null;
                    }
                }),
            adults: yup
                .string(),
            children: yup
                .string(),
            date1: yup
                .string(),
            date2: yup
                .string()
        })
    });
    return (
        <div className="page">
            {console.log(errors)}
            <div className="home-hero">
                <form className="orderBox form" onChange={() => {
                    const values = getValues();
                    _filterEstablishments(data, _updateData, values)
                }} onSubmit={handleSubmit(_checkout)}>
                    <div className="orderBox__filter">
                        <div className="form__section row">
                            <SearchBox className="orderBox" sectionCol="col-d-6 col-12" data={data} updateData={_updateData} results={true} Ref={register} errors={errors}/>
                            <People className="orderBox" sectionCol="col-d-6 col-12" groupCol="col-6 col-m-12" Ref={register} errors={errors}/>
                        </div>
                        <div className="form__section row">
                            <DateFromTo className="orderBox" groupCol="col-6" sectionCol="col-12" Ref={register} errors={errors}/>
                            <div className="orderBox__action form__section">
                                <div className="form__group">
                                    <button type="submit" className="orderBox__submit btn--primary">Find place</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}