import React, { useState } from "react"

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
                <p className="grey lighten-2" style={{
                    borderRadius:2,marginBottom:4,
                }}>
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
                {
                    is_trial_price ? 
                    <a className="waves-effect waves-light btn z-depth-0 orange" href="/users/register" style={{width: "100%",}}>START YOUR TRIAL</a>
                    :
                    <a className="waves-effect waves-light btn z-depth-0 green" href="/users/register" style={{width: "100%",}}>SUBSCRIBE</a>
                }
              </div>
            </div>
          </div>
        </div>
    )
}
 
const PricingPage = () => {
    const [pricing_plans, setPricingPlans] = useState<IPricingPlan[]>([]);

    return (
        <div className="container">
            <div className="row center">
                <div className="col s12">
                    <h3><i className="mdi-content-send brown-text"></i></h3>
                    <h5 className="sub-names">Our Plans</h5>
                    <p className="sub-modal-texts"><b>ZOEZI</b> allows a learner to engage in interactive and grade-specific revision questions.</p>
                </div>

                {
                    pricing_plans.map((plan, position) => 
                        <PricingPlanComp key={`pricing_plan_${position}`} {...plan}/>
                    )
                }
            </div>    
        </div>
    )
}

export default PricingPage;