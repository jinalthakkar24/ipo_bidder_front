import React from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import PortfolioOverviewCard from './components/PortfolioOverviewCard';
import CurrentIPOSection from './components/CurrentIPOSection';
import PersonalApplicationsSection from './components/PersonalApplicationsSection';



const ClientDashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 lg:px-6 py-6">
        {/*<Breadcrumb /> */}
        
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, Rajesh!</h1>
              <p className="text-muted-foreground">
                Track your IPO investments and discover new opportunities
              </p>
            </div>
          </div>
        </div>


        {/* Portfolio Overview */}
        <PortfolioOverviewCard />

        {/* Current IPO Opportunities */}
        <CurrentIPOSection />

        {/* Personal Applications */}
        <PersonalApplicationsSection />

      </main>
    </div>
  );
};

export default ClientDashboard;