import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { QRCodeCanvas } from "qrcode.react";



import './receive.scss';
import Icon from '../../component/Icon';
import ConfirmButton from '../../layouts/component/confirmButton/ConfirmButton';
import { useLocation, useNavigate } from 'react-router-dom';
import Popup from '../../layouts/component/popup/Popup';
function Receive() {
    const location = useLocation();
    const navigate = useNavigate();
    
    var walletSelector = useSelector((state) => state.wallet);
    const [isPopup, setIsPopup] = useState(false);


    const onClickBack = (type) => {
        if(type === "submit"){
            setIsPopup(false)
        }else{
            navigate(-1);
        }
    }

    const handleNext = (type) => {
        if(type === "share"){
            setIsPopup(false);
        }else{
            setIsPopup(true);
        }
    }
    return (
        <div className="Receive">
            {isPopup && (
                <div className="w-100 h-100" style={{position: 'absolute', top: 0, left: 0, zIndex: 999, backdropFilter: "blur(8px)" }}>
                    <div className="" style={{
                        position: 'absolute',
                        bottom: "0",
                        width: "100%"
                    }}>
                        <Popup 
                            isOpen={isPopup}
                            setIsOpen={setIsPopup}
                            button={true}
                            textBtn={"submit"}
                            onClick={() => onClickBack("submit")}
                            onClickBack={() => handleNext("share")}
                        >
                            <>
                                <div className="d-flex justify-content-between align-items-center bg-white-blur px-3 py-2 rounded-3">
                                    <div className="d-flex flex-column">
                                        <span className='text-black-blur'>name</span>
                                        <span className='text-label text-black-blur fw-bold text-capitalize'>{walletSelector.data[0].name}</span>
                                    </div>
                                    <div className="">
                                        <Icon name="iconArrowDown" color={"black"}/>
                                    </div>
                                </div>

                                <div className="d-flex flex-column mx-3 my-4">
                                    <div className='d-flex align-items-center'>
                                        <span className='fs-small text-black text-uppercase'>
                                            number
                                        </span>
                                    </div>
                                    <span className='mb-3 text-black fw-bold'>{walletSelector.data[0].addressWallet}</span>

                                </div>
                                <div className="bg-white-blur p-3 rounded-4 mt-4">
                                    <div className="d-flex justify-content-between">
                                        <span className="text-capitalize fw-bold">scan QR to top up</span>
                                        <span><Icon name="iconImage"/></span>
                                    </div>
                                    <div className="text-center my-3">
                                        <QRCodeCanvas 
                                            value={JSON.stringify(walletSelector.data[0].name)} 
                                            size={200} 
                                            level="H" 
                                            bgColor="#ffffff" 
                                            fgColor="#000000"
                                            className="bg-white-blur p-3 rounded-4"
                                        />
                                    </div>

                                    <span className="fw-bold">link receive</span>
                                    <div className="d-flex justify-content-between bg-white-blur mt-3 px-3 py-2 rounded-3">
                                        <span>http://metanode.co/ghgghgdghdhdh</span>
                                        <span>
                                            <Icon name="iconScan2"/>
                                        </span>
                                    </div>
                                </div>
                            </>
                        </Popup>
                    </div>
            </div>


            )}
            <div className="d-flex justify-content-between align-items-center bg-white-blur px-3 py-2 rounded-3">
                <div className="d-flex flex-column">
                    <span className='text-black-blur'>name</span>
                    <span className='text-label text-black-blur fw-bold text-capitalize'>{walletSelector.data[0].name}</span>
                </div>
                <div className="">
                    <Icon name="iconArrowDown" color={"black"}/>
                </div>
            </div>

            <div className="d-flex flex-column mx-3 my-4">
                <div className='d-flex align-items-center'>
                    <span className='fs-small text-white text-uppercase'>
                        number
                    </span>
                    <div className='ms-3'><Icon name="iconScan2" color={"white"} height="18"/></div>
                </div>
                <span className='mb-3 text-white'>{walletSelector.data[0].addressWallet}</span>

                <div className='d-flex align-items-center'>
                    <span className='fs-small text-white text-uppercase'>
                       balance (MTD)
                    </span>
                    <div className='ms-3'><Icon name="iconEye" height="18" color="white"/></div>
                </div>
                <span className='mb-3 text-white'>8,250,000,000,000 wei</span>
            </div>

            <div className="bg-white-blur p-3 rounded-4 mt-4">
                <div className="d-flex justify-content-between">
                    <span className="text-capitalize fw-bold">scan QR to top up</span>
                    <span><Icon name="iconImage"/></span>
                </div>
                <div className="text-center my-3">
                    <QRCodeCanvas 
                        value={JSON.stringify(walletSelector.data[0].name)} 
                        size={200} 
                        level="H" 
                        bgColor="#ffffff" 
                        fgColor="#000000"
                        className="bg-white-blur p-3 rounded-4"
                    />
                </div>

                <span className="fw-bold">link receive</span>
                <div className="d-flex justify-content-between bg-white-blur mt-3 px-3 py-2 rounded-3">
                    <span>http://metanode.co/ghgghgdghdhdh</span>
                    <span>
                        <Icon name="iconScan2"/>
                    </span>
                </div>
            </div>
            <div className="w-75" style={{ 
                position: 'absolute',
                bottom: "10%",
                left: "12%"
            }}>
                <ConfirmButton 
                    text={"share screen"}
                    onClickBack={() => onClickBack()}
                    onClick={() => handleNext()}
                />
            </div>
        </div>

    )
}

export default Receive