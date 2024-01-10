import React from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { addToCart } from '../state/reducers';

const ProductCard = ({ product }) => {

    const dispatch = useDispatch();

    const saledPrice = product.price - (product.price * (product.discountPercentage / 100));

    return (
        <div key={product.id} className=" bg-white group">
            <div className='transform transition-transform ease-in-out duration-500 group-hover:rotate-1 group-hover:scale-105'>
                <Link to={`product-detail/${product.id}`} className="w-full ">
                    <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="w-full h-56 object-cover rounded-t-lg  "
                    />
                </Link>

                <div className='flex items-center p-5 rounded-b-lg shadow-md '>
                    <div className='flex-1'>
                        <Link to={`product-detail/${product.id}`} className="w-full">
                            <h3 className="text-titleColor text-lg font-medium text-ellipsis h-6 line-clamp-1">
                                {product.title}
                            </h3>
                        </Link>
                        <div className="pt-1 font-medium">
                            {product.discountPercentage ? <>
                                <span className='text-themeColor'>${saledPrice.toFixed(2)}</span>
                                <span className='pl-3 line-through '>${product.price.toFixed(2)}</span>
                            </> : <>${product.price.toFixed(2)}</>}</div>
                    </div>
                    
                    <div className='bg-themeColor text-white rounded-sm hover:bg-themeColor2 '>
                        <button className='px-3 py-2 text-sm ' onClick={() => dispatch(addToCart({ product }))}> Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCard

