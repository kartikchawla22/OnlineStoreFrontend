import { useEffect, useState } from "react"
import ProductCard from "../../Components/ProductCard"
import { useCart } from "../../Providers/CardProvider/Cart"
import styles from './index.module.scss'

const Orders = () => {
    const { getLastOrderDetails } = useCart()
    const [orderDetails, setOrderDetails] = useState<any>({})
    useEffect(() => {
        const getLastOrder = async () => {
            try {
                const orderDetailsResponse = await getLastOrderDetails()
                setOrderDetails(orderDetailsResponse[0])

            } catch (error) {
                console.log(error);

            }
        }
        getLastOrder()
    }, [])
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                {orderDetails && orderDetails.items ? (
                    <div>
                        <ProductCard
                            imageUrl={orderDetails.items[0].imageUrl}
                            name={orderDetails.items[0].name}
                            description={orderDetails.items[0].description}
                            maxQuantity={orderDetails.items[0].maxQuantity}
                            price={orderDetails.items[0].price}
                            itemId={orderDetails.items[0].itemId}
                            key={orderDetails.items[0].itemId}
                            showQuantitySelector={false}
                            updateCart={() => { }} />
                        <div>Total Quantity: {orderDetails.items[0].quantity}</div>

                    </div>
                ) : (<></>)}

            </div>
        </div>
    )
}

export default Orders