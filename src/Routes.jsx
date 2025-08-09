import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
// Add your imports here
import LandingPage from "./pages/landing";
import Login from "./pages/login";
import ClientDashboard from "./pages/client-dashboard";
import IpoListings from "./pages/ipo-listings";
import AllotmentStatus from "./pages/allotment-status";
import IpoApplication from "./pages/ipo-application";
import NotFound from "./pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          {/* Define your routes here */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Login />} />
          <Route path="/client-dashboard" element={<ClientDashboard />} />
          <Route path="/ipo-listings" element={<IpoListings />} />
          <Route path="/allotment-status" element={<AllotmentStatus />} />
          <Route path="/ipo-application" element={<IpoApplication />} />
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;