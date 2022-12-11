import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { useCart } from '../../Providers/CardProvider/Cart';
import QuantitySelector from '../QuantitySelector';
import styles from './index.module.scss';

interface ProductCardProps {
    imageUrl: string;
    name: string;
    description: string;
    maxQuantity: number;
    price: number;
    itemId: number;
    updateCart?: () => void,
    showQuantitySelector?: boolean
}

const ProductCard = ({
    imageUrl,
    name,
    description,
    maxQuantity,
    price,
    itemId,
    updateCart,
    showQuantitySelector = true
}: ProductCardProps) => {
    const [quantity, setQuantity] = useState<number>(0)
    const { addToCart, removeFromCart } = useCart()
    useEffect(() => {
        if (quantity === 0) {
            removeFromCart({
                imageUrl,
                name,
                description,
                maxQuantity,
                price,
                itemId,
                quantity: quantity
            })
        } else {
            addToCart({
                imageUrl,
                name,
                description,
                maxQuantity,
                price,
                itemId,
                quantity: quantity
            })
        }
        updateCart!()
    }, [quantity])
    return (
        <div className={styles.container} >
            <Card className={styles.productCard}>
                <div className={styles.cardImageContainer}>
                    <Card.Img className={styles.cardImage} variant="top" src={imageUrl ? imageUrl : "noImage.jpeg"} alt={"No Image"} />
                </div>
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>
                        {description}
                    </Card.Text>
                    <Card.Title>${price}</Card.Title>
                    {showQuantitySelector ? (<QuantitySelector maxQuantity={maxQuantity} changeQuantity={setQuantity} />) : (<></>)}
                </Card.Body>
            </Card >
        </div >
    )
}
export default ProductCard