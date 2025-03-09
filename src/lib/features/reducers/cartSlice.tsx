"use client"
import { CartProp } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { CartProp } from "../../types";
import toast from "react-hot-toast";

const initialState: CartProp[] = JSON.parse(window.localStorage.getItem("yarnie__cart")!) as unknown as CartProp[] || []

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
                toast.error(`This item has already been added to cart.`, { id: "123" })
            }
            else {
                state.unshift(action.payload)
                toast.success(`${action.payload.name} added to cart`, { id: "123" })
                window.localStorage.setItem("yarnie__cart", JSON.stringify(state))
            }
        },
        /**
         * changeInCart reducer handles the modification and updating of a cart item property. It takes two compulsory arguments
         * @param state {CartProp}
         * @param action Get the payload property on this action to get the actual cart item. 
         * The payload is the new cart item properties that is being modified (might not be all the properties, hence, the use of the spread operator syntax to replace only matching properties)
         */
        changeInCart(state, action: PayloadAction<Pick<CartProp, "id" | "qty">>) {
            state.forEach((el, i) => {
                if (el.id === action.payload.id) {
                    state[i] = { ...state[i], qty: action.payload.qty }
                }
            })
            window.localStorage.setItem("yarnie__cart", JSON.stringify(state))
        },
        /**
         * This reducer empties the cart item selected (to indicate checkout)
         * @param state {CartProps[]}
        */
       emptyCart(state) {
           state.splice(0)
           toast.success(`Checkout Successfully acknowledged. We will get back to you as soon as we can`, { id: `123${state.length}`, })
           console.log('state', state)
           window.localStorage.setItem("yarnie__cart", JSON.stringify(state))
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
            window.localStorage.setItem("yarnie__cart", JSON.stringify(state))
        },
    }
})

export const { addToCart, changeInCart, emptyCart, removeFromCart } = cartSlice.actions
export default cartSlice.reducer