const TwitterComp = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col s12 center">
                    <h3><i className="mdi-content-send brown-text"></i></h3>
                </div>

                <div className="col s12">
                    <a className="twitter-timeline" data-chrome="nofooter" data-tweet-limit="1" data-height="180" href="https://twitter.com/Zoezi_Education?ref_src=twsrc%5Etfw">Tweets by Zoezi Education</a> <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
                </div>

            </div>
        </div>
    )
}

export default TwitterComp;