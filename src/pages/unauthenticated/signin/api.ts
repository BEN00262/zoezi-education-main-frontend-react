import axios from 'axios';
import { ICredentials } from './types';

export const login = async (data: ICredentials) => {
    return axios.post('/users/login', data).then(({ data }) => data)
}