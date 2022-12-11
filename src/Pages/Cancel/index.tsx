import styles from './index.module.scss'
import { useLocation } from "react-router-dom";
import { useCart } from '../../Providers/CardProvider/Cart';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from "react-router-dom";

const CancelPage = () => {
    const search = useLocation().search;
    const token = new URLSearchParams(search).get('token') || "";

    return (
        token ? (<div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.heading}>
                    <div>
                        There was some error in your payment
                    </div>
                    <div>
                        Your Token for this transaction is: {token}
                    </div>
                    <Link className={styles.link} to={"/"} >
                        <Button className={styles.homeButton}>Click here to go back to home</Button>
                    </Link>
                </div>
            </div>
        </div>) : <></>
    )
}
export default CancelPage