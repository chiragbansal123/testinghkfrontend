import { createSlice, nanoid } from "@reduxjs/toolkit";
import { type } from "@testing-library/user-event/dist/type";
import { act } from "react-dom/test-utils";
import { original } from "@reduxjs/toolkit";

const initialState = {
  stock: [
    {
      productId: null,
      name: null,
      salt: null,
      quantity: 0,
      price: 0,
      shelf: null,
      customer: 0,
      availability: null,
    },
  ],
  cart: [
    {
      id: 0,
      productId: null,
      name: null,
      salt: null,
      quantity: 0,
      cartUnit: 0,
      costPrice: 0,
      price: 0,
      expiry: null,
      discount: 0,
      discountedPrice: 0,
      shelf: null,
      // customer: 0,
    },
  ],

  user: { id: null, email: null },
  token: null,
  isAuth: false,
  endCustomer: {
    name: null,
    mobile: null,
    email: null,
    billAmount: 0,
    shoppedFrom: null,
  },
};

export const stockSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuth = true;
      // console.log(state.nanoid);
      // return state;
    },
    logout: (state, action) => {
      state.user = null;
      state.token = null;
      state.isAuth = false;
      state.cart = null;
      state.endCustomer = null;

      return state;
    },
    register: (state, action) => {
      //todo later
    },
    addToCart: (state, action) => {
      console.log(action.payload.currCart);
      console.log(state.cart);
      if (state.cart == null) {
        state.cart = [action.payload.currCart];
      } else if (state.cart?.length == 1 && state.cart[0]?.name == null) {
        delete state.cart[0];
        state.cart = [...state.cart.slice(1), action.payload.currCart];
      } else {
        state.cart = [action.payload.currCart, ...state.cart];
      }

      // state.units = 1;

      // console.log("curr -> ", action.payload.currCart);
      // delete state.cart;
      console.log(state.cart);
    },
    deleteFromCart: (state, action) => {
      // console.log(action.payload.id);
      // console.log(state.cart);
      const updatedCart = state.cart.filter(
        (item) => item.id != action.payload.id
      );
      state.cart = [...updatedCart];
      // console.log(state.cart);
    },
    getProducts: (state, action) => {
      state.stock = action.payload.stock;
      // console.log(typeof state.stocks);
    },
    updateCart: (state, action) => {
      const currItem = action.payload.updatedCart;

      // const index = original(state.cart).findIndex(
      //   (item) => item.id != currItem.id
      // );
      console.log("currItem id ->> ", currItem);
      const restCart = original(state.cart).filter(
        (item) =>
          // console.log("currItem id ->> ", item.id)
          item.id != currItem.id
      );

      state.cart = [currItem, ...restCart];
    },
    // addCustomer: (state, action) = {
    //   state
    // }
    // addItem: (state, action) => {
    //   console.log(state.stock);
    //   delete state.stocks;
    //   state.stock = [...state.stock, action.payload.newItem];
    //   console.log(state.stock);
    // },

    addCustomer: (state, action) => {
      // const endCustomer
      console.log(action.payload);
      state.endCustomer = action.payload.endCustomer;
    },
  },
});

export const {
  login,
  register,
  addToCart,
  deleteFromCart,
  logout,
  getProducts,
  updateCart,
  addItem,
  addCustomer,
} = stockSlice.actions;

export default stockSlice.reducer;
