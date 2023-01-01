// this file contains all api endpoint calls to the server

import axios from "axios"

export const get_pricings = async () => {
    return axios.get("/pricing").then(({ data }) => data.prices)
}