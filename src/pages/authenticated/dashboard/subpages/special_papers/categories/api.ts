import axios from 'axios';

export const get_special_paper_categories = async (grade_reference_id: string) => {
    return axios.get(`/special/categories/${grade_reference_id}`).then(({ data }) => data)
}