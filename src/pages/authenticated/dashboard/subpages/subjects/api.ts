import axios from 'axios';

export const get_grade_subjects = async (grade_reference: string) => {
    return axios.get(`/subjects/${grade_reference}`).then(({ data }) => data)
}