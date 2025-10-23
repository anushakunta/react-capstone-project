import { createContext, useState } from "react";

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    // cartItems: [],
    // addItemToCart: () => {},
    // removeItemFromCart: () => {},
    // clearItemFromCart: () => {},
    // cartCount: 0,
    // cartTotal: 0,
});

export const CartProvider = ({ children }) => {
    const [ isCartOpen, setIsCartOpen ] = useState(false);
    // const [ cartItems, setCartItems ] = useState([]);
    // const [ cartCount, setCartCount ] = useState(0);
    // const [ cartTotal, setCartTotal ] = useState(0); 
    const value = { isCartOpen, setIsCartOpen
        // , cartItems, addItemToCart, removeItemFromCart, clearItemFromCart, cartCount, cartTotal 
    };  
    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}