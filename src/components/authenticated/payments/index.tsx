import { useContext, useEffect, useState } from "react"
import PricingCardComp, { IPricingItem } from "./components/PricingCardComp";
import GlobalContextComp, { GlobalContext } from "./context/GlobalContext";
import PaymentStatusComp from "./components/PaymentStatusComp";
import { useQuery } from "react-query";
import { get_pricing_plans } from "./api";
import { useParams } from "react-router-dom";

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


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
    const { message } = useContext(GlobalContext);
    const { gradeID, is_special_grade } = useParams()

    const [pricingList, setPricingList] = useState<IPricingItem[]>([]);

    const [isSuccessful, setIsSuccessful] = useState(false);
    const [response, setResponse] = useState<string>("");

    // bitmaps
    const [pricingItemBitmap, setPricingItemBitmap] = useState<boolean[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);


    const { isLoading } = useQuery<{ prices: IPricingItem[] }>('subscription_payments', get_pricing_plans, {
        staleTime: 960000,
        
        onSuccess(data) {
            setPricingList(data?.prices?.filter(x => x.pricingType.toLowerCase() !== "trial"));
            setPricingItemBitmap(data?.prices?.map(_ => false));
        },
    });

    useEffect(() => {
        if (pricingItemBitmap.length > 0) {
            setIsProcessing(pricingItemBitmap.some(unit => unit));
        }
    }, [pricingItemBitmap]);

    useEffect(() => {
        switch(message.type.toLowerCase()) {
            case "payment":
                {
                    setIsSuccessful(message.response.status);
                    setResponse(message.response.message);
                }
        }

    }, [message]);


    useEffect(() => {
        if (response && isSuccessful) {
            let timeout = setTimeout(() => {
                window.location.href = (is_special_grade ? "/special/":"/subjects/") + gradeID
            }, 1000);

            return () => { clearTimeout(timeout); }
        } else if (response && !isSuccessful) {
            let timeout = setTimeout(() => {
                window.location.href = "/dashboard"
            });

            return () => { clearTimeout(timeout); }
        }
    }, [response]);

    return (
        <GlobalContextComp>
            <div className="container">
                <div className="row center">

                    {response ?
                        <>
                            <PaymentStatusComp message={response} status={isSuccessful}/>
                        </>
                        :
                        <>
                            <div className="col s12">
                                <h3><i className="mdi-content-send brown-text"></i></h3>
                                <h5 className="sub-names">Choose Plan</h5>
                            </div>

                            {/* pricing list */}
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
                                    {pricingList.map((pricingItem, pricingIndex) => {
                                        return <PricingCardComp 
                                            isProcessing={isProcessing}
                                            itemIndex={pricingIndex} 
                                            bitmapSetFunction={(index) => {
                                                let local_bitmap_copy = [...pricingItemBitmap]
                                                local_bitmap_copy[index] = true;
                                                setPricingItemBitmap(local_bitmap_copy);
                                            }}
                                            setResponse={setResponse} 
                                            initialBitmap={pricingItemBitmap[pricingIndex]} 
                                            pricingItem={pricingItem} key={`pricing_${pricingIndex}`}
                                        />
                                    })}
                                </>
                            }
                        </>
                    }
                </div>
            </div>
        </GlobalContextComp>
    )
}

export default PricingPage