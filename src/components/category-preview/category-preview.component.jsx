import {CategoryPreviewContainer,Preview,Title} from './category-preview.styles';
import ProductCard from '../product-card/product-card.component';
import { Link } from 'react-router-dom';

const CategoryPreview = ({title, prodcuts}) => {
    return (
        <CategoryPreviewContainer>
            <h2>
                <Title to={title}>{title.toUpperCase()}</Title>
            </h2>
            <Preview>
                {
                    prodcuts.filter((_,idx) => idx < 4).map((product) => 
                        <ProductCard key={product.id} product={product}/>
                    )
                }
            </Preview>
        </CategoryPreviewContainer>
    )
}
export default CategoryPreview;