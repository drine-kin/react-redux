import { useDispatch, useSelector } from 'react-redux'
import { removeFromCart } from '../state/reducers'
import CartItem from '../components/CartItem';
import { Link } from 'react-router-dom';

const CartPage = () => {

  const cart = useSelector((state) => state.cartItems);

  const dispatch = useDispatch();

  const handleRemoveFromCart = (productID) => {
    dispatch(removeFromCart(productID));
  };

  const subTotal = cart.reduce((accumulator, item) => {
    const itemTotal = item.price * item.quantity;
    return accumulator + itemTotal;
  }, 0);

  return (
    <main className="mx-auto max-w-2xl px-4 py-14 lg:max-w-7xl lg:px-8">
      <h2 className="text-2xl text-themeColor2 py-4">Cart</h2>
      <div className="flex bg-gray-100 border border-themeColor3">

        {cart.length > 0 ? <table className="flex-1 px-4 py-6">
          <thead>
            <tr className='hidden lg:grid content-center gap-4 grid-cols-6 text-titleColor lg:text-center p-4 border border-b-themeColor3'>
              <td className=''>Image</td>
              <td className=''>Title</td>
              <td className=''>Price</td>
              <td className=''>Qty</td>
              <td className=''>Total</td>
              <td className=''></td>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300">
            {cart.map((item) => (
              <CartItem key={item.product.id} item={item} handleRemoveFromCart={handleRemoveFromCart} />
            ))}
            <tr className='grid content-end gap-4 grid-cols-6 text-titleColor font-bold lg:text-center p-4 border border-b-themeColor3'>
              <td className='col-span-4'>Sub Total</td>
              <td className='col-span-2 lg:col-span-1'>$ {subTotal.toFixed(2)}</td>
            </tr>
          </tbody>
        </table> : <p className='text-titleColor p-2'>No Products in Cart. Visit <Link to="/" className='underline'>Products</Link> to add some products.</p>}

      </div>
    </main>

  )
}

export default CartPage