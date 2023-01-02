import axios from 'axios';

export const get_testimonials = async () => {
    return axios.get("/testimonials").then(({ data }) => data.testimonials);
}