import { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import styles from './index.module.scss'

interface QuantitySelectorProps {
    maxQuantity: number;
    changeQuantity: any
}
const QuantitySelector = (props: QuantitySelectorProps) => {
    const { maxQuantity = 10, changeQuantity } = props
    const [quantity, setQuantity] = useState<number>(0)

    const decreaseQuantity = (): void => {
        setQuantity(quantity - 1)
    }
    const increaseQuantity = (): void => {
        setQuantity(quantity + 1)
    }
    useEffect(() => {
        changeQuantity(quantity)
    }, [quantity])
    return (
        <div className={styles.container}>
            <Form className={styles.formContent}>
                <Button disabled={quantity <= 0} onClick={decreaseQuantity}>-</Button>
                <Form.Group>
                    <Form.Control type="number" value={quantity} disabled />
                </Form.Group>
                <Button disabled={quantity >= maxQuantity} onClick={increaseQuantity}>+</Button>
            </Form>
        </div >
    )

}
export default QuantitySelector