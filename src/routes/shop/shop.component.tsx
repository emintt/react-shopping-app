
import { Route, Routes } from 'react-router-dom';
import './shop.styles.scss';
import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';

const Shop = () => {

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      {/* category: variable that we pass to and can access from a component */}
      <Route path=':category' element={<Category />} />
    </Routes>

  );
};

export default Shop;
