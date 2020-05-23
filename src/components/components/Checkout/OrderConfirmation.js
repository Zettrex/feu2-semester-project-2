import React from "react";
import {useForm} from "react-hook-form";
import * as yup from "yup"
import DateFromTo from "../filters/DateFromTo";
import People from "../filters/People";

export default function ({data, updateConfirmed}) {
    console.log(data);

    const {register, handleSubmit, errors, getValues} = useForm({
        validationSchema : yup.object().shape({
            type: yup
                .string()
                .matches(/(hotel|bnb|cabin|^$)/),
            search: yup
                .string(),
            adults: yup
                .string()
                .required("Select number of adults")
                .matches(/\d+/, "this is not a valid number"),
            children: yup
                .string()
                .required("Select number of children")
                .matches(/\d+/, "this is not a valid number"),
            date1: yup
                .string()
                .required("please enter a date")
                .matches(/(?!(\d){4}([1-9] | 1[0-2]){2}(1[1-9] | 2[1-4]))/, "not a valid date")
                .test({
                    test: value => {
                        const values = getValues()
                        return new Date(values.date2).getTime() >= new Date(value).getTime()
                    },
                    message: "Dates are wrong order"
                }),
            date2: yup
                .string()
                .required("please enter a date")
                .matches(/(?!(\d){4}([1-9] | 1[0-2]){2}(1[1-9] | 2[1-4]))/, "not a valid date")
                .test({
                    test: value => {
                        const values = getValues()
                        return new Date(values.date1).getTime() <= new Date(value).getTime()
                    },
                    message: "Dates are wrong order"
                })
        })
    });
    function _updateConfirmed(values) {
        updateConfirmed(values)
    }
    return (
        <form onSubmit={handleSubmit(_updateConfirmed)} className="orderConfirm">
            <div className="form__section orderConfirm__est col-12 row">
                <div className="orderConfirm__estImg bgImage" style={{backgroundImage: `url(${data.imageUrl})`}}/>
                <div className="orderConfirm__estInfo col-auto col-m-12">
                    <div className="orderConfirm__estName">{data.establishmentName}</div>
                    <div className="orderConfirm__estRating">XXXXX</div>
                    <div className="orderConfirm__estDesc">{data.description}</div>
                </div>
            </div>
            <div className="form__section col-12">
                <DateFromTo value1={data.date1} value2={data.date2} className="orderConfirm" sectionCol="col-12" groupCol="col-6 col-m-12" Ref={register} errors={errors}/>
                <People className="orderConfirm" sectionCol="col-12" groupCol="column--split col-m-12" adultsValue={data.adults} childrenValue={data.children} Ref={register} errors={errors}/>
            </div>
            <div className="form__section col-12">
                <div className="form__action form__group">
                    <button className="orderConfirm__submit btn--primary">Confirm</button>
                </div>
            </div>
        </form>
    )
}