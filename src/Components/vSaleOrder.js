import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Heading, Text, Tabs, TabList, TabPanels, Tab, TabPanel, Spinner, Divider } from '@chakra-ui/react';
import SaleOrderItem from './SaleOrderItem';

const SaleOrderView = () => {
  const [saleOrder, setSaleOrder] = useState(null);
  const params = useParams();

  useEffect(() => {
    const fetchSaleOrder = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/vsaleorders/${params.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch sale order');
        }
        const data = await response.json();
        setSaleOrder(data.saleOrder); // Accessing nested saleOrder
      } catch (error) {
        console.error('Error fetching sale order:', error);
      }
    };

    fetchSaleOrder();
  }, [params.id]);

  if (!saleOrder) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box maxW="" mx="auto" mt={8} p={4} boxShadow="md" borderWidth="1px" borderRadius="md">
      <Heading as="h1" size="xl" mb={4}>Sale Order Details</Heading>
      <Divider mb={4} />
      <Text fontSize="lg" fontWeight="bold">Customer Name: {saleOrder.customer_id?.name || 'N/A'}</Text>
      <Text fontSize="lg" fontWeight="bold">Invoice No: {saleOrder.invoice_no}</Text>
      <Text fontSize="lg" fontWeight="bold">Sale Order ID: {saleOrder.saleOrderId} </Text>
      <Text fontSize="lg" fontWeight="bold">Invoice Date: {new Date(saleOrder.invoice_date).toLocaleDateString()}</Text>
      <Divider mb={4} />

      <Tabs variant='enclosed'>
        <TabList>
          <Tab>Items</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <SaleOrderItem saleOrder={saleOrder} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default SaleOrderView;
