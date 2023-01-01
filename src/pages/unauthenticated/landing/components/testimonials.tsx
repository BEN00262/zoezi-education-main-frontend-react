import { useState } from "react";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import Glider from 'react-glider';
import 'glider-js/glider.min.css';

interface ITestimonial {
    name: string
    position: string
    remark: string
}

const clip_remarks_text_size = (remark: string): string => {
    return remark.split('').splice(0,120).join('') + (remark.length > 120 ? "..." : "")
}

const TestimonialComp: React.FC<ITestimonial> = ({ name, position, remark }) => {
    return (
        <li className="glide__slide">
            <div className="card hoverable z-depth-1" data-aos="flip-left" data-aos-easing="ease-out-cubic" style={{
                height:330,
            }}>
                <div className="card-content center">
                    <i className="im im-user-circle" style={{
                        fontSize:45,
                    }}></i><br/><br/>
                    <i className="im im-quote-left teal-text" style={{
                        fontSize:15,marginRight:5,
                    }}></i><span className="sub-modal-texts" style={{
                        fontWeight: "bold",
                    }}>{clip_remarks_text_size(remark)}</span><br/><br/><i className="im im-quote-right teal-text" style={{
                        fontSize:20,
                    }}></i><br/>
                    <b>{name}</b><br/><span className="light">{position}</span>
                </div>
            </div>
        </li>
    )
} 

const TestimonialSkeletonComp = () => {
    return (
        <div className="card hoverable z-depth-1" data-aos="flip-left" data-aos-easing="ease-out-cubic" style={{ height:330 }}>
            <div className="card-content center">
                <i className="im im-user-circle" style={{ fontSize:45 }}></i><br/><br/>
                <Skeleton count={4} /><br />
                <Skeleton /><br/><Skeleton />
            </div>
        </div>
    )
}


// TODO: finishup on this
const Testimonialscomp = () => {
    const [testimonials, setTestimonials] = useState<ITestimonial[]>([]);

    return (
        <div className="container">
            <div className="row">
                <div className="col s12 center">
                    <h3><i className="mdi-content-send brown-text"></i></h3>
                    <h4 className="sub-names">Testimonials</h4>
                </div>

                <Glider
                    className="glider-container"
                    draggable
                    slidesToShow={4}
                    scrollLock
                    responsive={[
                        {
                            breakpoint: 800,
                            settings: {
                                slidesToShow: 2
                            }
                        },
                        {
                            breakpoint: 480,
                            settings: {
                                slidesToShow: 1
                            }
                        }
                    ]}
                >
                    {
                        (new Array(5).fill(1)).map((testimonial, position) => {
                            return (
                                <TestimonialSkeletonComp key={`testimony-${position}`}/>
                            )
                        })
                    }
                </Glider>
                {/* <div className="glide col s12" id="testimonials">
                    <div data-glide-el="track" className="glide__track">
                        <ul className="glide__slides">
                            {
                                testimonials.map((testimonial, position) => {
                                    return (
                                        <TestimonialComp key={`testimony-${position}`} {...testimonial}/>
                                    )
                                })
                            }
                            {
                                (new Array(5).fill(1)).map((testimonial, position) => {
                                    return (
                                        <TestimonialSkeletonComp key={`testimony-${position}`}/>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default Testimonialscomp;