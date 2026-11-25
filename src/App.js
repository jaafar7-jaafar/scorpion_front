import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import MobileActionBar from './components/MobileActionBar';
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
import RentalGuidePage from './pages/RentalGuidePage';
import ContactPage from './pages/ContactPage';
import ThingsToDoPage from './pages/ThingsToDoPage';
import NotFoundPage from './pages/NotFoundPage';
import Seo from './components/Seo';
import RouteEffects from './components/RouteEffects';

function PublicLayout({ children, onBookNow }) {
  return (
    <>
      <Navbar onBookNow={onBookNow} />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <WhatsAppButton />
      <MobileActionBar onBookNow={onBookNow} />
    </>
  );
}

function App({ Router = BrowserRouter, routerProps = {} }) {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const openBooking = (car = null) => { setSelectedCar(car); setBookingOpen(true); };

  return (
    <HelmetProvider>
    <AuthProvider>
      <Router {...routerProps}>
        <RouteEffects />
        <Routes>
          <Route path="/" element={<PublicLayout onBookNow={() => openBooking()}><HomePage onBookNow={openBooking} /></PublicLayout>} />
          <Route path="/cars" element={<PublicLayout onBookNow={() => openBooking()}><CarsPage onBookNow={openBooking} /></PublicLayout>} />
          <Route path="/about" element={<PublicLayout onBookNow={() => openBooking()}><AboutPage onBookNow={openBooking} /></PublicLayout>} />
          <Route path="/san-pedro-golf-cart-rental-guide" element={<PublicLayout onBookNow={() => openBooking()}><RentalGuidePage onBookNow={openBooking} /></PublicLayout>} />
          <Route path="/things-to-do-in-san-pedro-by-golf-cart" element={<PublicLayout onBookNow={() => openBooking()}><ThingsToDoPage onBookNow={openBooking} /></PublicLayout>} />
          <Route path="/contact" element={<PublicLayout onBookNow={() => openBooking()}><ContactPage onBookNow={openBooking} /></PublicLayout>} />
          <Route path="/admin/login" element={<><Seo title="Admin Login | Scorpion Golf Cart Rental" noindex /><AdminLoginPage /></>} />
          <Route path="/admin" element={<><Seo title="Admin | Scorpion Golf Cart Rental" noindex /><ProtectedRoute><AdminLayout /></ProtectedRoute></>}>
            <Route index element={<Navigate to="/admin/cars" replace />} />
            <Route path="cars" element={<AdminCarsPage />} />
            <Route path="reviews" element={<AdminReviewsPage />} />
            <Route path="addresses" element={<AdminAddressesPage />} />
            <Route path="seats" element={<AdminSeatsPage />} />
          </Route>
          <Route path="*" element={<PublicLayout onBookNow={() => openBooking()}><NotFoundPage /></PublicLayout>} />
        </Routes>
        <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} selectedCar={selectedCar} />
      </Router>
    </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
