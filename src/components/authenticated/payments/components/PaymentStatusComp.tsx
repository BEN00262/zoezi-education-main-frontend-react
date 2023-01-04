export interface IPaymentStatusComp {
    status: boolean
    message: string
}

const PaymentStatusComp: React.FC<IPaymentStatusComp> = ({ status, message }) => {
    return (
        <div style={{
            marginTop: "40px"
        }}>
            <img  className="img-responsive" src={status ? '/img/check-mark.png' : '/img/failed.png'} alt="status display" height="150px"  width="150px" />
            <h6>{status ? "Payment successful!": "Payment failed!"}</h6>
            <p>{ status? "Opening grade...": message }</p>
        </div>
    )
}

export default PaymentStatusComp