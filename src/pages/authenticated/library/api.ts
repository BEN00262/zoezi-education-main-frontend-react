import axios from 'axios';

export const get_library_details = async () => {
    return axios.get('/library').then(({ data }) => data?.library);
}