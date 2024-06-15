import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const fetchSaleOrders = createAsyncThunk(
  'saleOrder/fetchSaleOrders',
  async () => {
    try {
      const response = await fetch('http://localhost:5000/api/saleorders');
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchCustomers = createAsyncThunk(
  'saleOrder/fetchCustomers',
  async () => {
    try {
      const response = await fetch('http://localhost:5000/api/customers');
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchProducts = createAsyncThunk(
  'saleOrder/fetchProducts',
  async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products');
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
);
export const fetchSkuItems = createAsyncThunk(
  'saleOrder/fetchSkuItems',
  async () => {
    try {
      const response = await fetch('http://localhost:5000/api/skuItems');
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
);


const initialState = {
  saleOrderLines: [],
  customers: [],
  products: [],
  skuItems:[],
  status: 'idle',
  error: null,
};


const saleOrderSlice = createSlice({
  name: 'saleOrder',
  initialState,
  reducers: { },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSaleOrders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSaleOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.saleOrderLines = action.payload.map((order) => ({
          id: order._id,
          saleOrderId:order.saleOrderId,
          customer_id: order.customer_id,
           items: order.items.map(item => ({
            product_id: item.product_id,
              skus: item.skus.map(sku => ({
                sku_id: sku.sku_id,
                price: sku.price,
                quantity: sku.quantity,
            })),
          })),
          paid: order.paid,
          invoice_no: order.invoice_no,
          invoice_date: order.invoice_date,
        }));
      })
      .addCase(fetchSaleOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchCustomers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.customers = action.payload.map((customer) => ({
          id: customer._id,
          name: customer.name,
          email: customer.email,
          pincode: customer.pincode,
          location_name: customer.location_name,
          type: customer.type,
          profile_pic: customer.profile_pic,
          gst: customer.gst,
        }));
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload.map((product) => ({
          id: product._id,
          name: product.name,
          brand: product.brand,
          category: product.category,
          characteristics: product.characteristics,
          features: product.features,
          owner: product.ownerId,
          adding_date: product.adding_date,
          updated_on: product.updated_on,
        }));
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      }).addCase(fetchSkuItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSkuItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.skuItems = action.payload.map((sku) => ({
          sku_id: sku.sku_id,
          price: sku.price,
          quantity: sku.quantity,
          productId: sku.productId
        }));
      })
      .addCase(fetchSkuItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});


export const selectSaleOrderLines = (state) => state.saleOrder.saleOrderLines;
export const selectCustomers = (state) => state.saleOrder.customers;
export const selectProducts = (state) => state.saleOrder.products;
export const selectSkuItems = (state) => state.saleOrder.skuItems;


export default saleOrderSlice.reducer;
