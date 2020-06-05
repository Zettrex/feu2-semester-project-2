import React, {useState} from "react";
import Map from "./components/Map";
import EstablishmentItem from "./components/establishments/EstablishmentItem";
import DateFromTo from "./components/filters/DateFromTo";
import SearchBox from "./components/filters/SearchBox";
import {useForm} from "react-hook-form";
import People from "./components/filters/People";
import PriceRange from "./components/filters/PriceRange";
import {_filterEstablishments} from "../functions/handleEstablishmentForm";
import * as yup from "yup";
import PropTypes from 'prop-types';

export default function Establishments ({establishments}) {
    const [data, setData] = useState({
        oEstablishments: establishments,
        fEstablishments: establishments,
        sEstablishment: null
    });

    function _updateData(newData) {
        setData({
            ...data,
            fEstablishments: newData
        })
    }

    function updatePrice() {
        const values = getValues();
        _filterEstablishments(data.oEstablishments, _updateData, values);
    }

    const {register, getValues, errors} = useForm({
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
                .string()
                .matches(/(?!(\d){4}([1-9] | 1[0-2]){2}(1[1-9] | 2[1-4]))/, {
                    message: "invalid date",
                    excludeEmptyString: true
                })
                .test({
                    test: value => {
                        if (value) {
                            const values = getValues()
                            return new Date(values.date2).getTime() >= new Date(value).getTime();
                        } else {
                            return true;
                        }
                    },
                    message: "Dates are wrong order"
                })
                .test({
                    test: value => {
                        if (value) {
                            return (new Date(value).getTime() > new Date(new Date().toLocaleDateString()).getTime());
                        } else {
                            return true;
                        }
                    },
                    message: "Invalid date selected"
                }),
            date2: yup
                .string()
                .matches(/(?!(\d){4}([1-9] | 1[0-2]){2}(1[1-9] | 2[1-4]))/, {
                    message: "invalid date",
                    excludeEmptyString: true
                })
                .test({
                    test: value => {
                        if (value) {
                            const values = getValues()
                            return new Date(values.date1).getTime() <= new Date(value).getTime();
                        } else {
                            return true;
                        }
                    },
                    message: "Dates are wrong order"
                })
                .test({
                    test: value => {
                        if (value) {
                            return (new Date(value).getTime() > new Date(new Date().toLocaleDateString()).getTime());
                        } else {
                            return true;
                        }
                    },
                    message: "Invalid date selected",
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
                    _filterEstablishments(data.oEstablishments, _updateData, values)
                }}>
                    <div className="filterArea__filters col-12 col-auto">
                        <div className="filterArea__section row">
                            <SearchBox className="filterArea" label="place" sectionCol="col-12 col-l-6" updateData={_updateData} data={data} results={false} Ref={register} errors={errors}/>
                            <DateFromTo className="filterArea" groupCol="col-6 col-s-12" sectionCol="col-12 col-l-6" Ref={register} errors={errors}/>
                        </div>
                        <div className="filterArea__section row">
                            <People className="filterArea" sectionCol="col-s-12 col-6" groupCol="column--split" Ref={register} errors={errors}/>
                            <PriceRange className="filterArea" sectionCol="col-s-12 col-6" data={data} updateFilters={updatePrice} Ref={register} errors={errors}/>
                        </div>
                    </div>
                    <div className="filterArea__info filterArea__section column">
                        <div className="filterArea__matches">
                            <div>Found {data.fEstablishments.length}</div>
                            <div>Matches</div>
                        </div>
                    </div>
                </form>
            </div>
            <div className="est__wrapper row">
                <aside className="est__mapWrapper col-12 col-l-5">
                    <div className="est__mapContainer">
                        {data.fEstablishments && (
                            <Map fixHeight={true} data={data.fEstablishments}/>
                        )}
                    </div>
                </aside>
                <main className="est-list col-12 col-l-7">
                       {data.fEstablishments.length > 0 ? data.fEstablishments.map((est, i) => {
                           const values = getValues();
                           return <EstablishmentItem filters={values} key={est.establishmentID} odd={!((i+1) % 2 === 0)} item={est}/>
                       }): null}
                </main>
            </div>
        </div>
    )
}

Establishments.propTypes = {
    establishments: PropTypes.array.isRequired
}