import { Suspense, lazy, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar, Footer, ScrollProgress, ScrollToTop, LoadingScreen } from './components';
import './styles/global.css';

const Home = lazy(() => import('./pages/Home/Home'));
const ERP = lazy(() => import('./pages/ERP/ERP'));
const ICT = lazy(() => import('./pages/ICT/ICT'));
const Advisory = lazy(() => import('./pages/Advisory/Advisory'));
const Pricing = lazy(() => import('./pages/Pricing/Pricing'));
const Careers = lazy(() => import('./pages/Careers/Careers'));
const Contact = lazy(() => import('./pages/Contact/Contact'));

// Component to handle initial loading
function AppContent() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    if (isLoading) return;
    const timer = window.setTimeout(() => {
      void import('./pages/ERP/ERP');
      void import('./pages/ICT/ICT');
      void import('./pages/Advisory/Advisory');
      void import('./pages/Pricing/Pricing');
      void import('./pages/Careers/Careers');
      void import('./pages/Contact/Contact');
    }, 1200);

    return () => window.clearTimeout(timer);
  }, [isLoading]);

  return (
    <>
      {isLoading && (
        <LoadingScreen onLoadComplete={handleLoadComplete} minLoadTime={2000} />
      )}
      <ScrollProgress />
      <div className="app" style={{ visibility: isLoading ? 'hidden' : 'visible' }}>
        <Navbar />
        <main>
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/erp" element={<ERP />} />
              <Route path="/ict" element={<ICT />} />
              <Route path="/advisory" element={<Advisory />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;
