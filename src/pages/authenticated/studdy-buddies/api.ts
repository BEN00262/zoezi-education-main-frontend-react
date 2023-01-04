import axios from 'axios';


export const get_study_buddies_participations = async () => {
    return axios.get('/study-buddy/participation').then(({ data }) => data);
}