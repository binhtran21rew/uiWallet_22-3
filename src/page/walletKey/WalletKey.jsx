import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";


import './walletKey.scss';

import Popup from "../../layouts/component/popup/Popup";

import Lottie from 'lottie-react';
import { modifiedBGColor } from '../../component/animation';
import success from '../../assets/animation/success.json';
import BlockContent from '../../layouts/component/blockContent/BlockContent';
import NumericKeyBoard from '../../layouts/component/numericKeyboard/NumericKeyBoard';
import WalletBlockTimeKey from '../../layouts/component/walletBlockTimeKey/WalletBlockTimeKey';
import WalletBlockKey from '../../layouts/component/walletBlockKey/WalletBlockKey';
import WalletBlockDraw from '../../layouts/component/walletBlockDraw/WalletBlockDraw';

import WalletBlockCodeTimeKey from '../../layouts/component/walletBlockTimeKey/WalletBlockCodeTimeKey';
import WalletBlockCodeKey from '../../layouts/component/walletBlockKey/WalletBlockCodeKey';


function WalletKey({...props}) {

    const location = useLocation();
    const navigate = useNavigate();

    var walletSelector = useSelector((state) => state.wallet);
    var blockWalletSelector = useSelector((state) => state.blockWallet);
    const dispatch = useDispatch();


    const {idWallet, type} = location.state;


    const [isPopup, setIsPopup] = useState(false);
    const [formPopup, setFormPopup] = useState([])
    const [popupAlert, setPopupAlert] = useState(false);
    const [btnAlert, setBtnAlert] = useState(true);
    const [eventClickPopup, setEventClickPopup] = useState("");
    
    const [oldKey, setOldKey] = useState("");

        
    const onClickBack = () => {
        setIsPopup(false);
    }

    const handleClickPopup = (stage) => {
        
        if(stage === "block"){
            setBtnAlert(false);
            setFormPopup([
                {text: "Lock time is a feature to keep your asset safe over a period of time."},
                {text: "This is a powerful function to prevent your assets from criminalacts. Even they state your private key, your asset can Still be safe in the original place."},
                {text: "Please keep in mind that this key cand unlock by anyone or any kinds of key. Your asset will automatically unlocked when the time is over only."},
            ])
            
            setPopupAlert(false);
        }

        if(stage === "submit"){
            if(oldKey.length === 0) return;
            setPopupAlert(true);
            setFormPopup({
                icon:
                    <Lottie
                        animationData={modifiedBGColor(
                            success,
                            235,
                            235,
                            235
                        )}
                        loop
                        autoplay
                        style={{ width: 80, height: 80 }}
                    />,
                
                text: "Withdraw Successful!",
                button: true,
                textbtn: "Submit",
                onClick: () => handleConfirm('success'),
            })
        }
    }

    const handleConfirm = (type) => {
        if(type === "success"){
            navigate('/cart')
        }
    }
    const onOldKeyChange = (id, value) => {
        setOldKey(value)
    }

    // const handleSubmit = () => {
    //     if(Object.keys(isError).length === 0){
    //         setPopupAlert(true);
    //         setIsPopup(Object.keys(isError).length === 0);
    //         setFormPopup({
    //             icon:
    //                 <Lottie
    //                     animationData={modifiedBGColor(
    //                         success,
    //                         235,
    //                         235,
    //                         235
    //                     )}
    //                     loop
    //                     autoplay
    //                     style={{ width: 80, height: 80 }}
    //                 />,
                
    //             text: "Withdraw Successful!",
    //             button: true,
    //             textbtn: "Submit",
    //             onClick: () => handleConfirm('success'),
    //         })
    //     }else if (Object.keys(isError).length === 2){
    //         setPopupAlert(true);
    //         setIsPopup(Object.keys(isError).length === 2);
    //         setFormPopup({
    //             icon:
    //             <Lottie
    //                 animationData={modifiedBGColor(
    //                     error,
    //                     235,
    //                     235,
    //                     235
    //                 )}
    //                 loop
    //                 autoplay
    //                 style={{ width: 80, height: 80 }}
    //             />,
    //             text: "Failed! Please try again after 5 minutes!",
    //             button: true,
    //             textbtn: "retry",
    //             onClick: () => handleConfirm('retry'),
    //         })
    //     }
    //     setIsInput(false);
    // };


    
    return (
        <div className='WalletKey'>
            {isPopup && (
                 <div className="w-100 h-100" style={{position: 'absolute', top: 0, left: 0, zIndex: 999, backdropFilter: "blur(8px)" }}>
                    <div className="" style={{
                        position: 'absolute',
                        bottom: "0",
                        width: "100%"
                    }}>
                        {popupAlert && (
                            <Popup 
                                isOpen={isPopup}
                                setIsOpen={setIsPopup}
                                textBtn={"next"}
                                button={btnAlert}
                                isAlert={true}
                                listAlert={[formPopup]}
                                onClickBack={onClickBack}
                                onClick={() => handleClickPopup(eventClickPopup)}
                            />
                        )}

                        {!popupAlert && (
                            <Popup 
                                isOpen={isPopup}
                                setIsOpen={setIsPopup}
                                button={btnAlert}
                                textBtn={"submit"}
                                onClick={() => handleClickPopup("submit")}
                                onClickBack={onClickBack}
                            >
                                {formPopup.map((data, id) => {
                                    return(
                                        <>
                                            {!data.label &&(
                                            <li key={id} className='py-2'>{data.text}</li>
                                            )}

                                            {data.label && (
                                                <div className="" key={id}>
                                                    <span className='fw-bold text-capitalize'>{data.label}</span>
                                                    <div className="mt-3">
                                                        <BlockContent 
                                                            type="boxInput"
                                                            listBox={[
                                                                {placeholder: data.placeHolder, icon: data.icon, value: oldKey}
                                                            ]}
                                                            onInputChange={onOldKeyChange}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    )
                                })}
                            </Popup>
                        )}

                    </div>
                </div>
            )}
            {type === "time" && (
                // <WalletBlockCodeTimeKey 
                //     setPopupAlert={setPopupAlert}
                //     setIsPopup={setIsPopup}
                //     setFormPopup={setFormPopup}
                //     setBtnAlert={setBtnAlert}
                //     setEventClickPopup={setEventClickPopup}
                //     idWallet={idWallet}
                //     type={type}
                // />
                <WalletBlockTimeKey 
                    setPopupAlert={setPopupAlert}
                    setIsPopup={setIsPopup}
                    setFormPopup={setFormPopup}
                    setBtnAlert={setBtnAlert}
                    setEventClickPopup={setEventClickPopup}
                    idWallet={idWallet}
                    type={type}
                />
      
            )} 

            {type === "key" && (
                <>
                    <WalletBlockCodeKey 
                        isPopup={isPopup}
                        setPopupAlert={setPopupAlert}
                        setIsPopup={setIsPopup}
                        setFormPopup={setFormPopup}
                        setBtnAlert={setBtnAlert}
                        setEventClickPopup={setEventClickPopup}
                        idWallet={idWallet}
                        type={type}
                    />
                        {/* <WalletBlockKey 
                            isPopup={isPopup}
                            setPopupAlert={setPopupAlert}
                            setIsPopup={setIsPopup}
                            setFormPopup={setFormPopup}
                            setBtnAlert={setBtnAlert}
                            setEventClickPopup={setEventClickPopup}
                            idWallet={idWallet}
                            type={type}
                        /> */}
                </>
            )}

            {type === "draw" && (  
                <WalletBlockDraw 
                    setPopupAlert={setPopupAlert}
                    setIsPopup={setIsPopup}
                    setFormPopup={setFormPopup}
                    setBtnAlert={setBtnAlert}
                    setOldKey={setOldKey}
                    setEventClickPopup={setEventClickPopup}
                />
            )}
        </div>
    )
}


export default WalletKey

