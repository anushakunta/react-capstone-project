import { Fragment, useContext } from 'react';
import { CategoriesContext } from '../../context/categories.context';
import CategoryPreview from '../../components/category-preview/category-preview.component';


const CategoriesPreview = () => {
    const { categoriesMap } = useContext(CategoriesContext);
  return (
    <Fragment>
      {
        categoriesMap && Object.keys(categoriesMap).map((title) => {
            const products  = categoriesMap[title]
            return <CategoryPreview key={title} title={title} prodcuts={products}/>
        }) 
      }
    </Fragment>
  )
}

export default CategoriesPreview;
