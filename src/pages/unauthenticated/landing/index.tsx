import { useEffect } from "react";
// @ts-ignore
import M from "materialize-css"
// import { Slide } from 'react-slideshow-image';
// import 'react-slideshow-image/dist/styles.css';

import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

import Testimonialscomp from "./components/testimonials";
import TwitterComp from "./components/twitter";

export default function LandingPage () {
    useEffect(() => {
        M.Parallax.init(document.querySelectorAll('.parallax'));
    }, []);

    return (
        <>
            <div id="index-banner" className="parallax-container valign-wrapper">

                <div className="section no-pad-bot">
                    <div className="container">
                        <br/>
                        <h2 className="header center white-text banner-names" style={{
                            letterSpacing:2,
                        }}>Keep Learning!</h2>

                        <div className="row center">
                            <a href="/users/login" id="download-button" className="btn-large waves-effect waves-light z-depth-0 main-button">
                            <b>Get Started</b>
                            </a>
                        </div>
                        <br/>
                    </div>
                </div>

                <div className="parallax">
                    <div className="postergrad">
                        <img className="poster img-responsive" src="img/second5.jpg" alt="Learner with a phone using Zoezi Revision"/>
                    </div>
                </div>
            </div>

            {/* calling to action */}

            <div className="container">
                <div className="section">
                    <div className="row center">
                    <h6 className="teal-text">KARIBU ZOEZI</h6>
                    <h5 className="materialize-red-text" style={{
                        letterSpacing:2
                    }}>Empowering The Learning Community</h5>
                    </div>
                </div>
            </div>

            {/* features */}
            <div className="container">
                <div className="section scrollspy" id="top_part">

                    <div className="row">
                    <div className="col s12 m4 center">
                        <div className="icon-block">
                        <h2 className="center teal-text"><i className="material-icons">question_answer</i></h2>
                        <h5 className="center sub-names">Questions</h5>

                        <p className="light">ZOEZI questions are written and reviewed by a team of experienced teachers and editors from across the country. Specifically, our teachers comprise of those trained on CBC as well as longtime KCPE exam setters and markers.</p>
                        </div>
                    </div>

                    <div className="col s12 m4 center">
                        <div className="icon-block">
                        <h2 className="center teal-text"><i className="material-icons">phone_iphone</i></h2>
                        <h5 className="center sub-names">User Experience</h5>

                        <p className="light">The ZOEZI platform offers a memorable User Experience. Through Machine Learning and Artificial Intelligence, we have created a simple easy-to-use platform that takes care of each learner needs.</p>
                        </div>
                    </div>

                    <div className="col s12 m4 center">
                        <div className="icon-block">
                        <h2 className="center teal-text"><i className="material-icons">thumb_up</i></h2>
                        <h5 className="center sub-names">Easy to use</h5>

                        <p className="light">Our user interface is simple, easy to use, and needs no training. The Grades and Subjects icons are visually friendly and well-defined. </p>
                        </div>
                    </div>
                    </div>

                </div>
            </div>

            {/* another segment */}
            <div className="slider">
                <div>
                    <Splide options={{
                        autoplay: true,
                        cover: true,
                        arrows: false,
                        autoHeight: true,
                        drag: true,
                        lazyLoad: true,
                        height: '400px'
                    }}>
                        <SplideSlide>
                            <img  className="poster img-responsive" src="img/second4.jpg"/>
                            <div className="caption center-align">
                                <h5 className="light white-text" style={{
                                    marginTop:150,
                                }}><b><i>Inclusive, equitable, quality education for all</i></b></h5>
                            </div>
                        </SplideSlide>
                        <SplideSlide>
                            <img className="poster img-responsive" src="img/direction.jpg"/>
                        </SplideSlide>
                        <SplideSlide>
                            <img className="poster img-responsive" src="img/second3.jpg"/>
                            <div className="caption center-align">
                                <h5 className="light white-text" style={{
                                    marginTop:150,
                                }}><b><i>Inclusive, equitable, quality education for all</i></b></h5>
                            </div>
                        </SplideSlide>
                    </Splide>
                </div>
            </div>

            {/* app advert section */}
            <div className="section">
                <div className="container">
                    <div className="row">
                        <div className="col s12 center">
                            <h3><i className="mdi-content-send brown-text"></i></h3>
                        </div>

                        <div className="col s12 m5">
                            
                            {/* <!-- first image --> */}
                            <div className="row">
                            <div className="col s6 m12 l6">
                                <img src="img/mobile-app-display1.jpeg" style={{ height:300 }} className="img-responsive"/>
                            </div>
                            <div className="col s6 m12 l6 hide-on-med-only">
                                <img src="img/mobile-app-display2.png" style={{ height:300, }} className="img-responsive"/>
                            </div>
                            </div>


                        </div>

                        {/* <!-- a description --> */}
                        <div className="col s12 m7">
                            <h4 className="sub-modal-texts">Get The Best Learning Experience with Zoezi</h4>
                            <p className="sub-modal-texts">The Zoezi Revision App provides our learners with hands on learning experience that fosters academic excellence.</p>
                            <a href='https://play.google.com/store/apps/details?id=com.zoeziMitzanimedia.androidapp&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'>
                            <img alt='Get it on Google Play' width="200" src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png' />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* another segment */}
            <div className="container">
    <div className="row">
      <div className="col s12 center">
        <h3><i className="mdi-content-send brown-text"></i></h3>
        <h4 className="sub-names">Features</h4>
      </div>

      {/* <!-- work the features here --> */}
      <div className="row">
        
        <div className="col s12 m4 center">
          <div className="white-text" style={{
            backgroundImage: "url(img/feature-icon.svg)",height:80,backgroundRepeat: "no-repeat",backgroundSize: "contain",
          }}>
            <h6 className="sub-modal-texts" style={{
                padding:10,
            }}>Revision Summary</h6>
          </div>
          <img className="img-responsive" style={{
            height:400,
          }} src="img/revision_summary.png"/>
          <p className="sub-modal-texts">Learn how your child spends time on ZOEZI. What subjects do they like? What are they passionate about? Why are they scoring that not-so-good grade that subject? Seek tutorial help on those subjects that your child engages less in.</p>
        </div>

        <div className="col s12 m4 center">
          <div className="white-text" style={{
            backgroundImage: "url(img/feature-icon.svg)",height:80,backgroundRepeat: "no-repeat",backgroundSize: "contain",
          }}>
            <h6 className="sub-modal-texts" style={{
                padding:10,
            }}>Library</h6>
          </div>
          <img className="img-responsive" style={{
            height:400,
          }} src="img/library.png"/>
          <p className="sub-modal-texts">A detailed easy-to-use library to help a learner revise what they had previous engaged in. The library acts as a record of work done – clear with dates, grades, subjects and scores</p>
        </div>

        <div className="col s12 m4 center">
          <div className="white-text" style={{
            backgroundImage: "url(img/feature-icon.svg)",height:80,backgroundRepeat: "no-repeat",backgroundSize: "contain",
          }}>
            <h6 className="sub-modal-texts" style={{
                padding:10,
            }}>Math Solutions</h6>
          </div>
          <img className="img-responsive" style={{
            height:400,
          }} src="img/math_solutions.png"/>
          <p className="sub-modal-texts">We don’t just provide Math answers. We take the learner through a step-by-step process of arriving at the correct answer. Experience the different ways to solve similar Math questions.</p>
        </div>
      </div>

      {/* <!-- the second row --> */}
      <div className="row">
        
        <div className="col s12 m4 push-m2 center">
          <div className="white-text" style={{
            backgroundImage: "url(img/feature-icon-center.svg)",height:80,backgroundRepeat: "no-repeat",backgroundSize: "contain",
          }}>
            <h6 className="sub-modal-texts" style={{
                padding:10,
            }}>KCPE</h6>
          </div>
          <img className="img-responsive" style={{
            height:400,
          }} src="img/kcpe-view.png"/>
          <p className="sub-modal-texts">With Zoezi Revision, KCPE candidates can engage in either flexible revision or a timed (just like real exam) mode. The platform allows unlimited attempts on all past and model papers, with each attempt recorded separately in the Library</p>
        </div>

        <div className="col s12 m4 push-m2 center">
          <div className="white-text" style={{
            backgroundImage: "url(img/feature-icon.svg)",height:80,backgroundRepeat: "no-repeat",backgroundSize: "contain"
          }}>
            <h6 className="sub-modal-texts" style={{
                padding:10,
            }}>Parental Monitoring</h6>
          </div>
          <img className="img-responsive" style={{
            height:400,
          }} src="img/parent-child.png"/>
          <p className="sub-modal-texts">Zoezi Education offers a parent-controlled revision platform. One can create/add child/children and monitor their revision activities on the platform. Each child enjoys a personalized learning experience with library and progress reports.</p>
        </div>
      </div>

        {/* testimonies */}
        <Testimonialscomp/>

        {/* tweets */}
        <TwitterComp/>
    </div>
    
</div>

        </>
    )
}