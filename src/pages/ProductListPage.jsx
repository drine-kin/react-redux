import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setProducts } from '../state/reducers';
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';

const ProductListPage = () => {

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const products = useSelector((state) => state.products);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      
      const response = await fetch('https://dummyjson.com/products');

      const data = await response.json();

      dispatch(setProducts(data.products));

      setLoading(false);
    } catch (error) {
      console.error('Error fetching products', error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [])

  return (
    <>
      {
        loading ? <Loading /> : <div className="">
          <main className="mx-auto max-w-2xl px-4 py-14 lg:max-w-7xl lg:px-8">
            <h2 className="text-2xl text-themeColor2 py-4">All Products</h2>
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
              {products.map((product) => (
               <ProductCard key={product.id} product={product}/>
              ))}
            </div>
          </main>
        </div>
      }
    </>
  )
}

export default ProductListPage
