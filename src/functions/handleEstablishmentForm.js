export function _filterEstablishments(data, updateData, values) {
    console.log(values);
    const original = data.oEstablishments;
    let filtered = original.filter(item => {
        if (values.price1 && values.price2) {
            return ((parseInt(item.price) >= parseInt(values.price1)) && (parseInt(item.price) <= parseInt(values.price2))) && new RegExp(`^${values.search}`, "gi").test(item.establishmentName);
        } else {
            return new RegExp(`^${values.search}`, "gi").test(item.establishmentName)
        }
    });
    console.log(filtered);
    if (updateData) {
        updateData({
            ...data,
            fEstablishments: filtered
        })
    }
}
export function _goToCheckout(data, values) {
    const chart = {
        ...values,
        establishment: data.sEstablishment
    };
    localStorage.setItem("chart", JSON.stringify(chart));
}