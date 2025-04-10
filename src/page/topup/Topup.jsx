import React, { useState, useEffect, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { useDispatch, useSelector } from "react-redux";
import { format } from 'date-fns';


import BlockContent from "../../layouts/component/blockContent/BlockContent";
import Icon from "../../component/Icon";
import ConfirmButton from "../../layouts/component/confirmButton/ConfirmButton";
import NumericKeyBoard from "../../layouts/component/numericKeyboard/NumericKeyBoard";
import { useLocation, useNavigate } from "react-router-dom";
import { imageCountDown, imageToken, linkCart, linkShowWallet, linkTopup, listToken, topup } from "../../constant";
import { formatTime } from "../../component/generateString";

import "./topup.scss";
import Popup from "../../layouts/component/popup/Popup";
import Lottie from "lottie-react";
import { modifiedBGColor } from "../../component/animation";
import error from '../../assets/animation/error.json';
import success from '../../assets/animation/success.json';
import FormOTP from "../../layouts/component/formOTP/FormOTP";


function Topup({ ...props }) {
    const location = useLocation();
    const navigate = useNavigate();
    var walletSelector = useSelector((state) => state.wallet);

    
    const { idTopup } = location.state;

    const [idToken, setIdToken] = useState(0);
    const [showIdWallet, setShowIdWallet] = useState(0);
    const [amountTopup, setAmountTopup] = useState(0);
    const [showTopup, setShowTopup] = useState(idTopup);
    const [isQR, setIsQR] = useState(false);

    const [countdown, setCountdown] = useState(100);
    const [overTime, setOverTime] = useState(false); 
    const [transaction, setTransaction] = useState(false);
    const [isPopup, setIsPopup] = useState(false);
    const [showPopup, setShowPopup] = useState([]);
    const [isOTP, setIsOTP] = useState(false);
    const [currentDateTime, setCurrentDateTime] = useState(new Date().toLocaleString());


    
    useEffect(() => {
        if(isQR && !isOTP){
            if(countdown <= 0){
                setOverTime(true);
                return;
            } 
    
            const timer = setInterval(() => {
                setCountdown((prev) => prev - 1);
            }, 1000);
    
            return () => clearInterval(timer);
        }

    }, [isQR, countdown, isOTP]);

    useEffect(() => {
        if(overTime){  
            navigate(linkShowWallet, {replace: true, state: {isWallet: false, idWallet: 0, alert: true}});
        }
    }, [overTime]);
    
    
    const [qrData, setQrData] = useState({
        name: walletSelector.data[0].name,
        addressWallet: walletSelector.data[0].addressWallet,
        dateTime: format(currentDateTime, 'dd MMM yyyy, HH:mm:ss'),
        status: "success"
    });

    useEffect(() => {
        setShowTopup(idTopup);
    }, [idTopup]);

    useEffect(() => {
        setAmountTopup(0);
        keyboardRef.current.setInput("");
    }, [showTopup]);

    const inputRef = useRef(null);
    const keyboardRef = useRef(null);
    const buttonRef = useRef(null);

    const handleInputTopupAmount = (id, value) => {
        setAmountTopup(value.replace(/\D/g, ""));
    };

    const handleSubmit = () => {
        setIsQR(true);
    };


    const handleBack = () => {
        if(transaction){

        }else{
            setIsPopup(true);

            setShowPopup([{
                icon:
                    <Lottie
                        animationData={modifiedBGColor(
                            error,
                            235,
                            235,
                            235
                        )}
                        loop
                        autoplay
                        style={{ width: 80, height: 80 }}
                    />,
                text: "Cancel this transaction?",
                button: true,
                textbtn: "confirm",
                onClick: () => navigate(-1),
                onClickBack: () => setIsPopup(false)
            }])

        }
    }

    const handleInputChange = (id, value) => {
        setAmountTopup(value.replace(/\D/g, ""));
    };

    const handleShareScreen = () => {
        setIsOTP(true);
        setQrData((prev) => ({...prev, amount: amountTopup}))
    }

    const onClickBack = () => {
        navigate(linkTopup, {state: {idTopup: idTopup}})
        setIsQR(false);
        setIsOTP(false)
    }

    

    return (
        <div className="Topup">
            {!isOTP && (
                <div className="text-label fs-4 mb-4 d-flex justify-content-between"> 
                    <span>
                        top up
                    </span>
                    {isQR && (
                        <div className="d-flex align-items-center bg-white-blur p-3 rounded-4">
                            <img width={24} height={24} src={imageCountDown} alt="imageCountDown" />
                            <span>
                                {
                                    formatTime(countdown) 
                                }
                            </span>
                        </div>
                    )}

                </div>
            )}
            {!isQR && !isOTP && (
                <>
                    <div className="">
                        <BlockContent
                            label="tranfer to"
                            type="showFilter"
                            listBox={topup}
                            showId={showTopup}
                            setShowId={setShowTopup}
                            isChange={true}
                        />
                    </div>
                    <div className="row my-4">
                        <div className="col-12">
                            <span className="text-label">amount</span>
                        </div>
                        <div className="col-8">
                            <BlockContent
                                inputRef={inputRef}
                                type="boxInput"
                                listBox={[
                                    {
                                        placeholder: "00",
                                        icon: <Icon name="iconScan2" />,
                                        value: amountTopup,
                                    },
                                ]}
                                onInputChange={handleInputChange}

                                
                            />
                        </div>
                        <div className="col-4">
                            <BlockContent
                                type="showFilter"
                                listBox={listToken}
                                showId={idToken}
                                setShowId={setIdToken}
                                isChange={true}
                                showText={false}
                            />
                        </div>
                    </div>

                    <div className="">
                        <div>
                            <span className="text-label">
                                Receiving address
                            </span>
                        </div>
                        <div className="mt-3">
                            <BlockContent
                                type={"showInfoWallet"}
                                isChange={true}
                                isToken={true}
                                showId={showIdWallet}
                                setShowId={setShowIdWallet}
                            />
                        </div>
                    </div>

                    <div className="Transaction_Inputboard">
                        <>
                            <div className="Transaction_button">
                                <ConfirmButton
                                    text={"confirm"}
                                    buttonRef={buttonRef}
                                    onClick={handleSubmit}
                                />
                            </div>
                            <NumericKeyBoard
                                keyboardRef={keyboardRef}
                                onChange={(value) =>
                                    handleInputTopupAmount(showTopup - 1, value)
                                }
                            />
                        </>
                    </div>
                </>
            )}


            {isQR && !isOTP && (
                <div className="">
                    <div className="d-flex justify-content-between bg-white-blur p-3 rounded-4">
                        <span className="text-blur text-capitalize">Amount</span>
                        <span className="fw-bold text-uppercase">{amountTopup} {listToken[idToken].text}</span>
                    </div>

                    <div className="bg-white-blur p-3 rounded-4 mt-4">
                        <div className="d-flex justify-content-between">
                            <span className="text-capitalize fw-bold">scan QR to top up</span>
                            <span><Icon name="iconImage"/></span>
                        </div>
                        <div className="text-center my-3">
                            <QRCodeCanvas 
                                value={JSON.stringify(qrData)} 
                                size={200} 
                                level="H" 
                                bgColor="#ffffff" 
                                fgColor="#000000"
                                className="bg-white-blur p-3 rounded-4"
                            />
                        </div>

                        <span className="fw-bold">Payment sent to</span>
                        <div className="d-flex justify-content-between bg-white-blur mt-3 px-3 py-2 rounded-3">
                            <span>{walletSelector.data[0].addressWallet}</span>
                            <span>
                                <Icon name="iconScan2"/>
                            </span>
                        </div>
                    </div>

                    <div className="Topup_button">
                        <ConfirmButton
                            text={"share screen"}
                            buttonRef={buttonRef}
                            onClick={handleShareScreen}
                            onClickBack = {handleBack}
                        />
                    </div>
                </div>
            )}

            {isOTP && (
                    <div className="">
                        <FormOTP 
                            lists={qrData}
                            textbtn="top up again"
                            topup={true}
                            onClickBack={() => onClickBack()}
                            onClick={() => onClickBack()}
                        />

                    </div>
            )}

            {isPopup && (
                    <Popup
                        isOpen={isPopup}
                        setIsOpen={setIsPopup}
                        textBtn={showPopup[0].textbtn}
                        isAlert={true}
                        listAlert={showPopup}
                    />
            )}

        </div>
    );
}

export default Topup;
