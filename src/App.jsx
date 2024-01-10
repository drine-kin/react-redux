import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css'
import './App.css'
import ProductListPage from './pages/ProductListPage';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />} >
            <Route index element={<ProductListPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/product-detail/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<PrivateRoute>
              <CartPage />
            </PrivateRoute>} />
          </Route>
        </Routes>
      </BrowserRouter>
  )
}

export default App