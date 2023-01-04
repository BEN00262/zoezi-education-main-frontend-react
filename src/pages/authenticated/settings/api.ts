import axios from 'axios';

export const get_current_student = async () => {
    return axios.get('/student').then(({ data }) => data);
}