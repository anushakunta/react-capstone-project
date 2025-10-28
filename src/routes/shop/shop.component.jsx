//import SHOP_DATA from '../../shop-data.json';
import { useContext } from 'react';
import { CategoriesContext } from '../../context/categories.context';
import { Routes } from 'react-router-dom';
import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';
//import ProductCard from '../../components/product-card/product-card.component';
//import CategoryPreview from '../../components/category-preview/category-preview.component';


import './shop.styles.scss';
import { Route } from 'react-router-dom';

const Shop = () => {
  
  return (
    <Routes>
      <Route index element={ <CategoriesPreview/> } />
      <Route path=":category" element={ <Category/> } />
    </Routes>

    // <div className='shop-container'>
    //   {
    //       categoriesMap && Object.keys(categoriesMap).map((title) => {
    //         // <Fragment key={title}>
    //         //   <h2>{title}</h2>
    //         //   <div className='products-container'>
    //         //      {  categoriesMap[title].map((product) => (
    //         //       <ProductCard key={product.id} product={product}/>
    //         //     ))}
    //         //   </div>
    //         // </Fragment>
    //         const products  = categoriesMap[title]
    //         return <CategoryPreview key={title} title={title} prodcuts={products}/>
    // }) 
    //   }
    // </div>
  )
}

export default Shop;
