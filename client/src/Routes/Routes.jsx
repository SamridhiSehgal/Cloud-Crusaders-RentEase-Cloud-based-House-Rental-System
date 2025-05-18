import React from 'react';
import { BrowserRouter , Routes, Route } from 'react-router-dom';

import HomePage from '../pages/HomePage';
import RoomList from '../pages/RoomList';

// Owner
import OwnerDashboard from '../pages/owner/OwnerDashBoard';
import OwnerProperties from '../pages/owner/OwnerProperties';
import RentalRequests from '../pages/owner/RentalRequests';
import PaymentHistory from '../pages/owner/PaymentHistory';
import Profile from '../pages/owner/Profile';
import AddProperty from '../pages/owner/AddProperties';
import OwnerChat from '../pages/owner/OwnerChat';

// Tenant
import TenantDashBoard from '../pages/tenant/TenantDashBoard';
import TenantLogin from '../pages/tenant/TenantLogin';
import MyRentals from '../pages/tenant/MyRentals';
import ExploreProperties from '../pages/tenant/ExploreProperties';
import TenantPayments from '../pages/tenant/TenantPayments';
import TenantChat from '../pages/tenant/TenantChat';
import TenantProfile from '../pages/tenant/TenantProfile';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/room-list' element={<RoomList />} />

        {/* Owner Routes */}
        <Route path='/owner/dashboard' element={<OwnerDashboard />} />
        <Route path='/owner/add-property' element={<AddProperty />} />
        <Route path='/owner/properties' element={<OwnerProperties />} />
        <Route path='/owner/requests' element={<RentalRequests />} />
        <Route path='/owner/payments' element={<PaymentHistory />} />
        <Route path='/owner/chat' element={<OwnerChat />} />
        <Route path='/owner/profile' element={<Profile />} />

        {/* Tenant Routes */}
        <Route path='/tenant/dashboard' element={<TenantDashBoard />} />
        <Route path='/tenant/login' element={<TenantLogin />} />
        <Route path="/tenant/rentals" element={<MyRentals />} />
        <Route path="/tenant/explore" element={<ExploreProperties />} />
        <Route path="/tenant/payments" element={<TenantPayments />} />
        <Route path="/tenant/chat" element={<TenantChat />} />
        <Route path="/tenant/profile" element={<TenantProfile />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
