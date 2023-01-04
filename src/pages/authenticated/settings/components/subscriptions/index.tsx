import { useState } from "react"
import { IStudent } from "../../types"

interface ISubscription {
    isExpired: boolean
    daysRemaining: number
    gradeName: string
}

const SubscriptionComp: React.FC<ISubscription> = (subscription) => {
    return (
        <div className="col s12 m6">
            <div className="hoverable" style={{
                border: "1px solid #d3d3d3",marginBottom:5,padding:5,borderRadius:2,
            }}>
                <span
                    className="sub-modal-texts" 
                    style={{
                        backgroundColor: subscription.isExpired ? "rgba(255,0,0,0.3)" : "rgba(0,255,0,0.3)", 
                        border: `1px solid ${subscription.isExpired ? 'red' : 'green'}`,
                        borderRadius:10,paddingLeft:10,paddingRight:10,
                    }}
                >
                {subscription.isExpired ? 'Expired' : 'Active'}
                </span>
                <br/>

                <div style={{
                    display: "flex",flexDirection: "row",justifyContent: "center",alignItems: "center",
                }}>
                    <img className="img-box-responsive" style={{ height:80 }} src={`img/${subscription.gradeName.toLowerCase()}.png`}/>
                </div>
                <br/>
                <span className="sub-modal-texts">
                    {subscription.isExpired ? 'Expired ' : 'Expires in '} {subscription.daysRemaining}
                </span>
            </div>
        </div>
    )
}

const SubscriptionsComp = () => {
    const [subscriptions, setSubscriptions] = useState<ISubscription[]>([]);

    return (
        <div className="row">
            <div className="section">
               {
                    subscriptions.map((subscription, index) => 
                        <SubscriptionComp {...subscription} key={`subscription_${index}`}/>
                    )
               }
            </div>
        </div>
    );
}

export default SubscriptionsComp;