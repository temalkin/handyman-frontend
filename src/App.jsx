import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ServiceFooterNav from './components/ServiceFooterNav';
import Home from './pages/Home';
import Services from './pages/Services';
import DrywallRepairCharlotte from './pages/services/DrywallRepairCharlotte';
import AfterWaterDamageRestoration from './pages/services/AfterWaterDamageRestoration';
import InteriorPaintingCharlotte from './pages/services/InteriorPaintingCharlotte';
import ExteriorPaintingCharlotte from './pages/services/ExteriorPaintingCharlotte';
import TVMountInstallationCharlotte from './pages/services/TVMountInstallationCharlotte';
import LVPFloorInstallationCharlotte from './pages/services/LVPFloorInstallationCharlotte';
import Lighting from './pages/services/Lighting';
import SmartHomeSystems from './pages/services/SmartHomeSystems';
import PressureWashing from './pages/services/PressureWashing';
import DoorsWindowsInstallation from './pages/services/DoorsWindowsInstallation';
import DoorsWindowsTreatment from './pages/services/DoorsWindowsTreatment';
import Wainscoting from './pages/services/Wainscoting';
import CarpentryWoodworking from './pages/services/CarpentryWoodworking';
import FloorInstallation from './pages/services/FloorInstallation';
import GarageFloorEpoxy from './pages/services/GarageFloorEpoxy';
import HandymanSouthCharlotte from './pages/HandymanSouthCharlotte';
import HandymanBallantyne from './pages/HandymanBallantyne';
import Book from './pages/Book';
import Gallery from './pages/Gallery';
import Reviews from './pages/Reviews';
import FAQ from './pages/FAQ';
import About from './pages/About';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <ScrollToTop />
        <Header />
        <main className="animate-fadeIn">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/drywall-repair-charlotte" element={<DrywallRepairCharlotte />} />
            <Route path="/after-water-damage-drywall-restoration-charlotte" element={<AfterWaterDamageRestoration />} />
            <Route path="/interior-painting-charlotte" element={<InteriorPaintingCharlotte />} />
            <Route path="/exterior-painting-charlotte" element={<ExteriorPaintingCharlotte />} />
            <Route path="/tv-mount-installation-charlotte" element={<TVMountInstallationCharlotte />} />
            <Route path="/lvp-floor-installation-charlotte" element={<LVPFloorInstallationCharlotte />} />
            {/* Additional service detail routes */}
            <Route path="/services/lighting" element={<Lighting />} />
            <Route path="/services/smart-home-systems" element={<SmartHomeSystems />} />
            <Route path="/services/pressure-washing" element={<PressureWashing />} />
            <Route path="/services/doors-windows-installation" element={<DoorsWindowsInstallation />} />
            <Route path="/services/doors-windows-treatment" element={<DoorsWindowsTreatment />} />
            <Route path="/services/wainscoting" element={<Wainscoting />} />
            <Route path="/services/carpentry-woodworking" element={<CarpentryWoodworking />} />
            <Route path="/services/floor-installation" element={<FloorInstallation />} />
            <Route path="/services/garage-floor-epoxy" element={<GarageFloorEpoxy />} />
            <Route path="/handyman-south-charlotte" element={<HandymanSouthCharlotte />} />
            <Route path="/handyman-ballantyne" element={<HandymanBallantyne />} />
            <Route path="/book" element={<Book />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
          </Routes>
        </main>
        <ServiceFooterNav />
        <Footer />
      </div>
    </Router>
  );
}

export default App;