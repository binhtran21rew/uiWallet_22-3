import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { bgMain, linkBackup, linkCart, linkDetailTransaction, linkHistory, linkHome, linkReceive, linkSend, linkShowWallet, linkToken, linkTopup, linkTransaction, linkWalletDetail, linkWalletKey, pageVariants } from "./constant";
import Cart from "./page/cart/Cart";
import History from "./page/history/History";
import Home from "./page/home/Home";
import ShowWallet from "./page/showWallet/ShowWallet";

import './App.scss';
import BackButton from "./layouts/component/backButton/BackButton";
import Transaction from "./page/transaction/Transaction";
import DetailTransaction from "./page/detailTransaction/DetailTransaction";
import Send from "./page/send/Send";
import { useState } from "react";
import Topup from "./page/topup/Topup";
import ShowWalletDetail from "./page/showWalletDetail/ShowWalletDetail";
import WalletKey from "./page/walletKey/WalletKey";
import Backup from "./page/backcup/Backup";
import Receive from "./page/receive/Receive";
import Token from "./page/token/Token";


function AnimatedRoutes() {
  const location = useLocation();

  return (
    
      <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
              <Route path={linkHome} element={<PageWrapper><Home /></PageWrapper>} />
              <Route path={linkCart} element={<PageWrapper><Cart /></PageWrapper>} />
              <Route path={linkHistory} element={<PageWrapper><History /></PageWrapper>} />
              <Route path={linkShowWallet} element={<PageWrapper><ShowWallet /></PageWrapper>} />
              <Route path={linkTransaction} element={<PageWrapper><Transaction /></PageWrapper>} />
              <Route path={linkDetailTransaction} element={<PageWrapper><DetailTransaction /></PageWrapper>} />
              <Route path={linkSend} element={<PageWrapper><Send /></PageWrapper>} />
              <Route path={linkTopup} element={<PageWrapper><Topup /></PageWrapper>} />
              <Route path={linkWalletDetail} element={<PageWrapper><ShowWalletDetail /></PageWrapper>} />
              <Route path={linkWalletKey} element={<PageWrapper><WalletKey /></PageWrapper>} />
              <Route path={linkBackup} element={<PageWrapper><Backup /></PageWrapper>} />
              <Route path={linkReceive} element={<PageWrapper><Receive /></PageWrapper>} />
              <Route path={linkToken} element={<PageWrapper><Token /></PageWrapper>} />
          </Routes>
      </AnimatePresence>
  );
}

function PageWrapper({ children }) {
  const location = useLocation();
  
  const pageDetailTransaction = location.pathname === linkDetailTransaction;
  
  const [height, setHeight] = useState(window.innerHeight);
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
      className="page"
      style={{height: pageDetailTransaction ? '100%' : height}}
    >
      {children}
    </motion.div>
  );
}

function AppWrapper() {
  const location = useLocation(); // Get current location
  const pageHome = location.pathname === linkHome;
  const pageCart = location.pathname === linkCart; // Show only on /cart page
  const pageWallet = location.pathname === linkShowWallet;
  const pageDetailTransaction = location.pathname === linkDetailTransaction;
  const pagetransaction = location.pathname === linkTransaction;
  const pageSend = location.pathname === linkSend;
  const pageTopup = location.pathname === linkTopup;
  const pageWalletDetail = location.pathname === linkWalletDetail;
  const pageWallKey = location.pathname === linkWalletKey;
  const pageBackup = location.pathname === linkBackup;
  const pageHistory = location.pathname === linkHistory;
  const pageReceive = location.pathname === linkReceive;
  const pageToken = location.pathname === linkToken;
  return (
    <div className="Root"> 
      <div className="background" style={ !pageHome && !pageToken ? {
            background: `url(${bgMain})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            width: "100%",
            height: "100%"

      } : {
          backgroundColor: "rgba(229, 228, 229, 0.4)",
          width: "100%",
          height: "100%"
      }}>
        {pageCart && <div className="Root_left"></div>}
        {pageCart && <div className="Root_right"></div>}

        {!pageDetailTransaction && !pagetransaction && !pageSend && !pageTopup && !pageWallKey && !pageReceive && <div className={`${pageWallet || pageWalletDetail || pageBackup || pageHistory ?  'Root_buttonBack' : ' Root_buttonBackTop' }`}>
          <BackButton />
          </div>
        }
        <AnimatedRoutes />
      </div>

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

