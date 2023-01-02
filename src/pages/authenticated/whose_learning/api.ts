import axios from 'axios';

export const get_children_within_account = async () => {
    return axios.get('/whose-is-learning').then(({ data }) => data?.children)
}