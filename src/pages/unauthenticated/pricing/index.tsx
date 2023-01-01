import React, { useState } from "react"
import { useQuery } from "react-query";

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import { get_pricings } from "./api"
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

interface IPricingPlan {
    defaultPrice: boolean
    pricingType: string
    price: number
    features: string[]
}

const PricingPlanComp: React.FC<IPricingPlan> = (price) => {
    const is_trial_price = React.useMemo(() => {
        return price.pricingType.toLowerCase().includes("trial")
    }, [price]);

    return (
        <div className="col s12 m6 l3">
          <div className="card hoverable z-depth-1 darken-1" style={{
            border: "1px solid #dcdee2",
          }}>
            <div className="card-content black-text">
              {
                price.defaultPrice ? 
                <p className="grey lighten-2" style={{  borderRadius:2,marginBottom:4 }}>
                    MOST POPULAR
                </p> : null
              }
              <span className="card-title center sub-names"><b>{price.pricingType.toUpperCase()}</b></span>
              <div className="center">
                {
                    is_trial_price ?
                    <h5 className="sub-modal-texts"><b>FREE</b></h5>
                    :
                    <h5 className="sub-names"><span className="sub-modal-texts">Ksh.</span><b>{price.price}</b></h5>
                }
                <h6 className="sub-names"><u>Features</u></h6>

                {/* <!-- fetch the features from the db --> */}
                <ul  className="descriptions sub-modal-texts">
                    {
                        price.features.map((feature, position) => {
                            return <li key={`feature_${position}`}>{feature}</li>
                        })
                    }
                </ul>
              </div>

              <div className="center">
                <Link className={`waves-effect waves-light btn z-depth-0 ${is_trial_price ? "orange" : "green"}`} to="/signup" style={{width: "100%",}}>{is_trial_price ? "START YOUR TRIAL" : "SUBSCRIBE"}</Link>
              </div>
            </div>
          </div>
        </div>
    )
}

// shown while we are waiting for data from the backend
const PricingPlanSkeletonComp = () => {
    return (
        <div className="col s12 m6 l3">
          <div className="card hoverable z-depth-1 darken-1" style={{
            border: "1px solid #dcdee2",
          }}>
            <div className="card-content black-text">
              <Skeleton  />
              <div className="center">
                <Skeleton  width={120}/>
                <h6 className="sub-names"><u><Skeleton inline width={150}/></u></h6>

                <ul  className="sub-modal-texts">
                    {
                        (new Array(4).fill(1)).map((feature, position) => {
                            return <li key={`feature_${position}`}><Skeleton inline width={200}/></li>
                        })
                    }
                </ul>
              </div>

              <div className="center">
                <Skeleton height={35}/>
              </div>
            </div>
          </div>
        </div>
    )
}
 
const PricingPage = () => {
    // fetch the prices
    const { data: pricing_plans, isLoading } = useQuery<IPricingPlan[]>('pricings', get_pricings, {
        cacheTime: 1200000 // 2 mins
    });

    // TODO: incase of an error we also need to show the error

    return (
        <div className="container">
            <Helmet>
                <title>Zoezi | Pricing</title>
            </Helmet>
            <div className="row center">
                <div className="col s12">
                    <h3><i className="mdi-content-send brown-text"></i></h3>
                    <h5 className="sub-names">Our Plans</h5>
                    <p className="sub-modal-texts"><b>ZOEZI</b> allows a learner to engage in interactive and grade-specific revision questions.</p>
                </div>

                {
                    isLoading ? 
                    <>
                        {
                            (new Array(4).fill(1)).map((feature, position) => {
                                return <PricingPlanSkeletonComp key={`skeleton_${position}`}/>
                            })
                        }
                    </>
                    :
                    <>
                        {
                            pricing_plans?.map((plan, position) => 
                                <PricingPlanComp key={`pricing_plan_${position}`} {...plan}/>
                            )
                        }
                    </>
                }
            </div>    
        </div>
    )
}

export default PricingPage;