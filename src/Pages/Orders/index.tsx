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
                    orderDetails.items.map((item: any, index: number) =>
                    (
                        <div key={index}>
                            <ProductCard
                                imageUrl={item.imageUrl}
                                name={item.name}
                                description={item.description}
                                maxQuantity={item.maxQuantity}
                                price={item.price}
                                itemId={item.itemId}
                                key={item.itemId}
                                showQuantitySelector={false}
                                updateCart={() => { }}
                            />
                            <div className={styles.quantity}>Total Quantity: {item.quantity}</div>
                        </div>)
                    )

                ) : (<></>)}

            </div>

            {orderDetails && orderDetails.payer && orderDetails.payer.address ? (
                <div className={styles.payerDetailsContainer}>
                    <h3>Payer Details</h3>
                    <div className={styles.payerDetails}>
                        <div className={styles.kvp}>
                            <span>
                                name:
                            </span>
                            <span>
                                {orderDetails.payer.address.name.full_name}
                            </span>
                        </div>

                        <div className={styles.kvp}>
                            <span>
                                Address:
                            </span>
                            <span>
                                {orderDetails.payer.address.address.address_line_1}
                            </span>
                        </div>
                        <div className={styles.kvp}>
                            <span>
                                Provine:
                            </span>
                            <span>
                                {orderDetails.payer.address.address.admin_area_1}
                            </span>
                        </div>
                        <div className={styles.kvp}>
                            <span>
                                city:
                            </span>
                            <span>
                                {orderDetails.payer.address.address.admin_area_2}
                            </span>
                        </div>
                        <div className={styles.kvp}>
                            <span>
                                Country Code:
                            </span>
                            <span>
                                {orderDetails.payer.address.address.country_code}
                            </span>
                        </div>
                        <div className={styles.kvp}>
                            <span>
                                Postal Code:
                            </span>
                            <span>
                                {orderDetails.payer.address.address.postal_code}
                            </span>
                        </div>
                    </div>
                </div>
            ) : (<></>)}
        </div>
    )
}

export default Orders