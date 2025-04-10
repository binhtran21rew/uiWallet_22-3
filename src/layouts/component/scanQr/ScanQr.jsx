import React, { useEffect, useRef, useState } from 'react'
import { Html5Qrcode } from "html5-qrcode";
import { Camera, ArrowLeft, Image, Zap } from "lucide-react";

import Icon from '../../../component/Icon';

import './scanQr.scss';
import ConfirmButton from '../confirmButton/ConfirmButton';

function ScanQr({...props}) {
    const {icon, setScannedResult, setIsScanning, isScanning, button, textbtn, onClick, onClickBack} = props;
    const scannerRef = useRef(null);
    const html5QrCodeRef = useRef(null);
    // const [isScanning, setIsScanning] = useState(false);
    const [hasPermission, setHasPermission] = useState(false);
    const [torch, setTorch] = useState(false);


    
    // 🔹 Ask for Camera Permission
    useEffect(() => {
      if(!isScanning) return;
      const checkCameraPermission = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          stream.getTracks().forEach((track) => track.stop()); // Release the camera after checking
          setHasPermission(true);
        } catch (err) {
          alert("Camera access denied. Please allow camera permissions.");
        }
      };
  
      checkCameraPermission();
    }, [isScanning]);
  
    // 🔹 Start QR Scanner (Full Screen)
    useEffect(() => {
        if (!isScanning || !hasPermission) return;

        if (!scannerRef.current) return;
  
        const html5QrCode = new Html5Qrcode("reader");
        html5QrCodeRef.current = html5QrCode;
    
        html5QrCode.start(
            { facingMode: "environment", }, // Use back camera
            { fps: 10, qrbox: { width: 350, height: 350 } }, // Increase box size camera
            (decodedText) => {
                console.log("✅ Scanned:", decodedText);

                try {
                    const data = JSON.parse(decodedText); // Try parsing JSON
                    setScannedResult(data);
                    // alert(`Scanned: Wallet - ${data.wallet}, Name - ${data.name}, payment - ${data.payment}, amount - ${data.amount}, fee - ${data.fee}`);
                    alert(`Scanned: Wallet - ${data.wallet}, Name - ${data.name}, payment - ${data.payment}, amount - ${data.amount}, fee - ${data.fee}`);

                } catch (err) {
                    console.warn("⚠️ Scanned result is not valid JSON:", decodedText);
                    setScannedResult(decodedText);
                    alert(`Scanned error: ${decodedText} ${err}`);
                }

                stopScan();
            },
            (errorMessage) => {
                
                console.log("⚠️ QR Scan Error:", errorMessage)}
        );
  
      return () => stopScan(); // Cleanup when unmounting
    }, [isScanning, hasPermission]);
  
    const stopScan = async () => {
      if (html5QrCodeRef.current) {
        await html5QrCodeRef.current.stop();
        html5QrCodeRef.current.clear();
        html5QrCodeRef.current = null;
        setIsScanning(false);
      }
    };
  
    return (
      <div className="text-center">
        {isScanning && (
          <div className="camera-container">
            {hasPermission && <div id="reader" ref={scannerRef}></div>}


            {
              !button && (
                <div className="button-container">
                  <button onClick={stopScan} className="glass-button">
                    <Icon name={"iconArrowLeft"} color="white"/>
                  </button>
      
                  <button className="glass-button d-flex flex-column">
                    <Image />
                    <span className='text-capitalize'>
                        photo
                    </span>
                  </button>
      
                  <button className="glass-button d-flex flex-column">
                    <Zap  className={torch ? "text-yellow-400" : ""} />
                    <span className='text-capitalize'>
                        flash
                    </span>
                  </button>
                </div>
              )
            }

            {
              button && (
                <div className="w-75">
                  <ConfirmButton 
                    text={textbtn}
                    onClickBack={onClickBack}
                    onClick={onClick}
                  />
                </div>
              )
            }
          </div>
        )}
      </div>
    );
}

export default ScanQr