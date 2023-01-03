import axios from 'axios'

export const get_special_paper_category_subjects = async (grade_reference_id: string) => {
    return axios.get(`/special/subjects/${grade_reference_id}`).then(({ data }) => data);
}