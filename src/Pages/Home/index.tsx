import Button from 'react-bootstrap/Button';
import styles from './index.module.scss'
import ProductCard from '../../Components/ProductCard';
import { useCart } from '../../Providers/CardProvider/Cart';
import { useEffect, useState } from 'react';
import { ItemInterface } from '../../Controller/CartController';
import { intentEnum } from '../../Utils/Constants';
const HomePage = () => {
    const { getItems, getCart, getCartTotal, placeOrder } = useCart()
    const [items, setItems] = useState<Array<ItemInterface>>([])
    const [cartItems, setCartItems] = useState<Array<ItemInterface>>([])

    useEffect(() => {
        const getAllItems = async () => {
            try {
                const data = await getItems()
                setItems(data)
            } catch (error) {
                console.log(error);
            }
        }
        getAllItems()
    }, [])
    const fetchCart = () => {
        setCartItems(getCart())
    }
    const captureOrder = async (intent: string) => {
        const { url, access_token, id } = await placeOrder(getCartTotal(), intent)
        console.log(url);

        if (url) {
            window.location.href = url;
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.productList}>
                    {items && items.length > 0 && items.map((item) =>
                        item.maxQuantity > 0 ? <ProductCard
                            imageUrl={item.imageUrl}
                            name={item.name}
                            description={item.description}
                            maxQuantity={item.maxQuantity}
                            price={item.price}
                            itemId={item.itemId}
                            key={item.itemId}
                            updateCart={fetchCart} /> : null
                    )}
                </div>
            </div>
            <div className={styles.cartContainer}>
                <div className={styles.cartTitle}>Your Cart
                    <hr></hr>
                </div>
                <div className={styles.cartItems}>
                    {cartItems && cartItems.length > 0 && cartItems.map((item) =>
                        <div key={`cart-${item.itemId}`} className={styles.cartCell}>
                            <span>{item.name}</span>
                            <span>${item.price}</span>
                            <span>{item.quantity}</span>
                        </div>
                    )}
                </div>
                <div className={styles.cartTotal}>
                    <div className={styles.bottomBox}>

                        <hr />
                        <div className={styles.cartCell}>
                            <span>Total:</span>
                            <span>${getCartTotal()}</span>
                        </div>
                        <div className={styles.checkoutButton}>
                            <Button disabled={cartItems.length <= 0} onClick={() => captureOrder(intentEnum.capture)}>Capture</Button>
                        </div>
                        <div className={styles.checkoutButton}>
                            <Button disabled={cartItems.length <= 0} onClick={() => captureOrder(intentEnum.authorize)}>Authorize</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
export default HomePage