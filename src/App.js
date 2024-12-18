import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CategoriesPage from './pages/CategoriesPage';
import CategoryProductsPage from './pages/CategoryProductsPage';
import NotFoundPage from './pages/NotFoundPage';
import ProductPage from './pages/ProductPage';
import AllProductsPage from './pages/AllProductsPage';
import DiscountedProductsPage from './pages/DiscountedProductsPage';

const App = () => (
  <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/categories" element={<CategoriesPage/>}/>
      <Route path="/categories/:categoryId" element={<CategoryProductsPage/>}/>
      <Route path="/products/:productId" element={<ProductPage/>} />
      <Route path="/products" element={<AllProductsPage/>} />
      <Route path="/sales" element={<DiscountedProductsPage/>} />
      <Route path="*" element={<NotFoundPage/>}/>
    </Routes>
    <Footer/>
  </BrowserRouter>
);

export default App;