// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import saleOrderReducer from './SaleOrderSlice'

const store = configureStore({
    reducer: {
        saleOrder: saleOrderReducer,
    },
});

export default store;
