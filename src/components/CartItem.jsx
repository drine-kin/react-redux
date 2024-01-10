import React, { useState } from 'react'
import Quantity from './Quantity';

const CartItem = ({ item, handleRemoveFromCart }) => {

    const { product, price, quantity: cartQty } = item;

    const [quantity, setQuantity] = useState(cartQty);

    const saledPrice = product.price - (product.price * (product.discountPercentage / 100)).toFixed(2);

    return (

        <tr key={product.id} className="grid grid-cols-6 content-center text-textColor lg:justify-items-center relative lg:gap-4 lg:text-center px-4 py-6">
            <td className="self-center col-span-2 row-span-6 lg:col-span-1 lg:row-span-1 font-medium text-textColor">
                <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="h-24 w-24 object-cover object-center rounded-md border border-themeColor3"
                />
            </td>
            <td className="col-span-4 font-bold pl-2 text-textColor md:self-center lg:font-medium lg:col-span-1 lg:pl-0">
                <h3 className=''>
                    <a href={`product-detail/${product.id}`}>{product.title}</a>
                </h3>
            </td>
            <td className="self-center col-span-4 pl-2 text-textColor lg:col-span-1 lg:pl-0">
                ${saledPrice}
            </td>
            <td className="self-center col-span-4 pl-2 text-textColor lg:col-span-1 lg:pl-0">
                <Quantity product={product} quantity={quantity} setQuantity={setQuantity} inCart={true} />
            </td>
            <td className="self-center hidden pl-2 text-textColor lg:block lg:pl-0">
                ${(saledPrice * quantity).toFixed(2)}
            </td>
            <td className='self-center absolute right-2 top-6 lg:static col-span-4 lg:col-span-1'>
                <button
                    type="button"
                    className="inline-block text-themeColor hover:text-themeColor2"
                    onClick={() => handleRemoveFromCart(product.id)}
                ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                </button>
            </td>
        </tr>
    )
}

export default CartItem

