import axios from "axios";
import { useParams } from "react-router-dom";

export interface IPricingItem {
    _id: string
    defaultPrice: boolean
    pricingType: string
    price: number
    features: string[]
}

interface IPricingCardComp {
    pricingItem: IPricingItem
    bitmapSetFunction: (index: number) => void
    initialBitmap: boolean
    itemIndex: number
    isProcessing: boolean
    setResponse: (value: string) => void
}


// pass these through 
const PricingCardComp: React.FC<IPricingCardComp> = ({ 
    pricingItem, isProcessing,bitmapSetFunction, initialBitmap, itemIndex, setResponse
}) => {

    const { gradeID, is_special_grade, gradeName } = useParams();

    const makePayment = (pricingType: string, pricingID: string, gradeID: string, isSpecial: boolean) => {
        bitmapSetFunction(itemIndex); // set the bitmaps before we even send the request --> gives the good UI
        axios.post(`/subscribe`, {
            pricingType, pricingID, gradeID, gradeName, isSpecial
        })
            .then(({ data }: { data: { status: boolean, message: string }}) => {
                if (!data.status) {
                   setResponse(data.message); 
                   return
                }
            })
    }

    // userID, socketIO id
    return (
        <div className="col s12 m6 l3">
            <div className="card hoverable z-depth-1 darken-1" style={{border:`1px solid ${(initialBitmap && isProcessing) ? "#ff0000": "#dcdee2"}`}}>
            <div className="card-content black-text">

                {pricingItem.defaultPrice ?
                <p className="orange accent-2" style={{borderRadius: "2px",marginBottom: "4px"}}>
                    MOST POPULAR
                </p> : null }

                <span className="card-title center sub-names"><b>{pricingItem.pricingType.toUpperCase()}</b></span>
                <div className="center">

                    <h5 className="sub-names"><span className="sub-modal-texts">Ksh.</span><b>{pricingItem.price}</b></h5>
                <h6 className="sub-names"><u>Features</u></h6>


                <ul  className="descriptions sub-modal-texts">
                    {
                        pricingItem.features.map((feature, featureIndex) => <li key={`feature_${featureIndex}`}>{feature}</li>)
                    }
                </ul>
                </div>

                <div className="center">
                    <button 
                        
                        onClick={
                            _ => {
                                makePayment(
                                    pricingItem.pricingType,
                                    pricingItem._id,
                                    gradeID ?? "",
                                    !!is_special_grade 
                                )
                            }
                        }

                        // true true
                        disabled={initialBitmap || isProcessing}
                        className="waves-effect waves-light btn z-depth-0 teal" style={{width:"100%"}}>{initialBitmap ? "processing...": "subscribe"}</button>
                </div>
            </div>
            </div>
        </div>
    )
}

export default PricingCardComp