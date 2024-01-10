import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../components/Loading';
import Rating from '../components/Rating';
import Quantity from '../components/Quantity';
import { useSelector } from 'react-redux';

const ProductDetailPage = () => {

  const { id } = useParams();

  const [loading, setLoading] = useState(false);

  const [product, setProduct] = useState(null);

  const [currentImage, setCurrentImage] = useState("");

  const cart = useSelector((state) => state.cartItems);

  const currentCartProduct = cart.find(item => item.product.id === parseInt(id));

  const [quantity, setQuantity] = useState(currentCartProduct && currentCartProduct.quantity || 1);

  const fetchProduct = async (id) => {

    try {
      setLoading(true);

      const response = await fetch(`https://dummyjson.com/products/${id}`);

      const data = await response.json();

      setProduct(data);
      setCurrentImage(data.thumbnail);

      setLoading(false);
    } catch (error) {
      console.error('Error fetching products', error);
      setLoading(false);
    }
  }

  useEffect(() => {

    fetchProduct(id);

  }, [id]);

  return (
    <main className="mx-auto max-w-2xl px-4 py-14 lg:max-w-7xl lg:px-8">
      {
        loading ? <Loading /> : product && <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="lg:flex">
            <div className="w-full h-96 lg:order-2 lg:ml-10">
              <div className="overflow-hidden rounded-lg">
                <img className="h-full max-h-96 w-full object-cover transition duration-700 ease-in-out" src={currentImage} alt={product.title} />
              </div>
            </div>

            <div className="w-full mt-6 lg:mt-0 lg:order-1 lg:w-32 ">
              <div className="flex space-x-2 lg:space-x-0 lg:flex-col">
                {
                  product.images.map((image, index) =>
                    <button key={index} type="button" className="aspect-square mb-3 h-20 overflow-hidden rounded-lg border-[1px] border-themeColor text-center " onClick={() => setCurrentImage(image)}>
                      <img className="h-full w-full object-cover transition duration-700 ease-in-out" src={image} alt={product.title} />
                    </button>
                  )
                }
              </div>
            </div>
          </div>

          <div>
            <div className="space-y-4 ">
              <h2 className="text-titleColor text-2xl">{product.title}</h2>
              <Rating rating={product.rating} />
              <p className='text-textColor mt-3'>{product.description}</p>
            </div>

            <table className='text-textColor my-5'>
              <tbody>
                <tr>
                  <td>Category</td>
                  <td className='px-4'>:</td>
                  <td>{product.category.charAt(0).toUpperCase() + product.category.slice(1)}</td>
                </tr>
                <tr>
                  <td>Brand</td>
                  <td className='px-4'>:</td>
                  <td>{product.brand}</td>
                </tr>
              </tbody>
            </table>

            <div className="pt-6 pb-4 mt-5 border-t text-xl">
              <h3 className='font-bold text-themeColor'>
                ${product.price - (product.price * (product.discountPercentage / 100)).toFixed(2)}
              </h3>
              <div className="space-x-4 pt-2">
                <h4 className='inline-block text-titleColor line-through '>
                  ${product.price.toFixed(2)}
                </h4>
                <p className='inline-block text-base'>{product.discountPercentage}% Off</p>
              </div>
            </div>
            <Quantity product={product} quantity={quantity} setQuantity={setQuantity} />
          </div>
        </div>
      }
    </main>

  )
}

export default ProductDetailPage