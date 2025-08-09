import React from 'react';
import Header from '../../components/ui/Header';
import MetricsCards from './components/MetricsCards';
import QuickActions from './components/QuickActions';
import IPOOpportunities from './components/IPOOpportunities';
import ClientActivityFeed from './components/ClientActivityFeed';
import TopClientsTable from './components/TopClientsTable';

const SubbrokerDashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="mt-16 p-6 min-h-screen">
        <div className="max-w-7xl mx-auto space-y-8">

          
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Subbroker Dashboard</h1>
              <p className="text-muted-foreground mt-2">
                Manage your client portfolio and IPO opportunities
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Welcome back,</p>
              <p className="text-lg font-semibold text-foreground">Suresh Agarwal</p>
              <p className="text-sm text-muted-foreground">Subbroker ID: SB001234</p>
            </div>
          </div>

          {/* Key Performance Metrics */}
          <MetricsCards />

          {/* Quick Actions */}
          <QuickActions />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* IPO Opportunities */}
            <div className="lg:col-span-1">
              <IPOOpportunities />
            </div>

            {/* Client Activity Feed */}
            <div className="lg:col-span-1">
              <ClientActivityFeed />
            </div>
          </div>

          {/* Top Clients Table */}
          <div className="space-y-8">
            <TopClientsTable />
          </div>

        </div>
      </main>
    </div>
  );
};

export default SubbrokerDashboard;