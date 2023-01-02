import { useEffect, useState } from "react";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

// @ts-ignore
import Glide from '@glidejs/glide'

import Glider from 'react-glider';
import 'glider-js/glider.min.css';
import { useQuery } from "react-query";
import { get_testimonials } from "../api";

interface ITestimonial {
    name: string
    position: string
    remarks: string
}

const clip_remarks_text_size = (remark: string): string => {
    return remark.split('').splice(0,120).join('') + (remark.length > 120 ? "..." : "")
}

const TestimonialComp: React.FC<ITestimonial> = ({ name, position, remarks }) => {
    return (
        <li className="glide__slide">
            <div className="card hoverable z-depth-1" data-aos="flip-left" data-aos-easing="ease-out-cubic" style={{
                height:330,
            }}>
                <div className="card-content center">
                    <i className="im im-user-circle" style={{ fontSize:45 }}></i><br/><br/>
                    <i className="im im-quote-left teal-text" style={{ fontSize:15,marginRight:5 }}></i><span className="sub-modal-texts" style={{
                        fontWeight: "bold",
                    }}>{clip_remarks_text_size(remarks)}</span><br/><br/><i className="im im-quote-right teal-text" style={{
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
        <li className="glide__slide">
            <div className="card hoverable z-depth-1" data-aos="flip-left" data-aos-easing="ease-out-cubic" style={{ height:330 }}>
                <div className="card-content center">
                    <Skeleton circle width={60} height={60} style={{ marginBottom: "10px" }}/>
                    <Skeleton count={4} /><br />
                    <Skeleton /><br/><Skeleton />
                </div>
            </div>
        </li>
    )
}



// TODO: finishup on this
const Testimonialscomp = () => {
    const { data: testimonials, isLoading } = useQuery<ITestimonial[]>('testimonials', get_testimonials, {
        staleTime: 9600000
    })

    const slider = new Glide('.glide', {
        type: 'carousel',
        perView: 4,
        focusAt: 'center',
        autoplay: 5000,
        breakpoints: {
            800: { perView: 2 },
            480: { perView: 1 }
        }
    });

    console.log(slider)

    useEffect(() => {
        slider.mount()
    }, [slider])

    return (
        <div className="container">
            <div className="row">
                <div className="col s12 center">
                    <h3><i className="mdi-content-send brown-text"></i></h3>
                    <h4 className="sub-names">Testimonials</h4>
                </div>

                <div className="glide col s12" id="testimonials">
                    <div data-glide-el="track" className="glide__track">
                        <ul className="glide__slides">
                            {
                                isLoading ?
                                <>
                                    {
                                        (new Array(5).fill(1)).map((_, position) => {
                                            return <TestimonialSkeletonComp key={`testimonial_skeleton_${position}`}/>
                                        })
                                    }
                                </>
                                :
                                <>
                                    {
                                        testimonials?.map((testimonial, position) => {
                                            return (
                                                <TestimonialComp key={`testimony-${position}`} {...testimonial}/>
                                            )
                                        })
                                    }
                                </>
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Testimonialscomp;