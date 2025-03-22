import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { linkCart, linkHistory, linkHome, linkShowWallet, pageVariants } from "./constant";
import Cart from "./page/cart/Cart";
import History from "./page/history/History";
import Home from "./page/home/Home";
import ShowWallet from "./page/showWallet/ShowWallet";

import './App.scss';
import BackButton from "./layouts/component/backButton/BackButton";


function AnimatedRoutes() {
  const location = useLocation();

  return (
    
      <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
              <Route path={linkHome} element={<PageWrapper><Home /></PageWrapper>} />
              <Route path={linkCart} element={<PageWrapper><Cart /></PageWrapper>} />
              <Route path={linkHistory} element={<PageWrapper><History /></PageWrapper>} />
              <Route path={linkShowWallet} element={<PageWrapper><ShowWallet /></PageWrapper>} />

          </Routes>
      </AnimatePresence>
  );
}

function PageWrapper({ children }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
      className="page"
    >
      {children}
    </motion.div>
  );
}

function AppWrapper() {
  const location = useLocation(); // Get current location
  const showSidePanels = location.pathname === linkCart; // Show only on /cart page

  return (
    <div className="Root">
      {showSidePanels && <div className="Root_left"></div>}
      {showSidePanels && <div className="Root_right"></div>}

      <BackButton />
      <AnimatedRoutes />
    </div>
  );
}

function App() {

  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}




export default App;
