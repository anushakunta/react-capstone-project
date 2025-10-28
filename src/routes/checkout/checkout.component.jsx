import {CheckoutContainer,CheckoutHeader,Total,HeaderBlock} from './checkout.styles';
import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';

import CheckoutItem from '../../components/checkout-item/checkout-item.component';


const Checkout = () => {
    const {cartItems, addItemToCart, removeItemToCart, removeItemFromCart,cartTotal} = useContext(CartContext);
    return( 
        <CheckoutContainer>
            <CheckoutHeader>
                <HeaderBlock>
                    <span>Product</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Description</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Quantity</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Price</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Remove</span>
                </HeaderBlock>
            </CheckoutHeader>
            {
                cartItems.map((cartItem) => (
                    <CheckoutItem key={cartItem.id} cartItem={cartItem}/>  
                ))           
            }
            <Total>Total: ${cartTotal}</Total>
        </CheckoutContainer>
    )
}
export default Checkout;