import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Stock from "./Pages/Stock";
// import firebase from "firebase";

import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import Cart from "./Pages/Cart";
import storage from "redux-persist/lib/storage";
import { Provider, useSelector } from "react-redux";
// import { persistor } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import stockReducer from "./Reducer/stockSlice.js";

const persistConfig = { key: "root", storage, version: 1 };
const persistedReducer = persistReducer(persistConfig, stockReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// const firebaseConfig = {
//   apiKey: "AIzaSyDFJHvfb4JxKO68vWvigpuszG_NfZD_sfE",
//   authDomain: "hisaabkitaab-3006.firebaseapp.com",
//   projectId: "hisaabkitaab-3006",
//   storageBucket: "hisaabkitaab-3006.appspot.com",
//   messagingSenderId: "72157362471",
//   appId: "1:72157362471:web:aa6df55c5710c6725d1102",
// };

// // Initialize Firebase
// const app = firebase.initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
