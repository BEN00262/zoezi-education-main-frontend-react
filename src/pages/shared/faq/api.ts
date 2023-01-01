// api file for all the FAQs requests
import axios from 'axios';

export const get_faqs = async (searchParam: string = "") => {
    return axios.get(searchParam ? `/searchfaq/${searchParam}` : "/faq").then(({ data }) => data?.faqs)
}