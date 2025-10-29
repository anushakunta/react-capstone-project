import { createContext,  useEffect, useReducer, useState } from "react";
import {createAction} from '../utils/reducer/reducer.utils'

const addCartItem = (cartItems, productToAdd) => {
    //find if cartItems contains productToAdd
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);

    //if found, increment quantity
    if(existingCartItem){
        return cartItems.map((cartItem) => 
            cartItem.id === productToAdd.id 
            ? {...cartItem, quantity: cartItem.quantity + 1}
            : cartItem
        );
    }
    //return new array with modified cartItems/ new cart item
    return [...cartItems, {...productToAdd, quantity: 1}];
}

const removeItemCart = (cartItems, cartToRemove) => {
    //find if cartItems contains productToRemove
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartToRemove.id);
    if(existingCartItem.quantity === 1){
        return cartItems.filter(cartItem => cartItem.id !== cartToRemove.id);
    }
    return cartItems.map((cartItem) => 
        cartItem.id === cartToRemove.id 
        ? {...cartItem, quantity: cartItem.quantity - 1}
        : cartItem
    );
}

const clearCartItmem = (cartItems, cartItemToClear) => cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);


export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemToCart: () => {},
    clearItemFromCart: () => {},
    cartCount: 0,
    cartTotal:0
});

const CART_ACTION_TYPES = {
    SET_IS_CART_OPEN:'SET_IS_CART_OPEN',
    SET_CART_ITEMS:'SET_CART_ITEMS'
}

const INITIAL_STATE = {
    isCartOpen:false,
    cartItems: [],
    cartTotal: 0,
    cartCount: 0,
}

const cartReducer = (state,action) =>{
    const {type, payload} = action;

    switch(type){
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return{
                ...state,
                ...payload
            }
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return{
                ...state,
                isCartOpen:payload
            }
        default:
            throw new Error(`unahandled type of ${type} in cartReducer`)
    }
}

export const CartProvider = ({ children }) => {
    const [{cartItems,cartTotal,isCartOpen,cartCount}, dispatch] = useReducer(cartReducer,INITIAL_STATE)
    // const [ isCartOpen, setIsCartOpen ] = useState(false);
    // const [ cartItems, setCartItems ] = useState([]);
    // const [ cartTotal, setCartTotal ] = useState(0); 
    // const [cartCount, setCartCount ] = useState(0);

    // useEffect(() => {
    //     const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
    //     setCartCount(newCartCount);
    //     console.log("cart count updated ", cartCount);
    // }, [cartItems]); 

    // useEffect(() => {
    //     const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
    //     setCartTotal(newCartTotal);
    // }, [cartItems]);


    const updateCartItemsReducer = (newCartItems) => {
        const newCartCount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);

        const newCartTotal = newCartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);

        dispatch(
            createAction(CART_ACTION_TYPES.SET_CART_ITEMS,
                { cartItems: newCartItems, 
                  cartTotal: newCartTotal, 
                  cartCount: newCartCount }
            ))
    }

    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd)
        updateCartItemsReducer(newCartItems);
    }
    const removeItemToCart  = (cartToRemove) => {
        const newCartItems = removeItemCart(cartItems, cartToRemove)
        updateCartItemsReducer(newCartItems);
    }

    const clearItemFromCart = (cartItemToClear) => { 
        const newCartItems = clearCartItmem(cartItems, cartItemToClear)
        updateCartItemsReducer(newCartItems);
    }

    const setIsCartOpen = (bool) =>{
        dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN,{bool}));
    }

    const value = { 
        isCartOpen, 
        setIsCartOpen, 
        cartItems, 
        addItemToCart, 
        cartCount, 
        removeItemToCart,
        clearItemFromCart, 
        cartTotal 
    };  
    
    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}