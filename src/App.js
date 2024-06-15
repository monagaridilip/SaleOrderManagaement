import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Components/Login';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import { ChakraProvider } from '@chakra-ui/react';
import CreateSaleOrder from './Components/CreateSaleOrder';
import ViewSaleOrder from './Components/vSaleOrder'
import EditSaleOrder from './Components/EditSaleOrder';

// import { ThemeProvider } from '@mui/material/styles';
// import theme from './theme';

function App() {
  const isAuthenticated = localStorage.getItem('authenticated');
 
  return (
    // <ThemeProvider theme={theme}>

    <ChakraProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
          <Route path="/cSaleOrder" element={isAuthenticated ? <CreateSaleOrder /> : <Navigate to="/login" />} />
          <Route path="/edit-SaleOrder/:id" element={isAuthenticated ? <EditSaleOrder /> : <Navigate to="/login" />} />
          <Route path="/vSaleOrder/:id" element={isAuthenticated ? <ViewSaleOrder/> : <Navigate to="/login" />} />
        </Routes>
      </Router>
    </ChakraProvider>
    // </ThemeProvider>
  );
}

export default App;
