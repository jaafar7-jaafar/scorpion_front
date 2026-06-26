import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import BookingModal from './components/BookingModal';
import HomePage from './pages/HomePage';
import CarsPage from './pages/CarsPage';
import AboutPage from './pages/AboutPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminLayout from './pages/AdminLayout';
import AdminCarsPage from './pages/admin/AdminCarsPage';
import AdminReviewsPage from './pages/admin/AdminReviewsPage';
import AdminAddressesPage from './pages/admin/AdminAddressesPage';
import AdminSeatsPage from './pages/admin/AdminSeatsPage';

function PublicLayout({ children, onBookNow }) {
  return (
    <>
      <Navbar onBookNow={onBookNow} />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

function App() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const openBooking = (car = null) => { setSelectedCar(car); setBookingOpen(true); };

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PublicLayout onBookNow={() => openBooking()}><HomePage onBookNow={openBooking} /></PublicLayout>} />
          <Route path="/cars" element={<PublicLayout onBookNow={() => openBooking()}><CarsPage onBookNow={openBooking} /></PublicLayout>} />
          <Route path="/about" element={<PublicLayout onBookNow={() => openBooking()}><AboutPage onBookNow={openBooking} /></PublicLayout>} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
            <Route index element={<Navigate to="/admin/cars" replace />} />
            <Route path="cars" element={<AdminCarsPage />} />
            <Route path="reviews" element={<AdminReviewsPage />} />
            <Route path="addresses" element={<AdminAddressesPage />} />
            <Route path="seats" element={<AdminSeatsPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} selectedCar={selectedCar} />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
