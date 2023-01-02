import axios from 'axios';
import { ICredentials } from './types';

export const login = async (data: ICredentials) => {
    return axios.post('/', data).then(({ data }) => data)
}