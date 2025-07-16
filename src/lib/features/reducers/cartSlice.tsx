"use client"
import { CartProp } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { notification } from "antd";
// import { CartProp } from "../../types";
// const initialState: CartProp[] = JSON.parse(window.localStorage.getItem("yarnie__cart")!) as unknown as CartProp[] || []
const initialState: CartProp[] =  []

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        /**
        * addToCart reducer handles the creation of a new cart item. It takes one argument which must be the new cart item to be added to the cart item array
        * @param state {CartProp[]} - This is the array of all carts
        * @param action {CartProp} - This is the new cart item object to be added to the carts array
        */
        addToCart(state, action: PayloadAction<CartProp>) {
            const findCart = state.find(el => el.id === action.payload.id)
            if (findCart) {
                notification.error({message: `This item has already been added to cart.`, key: "123", showProgress: true })
            }
            else {
                state.unshift(action.payload)
                notification.success({message: `${action.payload.name} added to cart`, key: "123", showProgress: true })
                // window.localStorage.setItem("yarnie__cart", JSON.stringify(state))
            }
        },
        /**
         * changeInCart reducer handles the modification and updating of a cart item property. It takes two compulsory arguments
         * @param state {CartProp}
         * @param action Get the payload property on this action to get the actual cart item. 
         * The payload is the new cart item properties that is being modified (might not be all the properties, hence, the use of the spread operator syntax to replace only matching properties)
         */
        changeInCart(state, action: PayloadAction<Pick<CartProp, "id" | "quantity">>) {
            console.log({ quantity: action.payload.quantity, action})
            if (action.payload.quantity === 0) {
                state.forEach((el, i) => {
                    if (el.id === action.payload.id) {
                        state.splice(i, 1)
                    }
                })
                notification.error({message: `Item removed from cart`, key: `123`, showProgress: true })
            }
            else {
                state.forEach((el, i) => {
                    if (el.id === action.payload.id) {
                        state[i].quantity = action.payload.quantity
                    }
                })
            }
            // window.localStorage.setItem("yarnie__cart", JSON.stringify(state))
        },
        /**
         * This reducer empties the cart item selected (to indicate checkout)
         * @param state {CartProps[]}
        */
       emptyCart(state) {
           state.splice(0)
           notification.success({message: `Checkout Successfully acknowledged. We will get back to you as soon as we can`, key: `123`, showProgress: true })
        //    console.log('state', state)
        //    window.localStorage.setItem("yarnie__cart", JSON.stringify(state))
        },
        /**
         * This reducer deletes the cart item selected (whose CartId is passed to the function)
         * @param state {CartProps[]}
         * @param action - The payload property on this action should hold the id of the cart item to delete 
         */
        removeFromCart(state, action: PayloadAction<string>) {
            state.forEach((el, i) => {
                if (el.id === action.payload) {
                    state.splice(i, 1)
                }
            })
            // window.localStorage.setItem("yarnie__cart", JSON.stringify(state))
        },
    }
})

export const { addToCart, changeInCart, emptyCart, removeFromCart } = cartSlice.actions
export default cartSlice.reducer