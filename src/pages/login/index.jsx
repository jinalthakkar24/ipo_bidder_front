import React from 'react';
import { Helmet } from 'react-helmet';
import LoginForm from './components/LoginForm';
import AuthLinks from './components/AuthLinks';

const Login = () => {
  return (
    <>
      <Helmet>
        <title>Login - IPO Bidder | Secure Access to IPO Investments</title>
        <meta name="description" content="Secure login to IPO Bidder platform. Access your IPO applications, track allotments, and manage your investment portfolio with bank-grade security." />
        <meta name="keywords" content="IPO login, secure access, investment platform, SEBI registered, IPO applications" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Left Column - Login Form */}
              <div className="order-2 lg:order-1">
                <LoginForm />
              </div>

              {/* Right Column - Auth Links and Support */}
              <div className="order-1 lg:order-2">
                <AuthLinks />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;