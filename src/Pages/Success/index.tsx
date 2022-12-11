import styles from './index.module.scss'
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from '../../Providers/CardProvider/Cart';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { intentEnum } from '../../Utils/Constants';

const SuccessPage = ({ navigation }: any) => {
    const navigate = useNavigate();
    const search = useLocation().search;
    const { getOrderDetailsUsingToken, paymentSuccess } = useCart()
    const [orderDetails, setOrderDetails] = useState<any>({})
    const [paymentDetails, setPaymentDetails] = useState<any>({})
    const paymentId = new URLSearchParams(search).get('paymentId') || "";
    const token = new URLSearchParams(search).get('token') || "";
    const PayerID = new URLSearchParams(search).get('PayerID') || "";
    useEffect(() => {
        const getOrderDetails = async () => {
            const order = await getOrderDetailsUsingToken(token)
            setOrderDetails(order)
        }
        getOrderDetails()

    }, [])
    useEffect(() => {
        const getPaymentSuccess = async () => {
            try {
                if (orderDetails && Object.keys(orderDetails).length > 0) {
                    const payment = await paymentSuccess(PayerID, paymentId, orderDetails.total, token)
                    setPaymentDetails(payment)
                }
            } catch (error) {
                console.log(error);
                if (error) {

                    navigate("/");
                }
            }
        }
        getPaymentSuccess()
    }, [orderDetails])
    return (
        paymentDetails && paymentDetails.id && (
            <div className={styles.container}>
                <div className={styles.content}>
                    {(paymentDetails.intent === intentEnum.capture ? (
                        <>
                            <div>
                                Your Order is succesfull
                            </div>
                            <div>
                                Your Transaction ID is: {paymentDetails.id}
                            </div>
                        </>
                    ) : (
                        <>
                            <div>
                                Your Order is has been Authorized
                            </div>
                            <div>
                                Your Authorization ID is: {paymentDetails.id}
                            </div>
                        </>
                    ))}
                    <Link className={styles.link} to={"/"} >
                        <Button className={styles.homeButton}>Click here to go back to home</Button>
                    </Link>
                </div>
            </div>
        )
    )
}
export default SuccessPage