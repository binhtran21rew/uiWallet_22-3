import React, { useEffect, useRef, useState } from 'react'
import { Html5QrcodeScanner } from "html5-qrcode";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { toWords } from 'number-to-words';

import BlockContent from '../../layouts/component/blockContent/BlockContent';
import Icon from '../../component/Icon';
import ConfirmButton from '../../layouts/component/confirmButton/ConfirmButton';
import ScanQr from '../../layouts/component/scanQr/ScanQr';
import CustomRadioCheck, { CustomCheckBox } from '../../layouts/component/customRadioCheck/CustomRadioCheck';
import {unit} from '../../constant';

import './send.scss';
import FilterDropDown from '../../layouts/component/filterDropDown/FilterDropDown';
import { formattedUnits } from '../../component/generateString';
import Popup from '../../layouts/component/popup/Popup';
import NumericKeyBoard from '../../layouts/component/numericKeyboard/NumericKeyBoard';
import FormOTP from '../../layouts/component/formOTP/FormOTP';



function Send() {
    const location = useLocation();


    var walletSelector = useSelector((state) => state.wallet);

    const [scannedResult, setScannedResult] = useState(null);
    const [enable, setEnable] = useState(false);
    const [selected, setSelected] = useState("");
    const [isRecipient, setIsRecipient] = useState(true);
    const [isSetWallet, setIsSetWallet] = useState(false);
    const [isShowUnit, setIsShowUnit] = useState(false);
    const [isTips, setIsTips] = useState(false);
    const [showIdWallet, setShowIdWallet] = useState(0);

    const [listUnit, setListUnit] = useState(formattedUnits(unit));
    const [showUnit, setShowUnit] = useState(0);
    const [isPopup, setIsPopup] = useState(false);
    const [isMessage, setIsMessage] = useState(false);
    const [isApprove, setIsApprove] = useState(false);
    const [isOTP, setIsOTP] = useState(false);
    const [isScanning, setIsScanning] = useState(false);

    const [recipient, setRecipient] = useState([]);
    const [nameRecipient, setNameRecipient] = useState("");
    const [amount, setAmount] = useState("0.00");
    const [tip, setTip] = useState("");
    const [message, setMessage] = useState("");
    const [dataApprove, setDataApprove] = useState([]);

    const keyboardRef = useRef(null);
    
    useEffect(() => {
        setIsPopup(false);
    }, [showUnit]);

    const handleClearState = () => {
        setIsSetWallet(false);
        setIsRecipient(false);
        setIsTips(false);
        setIsMessage(false);
        setIsApprove(false);
        setIsOTP(false);
    }

    const handleShowState = (type) => {
        handleClearState();

        if(type === "recipient"){
            setIsRecipient(true);
        }else if(type === "wallet"){
            setIsSetWallet(true)
        }else if(type === "tip"){
            setIsTips(true);
        }else if(type === "message"){
            setIsMessage(true)
        }else if(type === "approve"){
            setIsApprove(true);
            const data = {
                recipient: scannedResult,
                saveUser: nameRecipient,
                amount: amount,
                tips: tip,
                message: message.value
            }
    
            setDataApprove(data)
        }else if(type === "otp"){
            setIsOTP(true);
        }else{

        } 
    }




    const handleInputChange = (value) => {

        setAmount((prev) => {
            if (prev.slice(-1) === ".") {
                return parseFloat(prev).toFixed(2);
            }
    
            let newValue = parseFloat(value).toFixed(2);
            return isNaN(newValue) ? "0.00" : newValue;
        });

    }

    const handleInputTip = (value) => {
        setTip((prev) => {
            if (prev.slice(-1) === ".") {
                return parseFloat(prev).toFixed(2);
            }
    
            let newValue = parseFloat(value).toFixed(2);
            return isNaN(newValue) ? "" : newValue;
        });
    }
    
    const onChangeRecipient = (id, value) => {
        
        setRecipient((prev) => {
            const newRecipient = [...prev];
            
            newRecipient[id] = value;
            console.log(newRecipient);
            
            return newRecipient;
        })

                
    } 

    const onChangeName = (id , value) => {
        setNameRecipient({...nameRecipient, value});
        
    }
    const onChangeMessage = (id, value) => {
        setMessage({...message, value});
    }



    
    return (
        <div className="Send" style={{top: isApprove ? '2%': "10%"}}>
            {isRecipient &&(
                <>
                    <div className="Block_title d-flex justify-content-between align-items-center">
                        <span className='fs-5 text-white'>Recipient information</span>
                        <span className='Block_icon d-flex p-2' onClick={() => setIsScanning(true)}>
                            <Icon name="iconScan1"/>
                            {
                                isScanning && (
                                    <ScanQr setScannedResult={setScannedResult} isScanning={isScanning} setIsScanning={setIsScanning} /> 
                                )
                            }
                        </span>
                    </div>
                    <div className="Block_input mt-4">
                        <BlockContent 
                            type="boxInput" 
                            listBox={[
                                {
                                    placeholder: 'wallet address',
                                    icon: <Icon name="iconScan2"/>,
                                    mt: false,
                                    value: [scannedResult?.wallet]
                                },
                                {
                                    placeholder: 'name',
                                    icon: <Icon name="iconAvatar"/>,
                                    mt: false,
                                    value: [scannedResult?.name]
                                },
                            ]}
                            onInputChange={onChangeRecipient}
                        />
                    </div>
                    <div className="radio-group mt-3">
                            <CustomRadioCheck 
                                checked={enable}
                                onClick={() => setEnable(!enable)}
                                text="save user to whitelist"
                                color="white"
                            />
                            
                    {enable && (
                        <div className="Block_input mt-4">
                        <BlockContent 
                            type="boxInput" 
                            listBox={[
                                {
                                    placeholder: 'enter name ...',
                                    mt: false,
                                    value: nameRecipient[0]
                                },
                            ]}
                            onInputChange={onChangeName}

                        />
                    </div>
                    )}
                    </div>

                    <div className='Block_bottom'>
                        <div className="btn">
                            <ConfirmButton text="next"  onClick={() => handleShowState("wallet")}/>
                        </div>
                    </div>

                
                </>
            )}
            {isSetWallet && (
                <>
                    <div className="Block_title d-flex justify-content-between align-items-center">
                        <span className='fs-5 text-white text-capitalize'>from wallet</span>
                    </div>
                    <div className="mt-3">
                        <BlockContent type={"showInfoWallet"} isChange={true} showAmount={true} isToken={true} showId={showIdWallet} setShowId={setShowIdWallet}/>
                    </div>
                    <div className="m-5 text-center d-flex flex-column">
                        <span className='fs-3 text-white'>Amount</span>
                        <span className='Amout d-flex justify-content-center align-items-center'>{amount} </span>

                        <div className="d-flex  justify-content-center" onClick={() => setIsPopup(true)}>
                            <div className="bg-white-blur px-2 py-1" style={{
                                borderTopLeftRadius: 12,
                                borderBottomLeftRadius: 12,

                            }}>
                                {listUnit[showUnit].icon}
                            </div>
                            <div className='bg-white-blur px-3 py-1' style={{
                                borderTopRightRadius: 12,
                                borderBottomRightRadius: 12,

                            }}>
                                <span className=' me-2'>
                                        {listUnit[showUnit].text}
                                </span>
                                {isPopup ? <Icon name={"iconArrowUp"} /> : <Icon name={"iconArrowDown"} /> }

                            </div>

                        </div>
                    </div>

                    <div className='Block_bottom'>
                        <div className="btn">
                            <ConfirmButton text="next" onClickBack={() => handleShowState("recipient")} onClick={() => handleShowState("tip")}/>
                        </div>
                        <div className="board">
                            <NumericKeyBoard
                                keyboardRef={keyboardRef}
                                onChange={(value) => handleInputChange(value)}
                                dot={true}
                            />
                        </div>
                    </div>
                </>
            )}
            {isTips && (
                <>
                    <div className="Block_title d-flex justify-content-between align-items-center">
                        <span className='fs-5 text-white text-capitalize'>tips</span>
                    </div>
                    <div className="mt-3">
                        <BlockContent 
                            type="boxInput" 
                            listBox={[
                                {
                                    placeholder: 'enter the amount ...',
                                    mt: false,
                                    readOnly: true,
                                    value: tip
                                },
                            ]}
                        />
                    </div>

                    <div className='Block_bottom'>
                        <div className="btn">
                            <ConfirmButton text="next" onClickBack={() => handleShowState("wallet")} onClick={() => handleShowState("message")}/>
                        </div>
                        <div className="board">
                            <NumericKeyBoard
                                keyboardRef={keyboardRef}
                                onChange={(value) => handleInputTip(value)}
                                dot={true}
                            />
                        </div>
                    </div>
                </>
            )}
            {isMessage && (
                <>
                    <div className="Block_title d-flex justify-content-between align-items-center">
                        <span className='fs-5 text-white text-capitalize'>message</span>
                    </div>
                    <div className="mt-3">
                        <BlockContent 
                            type="boxInput" 
                            listBox={[
                                {
                                    placeholder: 'type your node ...',
                                    mt: false,
                                    value: message[0]
                                },
                            ]}
                            onInputChange={onChangeMessage}
                        />
                    </div>

                    <div className='Block_bottom'>
                        <div className="btn">
                            <ConfirmButton text="next" onClickBack={() => handleShowState("tip")} onClick={() => handleShowState("approve")}/>
                        </div>
                    </div>
                </>
            )}
            {isPopup && (
                <div className="BlockContentInfo_box_dropdown" style={{
                    position: 'absolute',
                    top: "-6%",
                    zIndex: 99,
                    width: "360px",
                    backdropFilter: 'blur(8px)'
                }}>
                    <Popup 
                        isOpen={isPopup}
                        setIsOpen={setIsPopup}
                        button={false}
                    >
                    <ul className="d-flex flex-column" >
                        <CustomCheckBox selected={showUnit} setSelected={setShowUnit} items={listUnit}>
                            {
                                (item, isSelected) => (                                                                                
                                <li className="d-flex m-2">
                                    <div className="BlockContentInfo_icon me-2">
                                        {item.icon}
                                    </div>
                                    <div className="d-flex  ms-1 flex-column justify-content-center">
                                        <div className='text-black d-flex'>
                                            <span className='me-2'>
                                            {item.text}

                                            </span>
                                            <span className='me-1'>
                                                {item.unit}
                                            </span>
                                            <span>wei</span>
                                        </div>
                                        <span className="fs-small">
                                            {item.formattedUnit}

                                        </span>
                                    </div>
                                </li>
                                )
                            }
                        </CustomCheckBox>

                        
                    </ul>
                    </Popup>

                </div>
            )}
            {isApprove && (
                    <div className="">
                        <BlockContent listBox={[
                            {
                                label: "from",
                                title: walletSelector.data[0].name,
                                icon: <Icon name="iconWallet"/>,
                                value: walletSelector.data[0].addressWallet,
                                balance: walletSelector.data[0].coldWallet[0].totalWallet,
                                option: true
                            },
                            {
                                label: "Recipient information",
                                title: dataApprove.recipient?.name,
                                value: dataApprove.recipient?.wallet,
                                option: true
    
                            },
                            {
                                label: "Amount (MTD)",
                                title: `${dataApprove.amount} wei`,
                                value: `${toWords(dataApprove.amount)} wei`,
                                option: true
    
                            },
                            {
                                label: "tips (MTD)",
                                title: `${dataApprove.tips} wei`,
                                value: `${toWords(dataApprove.tips)} wei`,
                                option: true
    
                            },
                            {
                                label: "message",
                                title: `${dataApprove.message}`,
                                option: true
    
                            },
                            {
                                label: `${dataApprove.recipient?.payment} price`,
                                title: `${dataApprove.recipient?.amount} wei`,
                                value: `${toWords(dataApprove.recipient?.amount)} wei`,
                                option: true
                            },
                            {
                                label: `fee`,
                                title: `${dataApprove.recipient?.fee} wei`,
                                value: `${toWords(dataApprove.recipient?.fee)} wei`
                            },
    
                        ]}/>

                        <div className='mt-4'>
                            <div className="">
                                <ConfirmButton text="next" onClickBack={() => handleShowState("message")} onClick={() => (handleShowState("otp"))}/>
                            </div>
                        </div>
                    </div>
            )}
            {isOTP && (
                <>
                    <div className="">
                        <FormOTP 
                            lists={dataApprove}
                            payment={true}
                            textbtn="send more"
                            onClickBack={() => handleShowState("approve")}
                        />
                    </div>
                </>
            )}

        </div>
    )
}

export default Send;


