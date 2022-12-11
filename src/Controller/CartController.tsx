import axios from 'axios';
export interface ItemInterface {
    imageUrl: string;
    name: string;
    description: string;
    maxQuantity: number;
    price: number;
    itemId: number;
    quantity?: number;
}

const headers = {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
}
export class CartController {
    items: Array<ItemInterface> = []
    private _cart: Array<ItemInterface> = []
    getItems = async (): Promise<ItemInterface[]> => {
        const response = await axios.get('item/getItems')
        const { data } = response;
        return data.data
    }

    getCart = () => this._cart

    addToCart = (item: ItemInterface) => {
        if (this._cart.find((cartItem) => cartItem.itemId === item.itemId)) {
            this._cart = this._cart.map((cartItem) => cartItem.itemId === item.itemId ? { ...cartItem, quantity: item.quantity } : cartItem)
        } else {
            this._cart = this._cart.concat(item)
        }

    }
    removeFromCart = (item: ItemInterface) => {
        this._cart = this._cart.filter((cartItem) => cartItem.itemId !== item.itemId)
    }
    getCartTotal = (): number => {
        return this._cart.reduce((acc: any, key) => {
            acc = acc + (key.quantity! * key.price)
            return acc;
        }, 0)
    }
    placeOrder = async (total: number, intent: string): Promise<any> => {
        const response = await axios.post("item/placeOrder", { data: this._cart, total: total, intent: intent }, {
            headers: headers
        })
        const { data } = response;
        return data.data
    }
    getOrderDetailsUsingToken = async (token: string): Promise<any> => {
        const response = await axios.post("item/getOrderDetailsUsingToken", { token: token }, {
            headers: headers
        })
        const { data } = response;
        return data.data
    }
    paymentSuccess = async (payerId: string, paymentId: string, total: number, token: string): Promise<any> => {
        const response = await axios.post("item/paymentSuccess", { token }, {
            headers: headers
        })
        const { data } = response;
        return data.data
    }
    getLastOrderDetails = async (): Promise<any> => {
        const response = await axios.get("item/getLastOrderDetails", {
            headers: headers
        })
        const { data } = response;
        return data.data
    }
}