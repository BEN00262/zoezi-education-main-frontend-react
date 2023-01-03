import axios from 'axios'

export const get_dashboard_grades = async () => {
    return axios.get("/dashboard").then(({ data }) => data)
}