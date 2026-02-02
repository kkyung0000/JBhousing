
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
import { PointsPurchase } from './pages/PointsPurchase';
import { RefundPolicy } from './pages/RefundPolicy';
import { ReviewList } from './pages/ReviewList';
import { AiAnalysis } from './pages/AiAnalysis';
import { BiddingServiceCustomer } from './pages/BiddingServiceCustomer';
import { BiddingServiceAgent } from './pages/BiddingServiceAgent';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { NotFound } from './pages/NotFound';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/services" element={<ServiceIntro />} />
          <Route path="/guide" element={<UsageGuide />} />
          <Route path="/experts" element={<ExpertList />} />
          <Route path="/safety" element={<SafetySystem />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/reviews" element={<ReviewList />} />
          <Route path="/auctions" element={<AuctionList />} />
          <Route path="/auctions/:id" element={<AuctionDetail />} />
          <Route path="/ai-analysis" element={<AiAnalysis />} />
          <Route path="/consult" element={<Consultation />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/points" element={<PointsPurchase />} />
          <Route path="/bidding/customer" element={<BiddingServiceCustomer />} />
          <Route path="/bidding/agent" element={<BiddingServiceAgent />} />
          {/* Catch-all 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
