import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCustomers, fetchProducts, fetchSkuItems, selectCustomers, selectProducts, selectSkuItems } from './Redux store/SaleOrderSlice';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditSaleOrder() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const customers = useSelector(selectCustomers);
    const products = useSelector(selectProducts);
    const skuItems = useSelector(selectSkuItems);
    const params = useParams()
    const [fetchData,setFetchData] = useState();
    const [formData, setFormData] = useState({
      customer_id: '',
      items: [{ product_id: '', skus: [{ sku_id: '', price: '', quantity: '' }] }],
      paid: false,
      invoice_no: '',
      invoice_date: ''
    });
  
    useEffect(() => {
      dispatch(fetchCustomers());
      dispatch(fetchProducts());
      dispatch(fetchSkuItems());
      
    }, [dispatch]);
  
    const handleChange = (event) => {
      const { name, value } = event.target;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    };
  
    const handleItemChange = (productIndex, skuIndex, field, value) => {
      const updatedItems = [...formData.items];
      if (field === 'sku_id') {
        const selectedSku = skuItems.find(skuItem => skuItem.sku_id === value);
        updatedItems[productIndex].skus[skuIndex].price = selectedSku ? selectedSku.price : '';
      }
      updatedItems[productIndex].skus[skuIndex][field] = value;
      setFormData({ ...formData, items: updatedItems });
    };
  
    const addItem = () => {
      setFormData({
        ...formData,
        items: [...formData.items, { product_id: '', skus: [{ sku_id: '', price: '', quantity: '' }] }]
      });
    };
  
    const handleRemoveSku = (productIndex, skuIndex) => {
      const updatedItems = [...formData.items];
      updatedItems[productIndex].skus.splice(skuIndex, 1);
      setFormData({ ...formData, items: updatedItems });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      let i= 1000
      const formattedFormData = {
        ...formData,
        invoice_no: formData.invoice_no || i+1, // Replace with actual logic to generate invoice number
        invoice_date: formData.invoice_date ? new Date(formData.invoice_date) : new Date(),
        items: formData.items.map(item => ({
          ...item,
          skus: item.skus.map(sku => ({
            ...sku,
            quantity: Number(sku.quantity),
          })),
        })),
      };
      try {
        const res = await fetch(`http://localhost:5000/api/edit-SaleOrder/${params.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formattedFormData),
        });
    
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
    
        const data = await res.json();
        if(data){
          navigate(`/vSaleOrder/${data._id}`)
        }
        
      } catch (error) {
        console.error('Error submitting sale order:', error);
      }
    };
    
    
  
    const handleProductSelect = (productIndex, productId) => {
      const updatedItems = [...formData.items];
      updatedItems[productIndex].product_id = productId;
      setFormData({ ...formData, items: updatedItems });
    };
  
    if (!formData || typeof handleChange !== 'function') {
      console.error('formData or handleChange is not correctly passed');
      return <div>Error: formData or handleChange is not correctly passed</div>;
    }
  
    
    
    return (
      <div className="container mt-5">
        <h1 className="text-center mb-4">Edit Sale Order</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="customer_id">Select Customer</label>
            <select
              className="form-control"
              id="customer_id"
              name="customer_id"
              value={formData.customer_id}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select Customer
              </option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
          </div>
  
          {formData.items.map((item, index) => (
            <div key={index} className="mb-4">
              <div className="form-group mb-3">
                <label htmlFor={`product_id_${index}`}>Select Product</label>
                <select
                  className="form-control"
                  id={`product_id_${index}`}
                  value={item.product_id}
                  onChange={(e) => handleProductSelect(index, e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Select Product
                  </option>
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name}
                    </option>
                  ))}
                </select>
              </div>
  
              <div className="card">
                <div className="card-header">
                  SKUs
                </div>
                <div className="card-body">
                  {item.skus.map((sku, skuIndex) => (
                    <div key={skuIndex} className="mb-3">
                      <div className="form-group mb-2">
                        <label htmlFor={`sku_id_${index}_${skuIndex}`}>SKU ID</label>
                        <select
                          className="form-control"
                          id={`sku_id_${index}_${skuIndex}`}
                          value={sku.sku_id}
                          onChange={(e) => handleItemChange(index, skuIndex, 'sku_id', e.target.value)}
                          required
                        >
                          <option value="" disabled>Select SKU ID</option>
                          {skuItems
                            .filter(skuItem => skuItem.productId === item.product_id)
                            .map((filteredSkuItem, skuItemIndex) => (
                              <option key={skuItemIndex} value={filteredSkuItem.sku_id}>
                                {filteredSkuItem.sku_id}
                              </option>
                            ))
                          }
                        </select>
                      </div>
                      <div className="form-group mb-2">
                        <label htmlFor={`price_${index}_${skuIndex}`}>Price</label>
                        <input
                          type="number"
                          className="form-control"
                          id={`price_${index}_${skuIndex}`}
                          value={sku.price}
                          readOnly
                          required
                        />
                      </div>
                      <div className="form-group mb-2">
                        <label htmlFor={`quantity_${index}_${skuIndex}`}>Quantity</label>
                        <input
                          type="number"
                          className="form-control"
                          id={`quantity_${index}_${skuIndex}`}
                          value={sku.quantity}
                          onChange={(e) => handleItemChange(index, skuIndex, 'quantity', e.target.value)}
                          required
                        />
                      </div>
                      <button
                        type="button"
                        className="btn btn-danger mb-2"
                        onClick={() => handleRemoveSku(index, skuIndex)}
                      >
                        Remove SKU
                      </button>
                    </div>
                  ))}
                  <button type="button" className="btn btn-primary" onClick={addItem}>
                    Add SKU
                  </button>
                </div>
              </div>
            </div>
          ))}
            <div className="form-group form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="paid"
              name="paid"
              checked={formData.paid}
              onChange={(e) =>
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  paid: e.target.checked,
                }))
              }
            />
            <label className="form-check-label" htmlFor="paid">Paid</label>
          </div>
          <div className="d-flex justify-content-between mt-3">
            <button type="button"  className="btn btn-primary" onClick={addItem}>
              Add Product
            </button>
            <button type="submit" className="btn btn-success">
              Submit Sale Order
            </button>
          </div>
        </form>
      </div>
    );
}
