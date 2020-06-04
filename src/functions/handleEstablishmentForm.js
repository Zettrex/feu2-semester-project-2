import PropTypes from "prop-types";

export function _filterEstablishments(original, updateData, values) {

    let filtered = original.filter(item => {
        if (values.price1 && values.price2) {
            return ((parseInt(item.price) >= parseInt(values.price1)) && (parseInt(item.price) <= parseInt(values.price2))) && new RegExp(`^${values.search}`, "gi").test(item.establishmentName);
        } else {
            return new RegExp(`${values.search}`, "gi").test(item.establishmentName)
        }
    });
    console.log(original, values, filtered)
    if (updateData) {
        updateData(filtered)
    }
}

_filterEstablishments.propTypes = {
    original: PropTypes.object.isRequired,
    updateData: PropTypes.func.isRequired,
    values: PropTypes.object.isRequired
}

