import appConfig from '../../Helpers/appConfig'

const CategoryService = () => {
    const body =
    {
        "search": [
            //     {
            //     "searchfield": "category",
            //     "searchvalue": "6014ed9fd7ebfa6ec230aab5",
            //     "criteria": "eq",
            //     "datatype": "ObjectId"
            // },
            { "searchfield": "status", "searchvalue": "active", "criteria": "eq" }]
    }

    const requestOptions = {
        method: 'POST',
        headers: appConfig.headers,
        body: JSON.stringify(body)
    };

    return fetch(appConfig.baseUrl + 'services/filter', requestOptions)
        .then(response => response.json()).catch(error => {
            console.error('There was an error!', error);
        });
}

export { CategoryService };