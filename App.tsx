import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { NewAnalysis } from './pages/NewAnalysis';
import { History } from './pages/History';
import { AnalysisDetail } from './pages/AnalysisDetail';
import { Support } from './pages/Support';
import { Settings } from './pages/Settings';
import { About } from './pages/About';

// CRM Pages
import { ParentsList } from './pages/crm/ParentsList';
import { ParentDetail } from './pages/crm/ParentDetail';
import { ChildDetail } from './pages/crm/ChildDetail';
import { CRMAnalysisDetail } from './pages/crm/CRMAnalysisDetail';
import { CRMDashboard } from './pages/crm/CRMDashboard';
import { CRMAnalysesList } from './pages/crm/CRMAnalysesList';
import { CRMSupport } from './pages/crm/CRMSupport';
import { CRMReports } from './pages/crm/CRMReports';

function App() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hakkimizda" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/new-analysis" element={<NewAnalysis />} />
          <Route path="/history" element={<History />} />
          <Route path="/analysis/:id" element={<AnalysisDetail />} />
          <Route path="/support" element={<Support />} />
          <Route path="/settings" element={<Settings />} />
          
          {/* CRM Routes */}
          <Route path="/crm" element={<Navigate to="/crm/dashboard" replace />} />
          <Route path="/crm/dashboard" element={<CRMDashboard />} />
          <Route path="/crm/parents" element={<ParentsList />} />
          <Route path="/crm/parents/:id" element={<ParentDetail />} />
          <Route path="/crm/children/:id" element={<ChildDetail />} />
          <Route path="/crm/analyses" element={<CRMAnalysesList />} />
          <Route path="/crm/analyses/:id" element={<CRMAnalysisDetail />} />
          <Route path="/crm/support" element={<CRMSupport />} />
          <Route path="/crm/reports" element={<CRMReports />} />
          <Route path="/crm/settings" element={<Settings />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}

export default App;
