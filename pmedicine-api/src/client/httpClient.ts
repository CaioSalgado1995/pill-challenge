import axios, { AxiosResponse } from 'axios'

async function getHtmlFrom(url: string) {
    return axios.get(url)
        .then((response) => response.data as string)
        .catch((error) => {
            console.log("Axios error => " + error)
            if(error.response.status == 404) {
                throw Error("resource_not_found")
            } else {
                throw Error("generic_error")
            }
        })
}

export default getHtmlFrom