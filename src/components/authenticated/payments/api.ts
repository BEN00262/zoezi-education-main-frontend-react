import axios from 'axios'

export const get_pricing_plans = async () => {
    return axios.get(`/pricing-details`).then(({ data }) => data)   
}