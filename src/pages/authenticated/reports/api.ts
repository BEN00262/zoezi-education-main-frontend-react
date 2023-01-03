import axios from 'axios'

export const get_special_paper_stats = async () => {
    return axios.get('/analytics/special_paper_stats').then(({ data }) => data)
}

export const get_special_paper_analytics = async (gradeName: string, paperType: string, paperSubType: string) => {
    return axios.get(`analytics/special-paper-analytics/${gradeName}/${paperType}/${paperSubType}`)
        .then(({ data }) => data?.data)
}