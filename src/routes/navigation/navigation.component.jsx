import { Outlet, Link } from "react-router-dom";
import { Fragment, useContext } from "react";
import {ReactComponent as CrwnLogo} from '../../assests/crown.svg'
import './navigation.styles'
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";  
import { UserContext } from "../../context/user.context";
import { CartContext } from "../../context/cart.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import { NavigationContainer, LogoContainer, NavLink,NavLinks } from "./navigation.styles";

const Navigation = () =>{
  const {currentUser} = useContext(UserContext);
  const {isCartOpen} = useContext(CartContext);
  console.log("current user in navigation ", currentUser);

  // const signOutHandler = async()=>{
  //   await signOutUser();
  //   //setCurrentUser(null);
  // }

  return(
    <Fragment>
      <NavigationContainer>
          <LogoContainer to="/">
              <CrwnLogo className="logo"/>
          </LogoContainer>
        <NavLinks>
          <NavLink to={'/shop'} >SHOP</NavLink>
          {
            currentUser ? (< NavLink as='span' onClick={signOutUser}>SIGN OUT</NavLink>) : (<NavLink  to={'/auth'} >SIGN IN</NavLink>)
          }
          <CartIcon/>
          
        </NavLinks>
        { isCartOpen && <CartDropdown/> }
      </NavigationContainer>
      <Outlet/>
    </Fragment>
  )
  }

export default Navigation;