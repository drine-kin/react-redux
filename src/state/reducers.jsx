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

      const existingItemIndex = state.cartItems.findIndex(item => item.product.id === product.id);

      const updatedCartItems = [...state.cartItems];

      if (existingItemIndex !== -1) {

        const newQuantity = quantity || (updatedCartItems[existingItemIndex].quantity + 1);
        if (product.stock >= newQuantity) {
          updatedCartItems[existingItemIndex].quantity = newQuantity;
        }

      } else {
        if (product.stock >= (quantity || 1)) {
          updatedCartItems.push({
            product,
            price: product.discountPercentage
              ? (product.price - (product.price * (product.discountPercentage / 100))).toFixed(2)
              : product.price,
            quantity: parseInt(quantity || 1) 
          });
        }
      }

      state.cartItems = updatedCartItems;
      
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
