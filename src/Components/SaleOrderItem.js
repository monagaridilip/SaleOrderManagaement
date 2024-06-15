import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react';

export default function SaleOrderItem({ saleOrder, saleOrderList }) {
  return (
    <div>
      <TableContainer>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>Sale Order ID</Th>
              <Th>Product Name</Th>
              <Th>SKU ID</Th>
              <Th isNumeric>Price</Th>
              <Th isNumeric>Quantity</Th>
              <Th isNumeric>Extended Price</Th>
              <Th isNumeric>Paid</Th>
            </Tr>
          </Thead>
          <Tbody>
            {saleOrder && saleOrder.items.map((item) =>
              item.skus.map((sku) => (
                <Tr key={sku._id}>
                  <Td>{saleOrder.saleOrderId}</Td>
                  <Td>{item.product_id?.name || 'N/A'}</Td> {/* Use optional chaining for nested properties */}
                  <Td>{sku.sku_id}</Td>
                  <Td isNumeric>{sku.price}</Td>
                  <Td isNumeric>{sku.quantity}</Td>
                  <Td isNumeric>{(sku.price * sku.quantity).toFixed(2)}</Td>
                  <Td isNumeric>{saleOrder.paid ? 'Yes' : 'No'}</Td> {/* Use ternary operator for boolean rendering */}
                </Tr>
              ))
            )}
            {saleOrderList && (
              <Tr>
                <Td>{saleOrderList.saleOrderId}</Td>
              </Tr>
            )}
          </Tbody>
          <Tfoot>{/* You can add any footer content here if needed */}</Tfoot>
        </Table>
      </TableContainer>
    </div>
  );
}
