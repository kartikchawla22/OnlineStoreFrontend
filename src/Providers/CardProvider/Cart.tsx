import React, { useContext } from "react"
import { CartController, ItemInterface } from "../../Controller/CartController"


interface CartInterface {
    getItems(): Promise<ItemInterface[]>;
    addToCart(item: ItemInterface): void;
    removeFromCart(item: ItemInterface): void;
    getCart(): ItemInterface[];
    getCartTotal(): number;
    placeOrder(total: number, intent: string): Promise<any>;
    getOrderDetailsUsingToken(token: string): Promise<any>;
    paymentSuccess(payerId: string, paymentId: string, total: number, token: string): Promise<any>;
    getLastOrderDetails(): Promise<any>;
}

const CartContext = React.createContext<CartInterface>({
    getItems: () => ({} as Promise<ItemInterface[]>),
    addToCart: (item: ItemInterface) => ({} as any),
    removeFromCart: (item: ItemInterface) => ({} as any),
    getCart: () => ([] as ItemInterface[]),
    getCartTotal: () => (0 as number),
    placeOrder: (total: number, intent: string) => ({} as Promise<any>),
    getOrderDetailsUsingToken: (token: string) => ({} as Promise<any>),
    paymentSuccess: (payerId: string, paymentId: string, total: number, token: string) => ({} as Promise<any>),
    getLastOrderDetails: () => ({} as Promise<any>)

})

export const useCart = (): CartInterface => {
    return useContext(CartContext)
}

const CartProvider = ({ children }: any) => {
    const cartController = new CartController()
    return (
        <CartContext.Provider value={cartController}>
            {children}
        </CartContext.Provider>
    )
}
export default CartProvider



