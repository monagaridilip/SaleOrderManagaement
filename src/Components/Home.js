import React, { useEffect } from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Tbody, Td } from '@chakra-ui/react';
import { AddIcon, CheckCircleIcon } from '@chakra-ui/icons';
import { Link, useNavigate } from 'react-router-dom';
import CreateSaleOrder from './CreateSaleOrder';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSaleOrders, selectSaleOrderLines } from './Redux store/SaleOrderSlice';
import { EditIcon } from '@chakra-ui/icons'
import {
  Table,
  Thead,
  Tfoot,
  Tr,
  Th,
  TableContainer,
} from '@chakra-ui/react';



export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let saleOrders = useSelector(selectSaleOrderLines);
  const paidSaleOrders = saleOrders.filter(order => order.paid === true);
  saleOrders = saleOrders.filter((order)=> order.paid === false )


  useEffect(() => {
    if (!localStorage.getItem('authenticated')) {
      navigate('/login');
    } else {
      dispatch(fetchSaleOrders());
    }
    // eslint-disable-next-line
  }, [dispatch, localStorage.getItem('authenticated')]);

  const calculateTotalPrice = (items) => {
    if (!items) return 'N/A';
    return items.reduce((total, item) => {
      const itemTotal = item.skus?.reduce((itemSum, sku) => itemSum + (sku.price * sku.quantity), 0) || 0;
      return total + itemTotal;
    }, 0).toFixed(2); // ToFixed to format the total price
  };



  return (
    <div className='my-3'>
      <Tabs variant='enclosed'>
        <TabList style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <Tab>Active Sale Orders</Tab>
            <Tab><CheckCircleIcon className='mx-2' />Completed Sales Order</Tab>
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
            <Tab>
              <button type="button" className="btn btn-success" onClick={() => navigate('/cSaleOrder')}>
                <AddIcon className='mx-2' />Create Sales Order
              </button>
            </Tab>
          </div>
        </TabList>
        <TabPanels>
          <TabPanel>
            <TableContainer>
              <Table variant='simple'>
                <Thead>
                  <Tr>
                    <Th>Sale Order ID</Th>
                    <Th>Customer Name</Th>
                    <Th>Price</Th>
                    <Th>Paid</Th>
                    <Th>Edit</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {saleOrders && saleOrders.length > 0 ? (
                    saleOrders.map((saleOrderList) => (
                      <Tr key={saleOrderList.id}>
                        <Td>{saleOrderList.saleOrderId}</Td>
                        <Td>{saleOrderList.customer_id.name}</Td>
                        <Td>{calculateTotalPrice(saleOrderList.items)}</Td>
                        <Td>{saleOrderList.paid === true ? "Yes" : "No"}</Td>
                        <Td>
                        <Link to={`/vSaleOrder/${saleOrderList.id}`}>View</Link> |{' '}
                        <Link to={`/edit-SaleOrder/${saleOrderList.id}`} >
                          <EditIcon /> Edit
                        </Link>
                        </Td>
                      </Tr>
                    ))
                  ) : (
                    <div>No sale orders available</div>
                  )}
                </Tbody>
                <Tfoot>{/* You can add any footer content here if needed */}</Tfoot>
              </Table>
            </TableContainer>
          </TabPanel>
          <TabPanel>
          <TableContainer>
              <Table variant='simple'>
                <Thead>
                  <Tr>
                    <Th>Sale Order ID</Th>
                    <Th>Customer Name</Th>
                    <Th>Price</Th>
                    <Th>Paid</Th>
                    <Th>Edit</Th>
                  </Tr>
                </Thead>
                <Tbody>
                {paidSaleOrders && paidSaleOrders.length > 0 ? (
                    paidSaleOrders.map((saleOrderList) => (
                      <Tr key={saleOrderList.id}>
                        <Td>{saleOrderList.saleOrderId}</Td>
                        <Td>{saleOrderList.customer_id?.name || 'N/A'}</Td>
                        {/* <Td>{new Date(saleOrderList.invoice_date).toLocaleDateString()}</Td> */}
                        <Td>{saleOrderList.paid ? 'Yes' : 'No'}</Td>
                        <Td>{calculateTotalPrice(saleOrderList.items)}</Td>
                        <Td>
                          <Link to={`/vSaleOrder/${saleOrderList.id}`}>View</Link> {' '}
                        </Td>
                      </Tr>
                    ))
                  ) : (
                    <Tr>
                      <Td colSpan="6">No sale orders available</Td>
                    </Tr>
                  )}
                </Tbody>
                <Tfoot>{/* You can add any footer content here if needed */}</Tfoot>
              </Table>
            </TableContainer>
          </TabPanel>
          <TabPanel>
            <CreateSaleOrder/>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}
