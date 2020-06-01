import React, {useState} from "react";
import Map from "./components/establishments/Map";
import EstablishmentItem from "./components/establishments/EstablishmentItem";
import DateFromTo from "./components/filters/DateFromTo";
import SearchBox from "./components/filters/SearchBox";
import {useForm} from "react-hook-form";
import People from "./components/filters/People";
import PriceRange from "./components/filters/PriceRange";
import {_filterEstablishments, _goToCheckout} from "../functions/handleEstablishmentForm";
import * as yup from "yup";

export default function ({establishments}) {
    const [data, setData] = useState({
        oEstablishments: establishments,
        fEstablishments: establishments,
        sEstablishment: null
    });

    function _updateData(values) {
        setData(values)
    }

    const {register, handleSubmit, getValues, errors} = useForm({
        validationSchema : yup.object().shape({
            search: yup
                .string(),
            adults: yup
                .string()
                .matches(/\d+/, {
                    message: "invalid number",
                    excludeEmptyString: true
                }),
            children: yup
                .string()
                .matches(/\d+/, {
                    message: "invalid number",
                    excludeEmptyString: true
                }),
            date1: yup
                .date({
                    message: "not a valid date",
                    excludeEmptyString: true
                }),
            date2: yup
                .date({
                    message: "not a valid date",
                    excludeEmptyString: true
                }),
            price1: yup
                .string()
                .matches(/\d+/, {
                    message: "invalid number",
                    excludeEmptyString: true
                }),
            price2: yup
                .string()
                .matches(/\d+/, {
                    message: "invalid number",
                    excludeEmptyString: true
                }),
        })
    });

    return (
        <div className="page est">
            <div className="page__topBar">
                <form className="filterArea row" onChange={() => {
                    const values = getValues();
                    _filterEstablishments(data, _updateData, values)
                }} onSubmit={handleSubmit(values => _goToCheckout(data, values))}>
                    <div className="filterArea__filters col-12 col-d-10">
                        <div className="filterArea__section row">
                            <SearchBox className="filterArea" sectionCol="col-12 col-d-6" updateData={_updateData} data={data} results={false} Ref={register} errors={errors}/>
                            <DateFromTo className="filterArea" groupCol="col-6 col-m-12" sectionCol="col-12 col-d-6" Ref={register} errors={errors}/>
                        </div>
                        <div className="filterArea__section row">
                            <People className="filterArea" sectionCol="col-m-12 col-6" groupCol="column--split" Ref={register} errors={errors}/>
                            <PriceRange className="filterArea" sectionCol="col-m-12 col-6" data={data} updateData={_updateData} Ref={register} errors={errors}/>
                        </div>
                    </div>
                    <div className="filterArea__action filterArea__section col-d-2">
                        <div className="filterArea__matches">
                            <div>Found {data.fEstablishments.length}</div>
                            <div>Matches</div>
                        </div>
                    </div>
                </form>
            </div>
            <div className="est__wrapper row">
                <aside className="est__mapWrapper col-12 col-d-5">
                    <div className="est__mapContainer">
                        <Map fixHeight={true}/>
                    </div>
                </aside>
                <main className="est-list col-12 col-d-7">
                    {data.fEstablishments.length > 0 ? data.fEstablishments.map((est, i) => {
                        const values = getValues();
                        return <EstablishmentItem filters={values} key={est.establishmentID} odd={!((i+1) % 2 === 0)} item={est}/>
                    }): null}
                </main>
            </div>
        </div>
    )
}