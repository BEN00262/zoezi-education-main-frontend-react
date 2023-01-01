import { useMemo, useState } from "react"

// TODO: refactor

interface IBlogArticle {
    _id: string
    createdAt: Date
    title: string
    mast?: string // url to the actual image
    slug: string
    body: string
    likes: number
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
                            {createdAt.toDateString()}
                        </p>
                    </div>

                    <div className="col s12">
                        {
                            mast ?
                            <img src="<%= article.mast%>" style={{
                                height:300,width: "100%",
                            }} className="img-responsive"/>
                            :
                            <img src="img/<%= article.slug%>.jpg" style={{
                                height:300,width: "100%",
                            }}  className="img-responsive"/>
                        }
                    </div>

                    <div className="col s12 ql-editor">
                        {body}
                    </div>

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

// previews of the other articles if any
const ArticlePreviewComp: React.FC<IBlogArticle> = ({ mast, slug, title, createdAt }) => {
    return (
        <div className="col s6 l3">
            {
                mast ?
                <img src="<%= article.mast%>" style={{
                    height:100,width: "100%",
                }} className="img-responsive"/>
                :
                <img src="img/<%= article.slug%>.jpg" style={{
                    height:100,width: "100%",
                }} className="img-responsive"/>
            }
            <a href="/media/<%=article.slug%>" className="sub-modal-texts"><b>{title}</b></a>
            <br/>
            <span className="sub-modal-texts">{createdAt.toDateString()}</span>
        </div>
    )
}

const BlogPage = () => {
    const [articles, setArticles] = useState<IBlogArticle[]>([]);

    const main_article = useMemo(() => {
        return articles?.[0];
    }, [articles]);

    return (
        <div className="container">
            {/* main article */}
            { articles.length ? <ArticleComp {...main_article}/> : null }

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