import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar, Footer, ScrollProgress, ScrollToTop, LoadingScreen } from './components';
import { Home, ERP, ICT, Advisory, Contact } from './pages';
import './styles/global.css';

// Component to handle initial loading
function AppContent() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && (
        <LoadingScreen onLoadComplete={handleLoadComplete} minLoadTime={2000} />
      )}
      <ScrollProgress />
      <div className="app" style={{ visibility: isLoading ? 'hidden' : 'visible' }}>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/erp" element={<ERP />} />
            <Route path="/ict" element={<ICT />} />
            <Route path="/advisory" element={<Advisory />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
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
