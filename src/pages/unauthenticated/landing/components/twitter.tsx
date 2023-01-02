import { TwitterTimelineEmbed } from "react-twitter-embed";

const TwitterComp = () => {
    return (
        <div>
            <div className="row">
                <div className="col s12 center">
                    <h3><i className="mdi-content-send brown-text"></i></h3>
                </div>

                <div className="col s12">
                    {/* <a className="twitter-timeline" data-chrome="nofooter" data-tweet-limit="1" data-height="180" href="https://twitter.com/Zoezi_Education?ref_src=twsrc%5Etfw">Tweets by Zoezi Education</a> <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script> */}

                    <TwitterTimelineEmbed
                        sourceType="profile"
                        screenName="Zoezi_Education"
                        options={{
                            height: 400,
                        }}
                        noScrollbar
                        tweetLimit={1}
                    />
                
                </div>

            </div>
        </div>
    )
}

export default TwitterComp;