import { useEffect, useMemo, useState } from "react"
import { useQuery } from "react-query"
import { Link, useParams } from "react-router-dom"
import { Helmet } from 'react-helmet';

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import { get_blog_articles } from "./api"

// TODO: refactor

interface IBlogArticle {
    _id: string
    createdAt: string
    title: string
    mast?: string // url to the actual image
    slug: string
    body: string
    likes: number
    // metadata: {
    //     has_liked_article: boolean
    // }
}

interface IBlogArticles {
    articles: IBlogArticle[]
    metadata: {
        has_liked_article: boolean
    }
}

// a single article
const ArticleComp: React.FC<IBlogArticle> = ({ mast, slug, title, createdAt, body }) => {
    return (
        <div className="row">
            <div className="col s12">
                <div className="row">
                    <div className="col s12">
                        <h4><i className="mdi-content-send brown-text"></i></h4>
                        <h5 className="sub-names">
                            {title}
                        </h5>
                        <p>Published:
                            {new Date(createdAt).toDateString()}
                        </p>
                    </div>

                    <div className="col s12">
                        <img src={mast ? mast : `img/${slug}.jpg`} style={{ height:300,width: "100%" }}  className="img-responsive"/>
                    </div>

                    <div className="col s12 ql-editor" dangerouslySetInnerHTML={{ __html: body }}/>

                    {/* <% if (login) {%>
                        <div className="col s12">
                            <!-- favorite -->
                            <!-- has_liked_article -->

                            <button className="waves-effect waves-light btn white black-text" id="likeBtn" onclick="likeArticle('<%=articles[0]._id%>')">
                                <i className="small material-icons left" id="like_icon"><%=metadata.has_liked_article ? "favorite" : "favorite_border"%></i>
                                <span id="like_count"><%= articles[0].likes %></span>
                            </button>

                            // <!-- we dont care about this for now -->
                            // <% // if (!metadata.already_subbed) {%>
                            //     // <!-- <button className="waves-effect waves-light btn white black-text sub-modal-texts" id="subscription_btn" onclick="subForNotification()"><i class="material-icons right">email</i>subscribe for more</button> -->
                            //     <%// }%>
                        </div>
                        <%}%> */}
                    </div>
            </div>
        </div>
    )
}

const ArticleSkeletonComp = () => {
    return (
        <div className="row">
            <div className="col s12">
                <div className="row">
                    <div className="col s12">
                        <h4><i className="mdi-content-send brown-text"></i></h4>
                        <h5 className="sub-names">
                            <Skeleton inline height={35}/>
                        </h5>
                        <p><Skeleton inline width={200}/></p>
                    </div>

                    <div className="col s12" style={{ marginBottom: "20px"}}>
                        <Skeleton width={"100%"} height={300}/>
                    </div>

                    <div className="col s12">
                        <Skeleton count={15}/>
                    </div>
                </div>
            </div>
        </div>
    )
} 

// previews of the other articles if any
const ArticlePreviewComp: React.FC<IBlogArticle> = ({ mast, slug, title, createdAt }) => {
    return (
        <div className="col s6 l3">
            <img src={mast ? mast : `img/${slug}.jpg`} style={{ height:100,width: "100%" }}  className="img-responsive"/>
            <Link to={`/blog/${slug}`} className="sub-modal-texts"><b>{title}</b></Link>
            <br/>
            <span className="sub-modal-texts">{new Date(createdAt).toDateString()}</span>
        </div>
    )
}

const BlogPage = () => {
    const { slug } = useParams(); // this is optional
    
    const [articles, setArticles] = useState<IBlogArticle[]>([]);

    const { data: blog_articles, isLoading, isSuccess } = useQuery<IBlogArticles>(['blog-articles', slug], () => get_blog_articles(slug), {
        staleTime: 1200000
    });

    useEffect(() => {
        if (isSuccess && blog_articles) {
            setArticles(blog_articles.articles);
        }
    }, [isSuccess, blog_articles])

    const main_article = useMemo(() => {
        return articles?.[0];
    }, [articles]);

    return (
        <div className="container">
            <Helmet>
                <title>Zoezi | Blog</title>
                <link href="https://cdn.quilljs.com/1.0.0/quill.snow.css" rel="stylesheet"/>
            </Helmet>
            {/* main article */}
            {
                isLoading ?
                 <ArticleSkeletonComp/>
                :
                <>{ articles.length ? <ArticleComp {...main_article}/> : null }</>
            }

            {/* additional reads */}
            {
                articles.slice(1).length ? 
                <div className="col s12">
                    <div className="row">
                        <div className="col s12">
                            <h4><i className="mdi-content-send brown-text"></i></h4>
                            <h5 className="sub-modal-texts">More From Zoezi</h5>
                            <div className="divider"></div>
                        </div>
                    </div>

                    <div className="row">
                        {
                            articles.slice(1).map((article, position) => 
                                <ArticlePreviewComp key={`additional-article-${position}`} {...article}/>
                            )
                        }
                    </div>
                </div>
                : null
            }
        </div>
    )
}

export default BlogPage;