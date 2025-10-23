import './product-card.styles.scss';
import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component';
import { useContext } from 'react';
import { ProductsContext } from '../../context/products.context';
import { UserContext } from '../../context/user.context';   

const ProductCard = ({product}) => {
    const {name,price,imageUrl} = product;
    // const {addItemToCart} = useContext(ProductsContext);
    // const {currentUser} = useContext(UserContext);
    // const handleClick = () => {
    //     if(currentUser){
    //         addItemToCart(product); 
    //     } else {
    //         alert("Please sign in to add items to your cart");
    //     }
    // }

  return (
    <div className='product-card-container'>
        <img src={imageUrl} alt={`${name}`} />
        <div className='footer'>
            <span className='name'>{name}</span>
            <span className='price'>{price}</span>
        </div>
        <Button buttonType='inverted'>Add to Cart</Button>
    </div>
  )
}
export default ProductCard;