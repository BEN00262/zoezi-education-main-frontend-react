import axios from "axios"

export const get_blog_articles = async (blog_slug: string = "") => {
    return axios.get(`/media${blog_slug ? "/" + blog_slug : ""}`).then(({ data }) => data);
}