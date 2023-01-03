import axios from 'axios';

export const get_special_papers = async (special_paper_reference: string) => {
    return axios.get(`/special/${special_paper_reference}`).then(({ data }) => data)
}