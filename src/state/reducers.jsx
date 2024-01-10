import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  products: [],
  cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
};

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    // addToCart: (state, action) => {

    //   const { product, quantity } = action.payload;

    //   const existingItem = state.cartItems.length > 0 && state.cartItems.find(item => item.product.id === product.id);

    //   if (quantity) {
    //     if (existingItem) {
    //       if (product.stock >= quantity) {
    //         state.cartItems = state.cartItems.map(item => {
    //           if (item.product.id === product.id) {
    //             item.quantity = quantity;
    //           }
    //           return item;
    //         });
    //       }
    //     } else {
    //       if (product.stock >= quantity) {
    //         state.cartItems = [...state.cartItems,
    //         {
    //           product: product,
    //           price: product.discountPercentage ? product.price - (product.price * (product.discountPercentage / 100)).toFixed(2) : product.price,
    //           quantity: parseInt(quantity || 1)
    //         }];
    //       }
    //     }
    //   } else {
    //     if (existingItem) {
    //       state.cartItems = state.cartItems.map(item => {
    //         if (item.product.id === product.id) {
    //           item.quantity += 1;
    //         }
    //         return item;
    //       });
    //     } else {
    //       state.cartItems = [...state.cartItems,
    //       {
    //         product: product,
    //         price: product.discountPercentage ? product.price - (product.price * (product.discountPercentage / 100)).toFixed(2) : product.price,
    //         quantity: parseInt(1)
    //       }];
    //     }
    //   }

    //   localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    // },
    
    addToCart: (state, action) => {
      const { product, quantity } = action.payload;
    
      // Find the index of the existing item in the cart based on its product ID
      const existingItemIndex = state.cartItems.findIndex(item => item.product.id === product.id);
    
      // Create a copy of the current cart items array
      const updatedCartItems = [...state.cartItems];
    
      // Check if the product is already in the cart
      if (existingItemIndex !== -1) {
        // If the product is in the cart and has enough stock, update the quantity
        if (product.stock >= quantity) {
          updatedCartItems[existingItemIndex].quantity = quantity;
        }
      } else {
        // If the product is not in the cart, add it
        // Check if the product has enough stock (default to 1 if quantity is not provided)
        if (product.stock >= (quantity || 1)) {
          updatedCartItems.push({
            product,
            // Calculate the discounted price if a discount percentage is present
            price: product.discountPercentage
              ? (product.price - (product.price * (product.discountPercentage / 100))).toFixed(2)
              : product.price,
            quantity: parseInt(quantity || 1)  // Parse quantity to ensure it's an integer
          });
        }
      }
    
      // Update the state with the modified cart items
      state.cartItems = updatedCartItems;
    
      // Update the localStorage with the updated cart items
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    
    removeFromCart: (state, action) => {
      const id = action.payload;

      state.cartItems = state.cartItems.filter((item) => item.product.id !== id);
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    login: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      state.cartItems = [];
      localStorage.removeItem('user');
      localStorage.removeItem('cartItems');
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const { addToCart, removeFromCart, login, logout, setProducts } = mainSlice.actions;

export default mainSlice.reducer;
