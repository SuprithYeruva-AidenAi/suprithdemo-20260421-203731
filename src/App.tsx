import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import CreateAccount from './pages/CreateAccount';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/Dashboard';
import ProductList from './pages/ProductList';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/create-account-with-nric-1-1" element={<CreateAccount />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/login-with-nric-fin-1-4-reset-password" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/product/:productCode" element={<ProductList />} />
      </Routes>
    </BrowserRouter>
  );
}