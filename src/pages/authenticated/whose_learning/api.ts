import axios from 'axios';

export const get_children_within_account = async () => {
    return axios.get('/whose-is-learning').then(({ data }) => data?.children)
}

export const switch_to_selected_student_context = async (student_reference: string) => {
    // we get an authToken with the relevant values

    return axios.get(`/who-is-learning/${student_reference}`).then(({ data }) => data?.authToken)
}

export const switch_to_parent_context = async () => {
    // we get an authToken with the relevant values
    // we just destroy the old token and regenerate a new token

    return axios.get(`/`).then(({ data }) => data)
}