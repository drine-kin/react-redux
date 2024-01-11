import React from 'react'
import { useDispatch } from 'react-redux'
import { addToCart } from '../state/reducers';

const Quantity = ({ product, quantity, setQuantity, inCart = false }) => {

    const dispatch = useDispatch();

    const handleIncrease = () => {
        if (product.stock > quantity) {
            setQuantity((prevValue) => prevValue + 1)
        }
    };

    const handleDecrease = () => {
        quantity > 1 && setQuantity((prevValue) => prevValue - 1);
    };

    const handleAddtoCart = () => {
        quantity >= 1 && dispatch(addToCart({ product, quantity }));
    }

    return (
        <div className='flex items-center  space-x-2 '>

            {!inCart && <h4 className='text-textColor'>Quantity</h4>}

            <div className={`${!inCart && 'py-2 px-3 ml-3'}`}>
                <div className="flex items-center gap-x-1.5">
                    <button type="button" className={`${!inCart ? 'w-8 h-8' : 'w-5 h-5 lg:w-8 lg:h-8'} inline-flex justify-center items-center gap-x-2 font-medium rounded-md border border-themeColor-200 bg-white text-themeColor  hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none`} onClick={() => handleDecrease()}>
                        <svg className="flex-shrink-0 w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /></svg>
                    </button>

                    <input className="p-0 w-5 lg:w-8 bg-transparent border-0 text-textColor text-center " type="text" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                    <button type="button" className={`${!inCart ? 'w-8 h-8' : 'w-5 h-5 lg:w-8 lg:h-8'} inline-flex justify-center items-center gap-x-2 font-medium rounded-md border border-themeColor-200 bg-white text-themeColor  hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none`} onClick={() => handleIncrease()}>
                        <svg className="flex-shrink-0 w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                    </button>
                </div>
            </div>

            <button
                type="button"
                className="rounded-md bg-themeColor2 px-5 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-themeColor/85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-themeColor2"
                onClick={handleAddtoCart}
            >
                {!inCart ? 'Add to Cart' : 'Update'}
            </button>

        </div>
    )
}

export default Quantity