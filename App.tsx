
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { AuctionList } from './pages/AuctionList';
import { AuctionDetail } from './pages/AuctionDetail';
import { AdminDashboard } from './pages/AdminDashboard';
import { Consultation } from './pages/Consultation';
import { ServiceIntro } from './pages/ServiceIntro';
import { ExpertList } from './pages/ExpertList';
import { UsageGuide } from './pages/UsageGuide';
import { SafetySystem } from './pages/SafetySystem';
import { FAQPage } from './pages/FAQPage';
import { TermsOfService } from './pages/TermsOfService';
import { PrivacyPolicy } from './pages/PrivacyPolicy';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServiceIntro />} />
          <Route path="/guide" element={<UsageGuide />} />
          <Route path="/experts" element={<ExpertList />} />
          <Route path="/safety" element={<SafetySystem />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/auctions" element={<AuctionList />} />
          <Route path="/auctions/:id" element={<AuctionDetail />} />
          <Route path="/consult" element={<Consultation />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
