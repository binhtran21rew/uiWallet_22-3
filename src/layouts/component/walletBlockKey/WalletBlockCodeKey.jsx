import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Tabs, Tab, TabList, TabPanel } from 'react-tabs';


import Icon from "../../../component/Icon";
import ConfirmButton from "../confirmButton/ConfirmButton";
import Lottie from "lottie-react";
import { modifiedBGColor} from "../../../component/animation";
import success from '../../../assets/animation/success.json'
import BlockContent from "../blockContent/BlockContent";

import {updateBlockWallet} from '../../../context/slice/updateBLockWalletSlice';


function WalletBlockCodeKey({...props}) {
    const location = useLocation();
    const navigate = useNavigate();

    const {isPopup, setIsPopup, setPopupAlert, setFormPopup, setBtnAlert, idWallet, type} = props;
    var blockWalletSelector = useSelector((state) => state.blockWallet);
    const dispatch = useDispatch();
    
    const [isCustomKey, setIsCustomKey] = useState(false);
    const [hashKey, setHashKey] = useState("");
    const [key, setKey] = useState("");
    const [isGenerate, setIsGenerate] = useState(false);
    const [customKey, setCustomKey] = useState("");
    const [errorCustomKey, setErrorCustomKey] = useState(false);
    
    useEffect(() => {
        if(!isPopup && blockWalletSelector.data[idWallet].lockKey){
            navigate(-1);
        }
    }, [blockWalletSelector.data[idWallet].lockKey, isPopup]);



    const generateHash = () => {
        setIsGenerate(true);
        const newHash = Math.random().toString(36).substring(2, 15);
        setKey(newHash);
    };

    const onHashKeyChange = (value) => {
        setHashKey(value)
    }

    const onCustomKeyChange = (id, value) => {
        setCustomKey(value);
    }

    const onClickBack = (stage) => {
        if(stage === 1){
            navigate(-1);
        }else if(stage === 2){
            setIsCustomKey(false);
        }else{
            setIsPopup(false);
        }
    }

    const handleNext = (stage) => {
        if(stage === "customKey"){
            setCustomKey("");
            setBtnAlert(false);
            setErrorCustomKey(false);
            setIsCustomKey(true);
            setIsPopup(true);
            setPopupAlert(false);
            setFormPopup([
                {text: "Lock key is one-time password for withdraw MTD transaction."},
                {text: `This key will be automatically charged after use, please click "lock key" button to get a new one.`},
                {text: `This key can be unlocked, charged with the original key. Please keep in a safe place.`},
            ])
        }
        if(stage === "key"){            
            if(!key) return;
            dispatch(updateBlockWallet({idWallet, type, key: hashKey || key}))

            setIsPopup(true);
            setPopupAlert(true);
            setBtnAlert(false);

            setFormPopup({
                icon: <Lottie
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
            text: `lock successful!`
            })
        }
        if(stage === "hashKey"){            
            if(!hashKey) return;
            dispatch(updateBlockWallet({idWallet, type, key: hashKey || key}))

            setIsPopup(true);
            setPopupAlert(true);
            setBtnAlert(false);

            setFormPopup({
                icon: <Lottie
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
            text: `lock successful!`
            })
        }

        if(stage === "lockWalletCustom"){
            if(customKey.length < 15) {
                setErrorCustomKey(true);
                return;
            }
            dispatch(updateBlockWallet({idWallet, type, key: hashKey || key}))
            setErrorCustomKey(false);
            setIsPopup(true);
            setPopupAlert(true);
            setBtnAlert(false);
            setFormPopup({
                icon: <Lottie
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
                text: `lock successful!`
            })
        }

    }

    
    return (
        <div className="BlockTop d-flex flex-column">
            {!isCustomKey && (
                <>
                    <span className='text-label my-3'>Code key</span>
                    <div className='text-white mb-4'>
                        <span>
                        Protect your asset from fraud. Click "Generate" to get one. 
                        </span>
                        <span className='text-decoration-underline ms-2'>Learn more.</span>
                    </div>


                    <div className="Block_wrapper_key">
                        <Tabs>
                            <TabList className="d-flex p-0 bg-white-blur rounded-3">
                                <Tab className="col-6 text-center p-2 rounded-3">Create</Tab>
                                <Tab className="col-6 text-center p-2 rounded-3" >Add Hashkey</Tab>
                            </TabList>

                            <TabPanel>
                                <div className="d-flex justify-content-between p-4 bg-white-blur rounded-3">
                                    <span className='fs-medium fw-bold'>{key}</span>

                                    {isGenerate && (
                                        <Icon name={"iconScan2"}/>
                                    )}
                                    {!isGenerate && (
                                        <button className='bg-dark text-uppercase py-1 px-3 rounded-3 text-white fs-small' onClick={() => generateHash()}>generate</button>
                                        
                                    )}

                                </div>
                                <div className="mt-3">
                                    <Icon name="iconInfo"/>
                                    <span className='fs-small ms-2 text-white'>Carefully save this raw key</span>
                                </div>

                                <div className="w-75" style={{ 
                                    position: 'absolute',
                                    top: "70%",
                                    left: "12%"
                                }}>
                                    <div className="text-center m-5" onClick={() => handleNext('customKey')}>
                                        <span className='text-decoration-underline text-white'>
                                            or Custom your key
                                        </span>
                                    </div>
                                    <ConfirmButton 
                                        text={"lock wallet"}
                                        onClickBack={() => onClickBack(1)}
                                        onClick={() => handleNext("key")}
                                    />
                                </div>
                            </TabPanel>
                            <TabPanel>
                                <div className="AddHash d-flex  rounded-3" style={{backgroundColor: "rgba(255, 255, 255, 0.4)"}}>
                                    <div className="col-2 align-content-center text-center">
                                        <Icon name={"iconScan1"}/>
                                    </div>
                                    <div className="col-10 d-flex align-items-center pe-3">
                                        <input
                                            onChange={(e) => onHashKeyChange(e.target.value)}
                                            type="text"
                                            placeholder={"enter your key ..."}
                                            value={hashKey}
                                            className="text-capitalize bg-transparent text-gray-500 text-2xl font-medium w-20 outline-none mt-1 no-spinner"
                                            style={{ borderRadius: "8px", padding: 10, width: "100%" }}
                                        />
                                            {hashKey.length !== 0 && (
                                                <div onClick={() => setHashKey("")}>
                                                    <Icon name={"iconClear"}/>
                                                </div>

                                            )}
                                            {hashKey.length === 0 && (
                                                <div className="">
                                                    <Icon name={"iconScan2"}/>
                                                </div>

                                            )}
                                    </div>
                                    <div className="w-75" style={{ 
                                        position: 'absolute',
                                        top: "70%",
                                        left: "12%"
                                    }}>
                                        <ConfirmButton 
                                            text={"lock code"}
                                            onClickBack={() => onClickBack(1)}
                                            onClick={() => handleNext("hashKey")}
                                        />
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>

                    </div>
                </>
            )}
            {isCustomKey && (
                <>
                    <span className='text-label my-3'>custom Code key</span>
                    <div className='text-white mb-4'>
                        <span>
                        Enter your favorite words or phrase in the blank.
                        </span>
                    </div>
                    
                    <div className="">
                        <BlockContent 
                            type="boxInput"
                            listBox={[
                            {placeholder: 'enter here...', icon: <Icon name="iconScan2"/>, value: customKey}
                            ]}
                            onInputChange={onCustomKeyChange}

                        />
                    </div>
                    <div className="mt-3">
                        <Icon name="iconInfo" color={errorCustomKey ? 'red' : 'white'}/>
                        <span className={`fs-small ms-2 ${errorCustomKey ? "text-danger" : "text-white"}`}>
                            at least 15 characters long
                        </span>
                    </div>

                    <div className="w-75" style={{ 
                        position: 'absolute',
                        top: "70%",
                        left: "12%"
                    }}>
                        <ConfirmButton 
                            text={"lock code"}
                            onClickBack={() => onClickBack(2)}
                            onClick={() => handleNext("lockWalletCustom")}
                        />
                    </div>
                </>
            )}

        </div>
    )
}

export default WalletBlockCodeKey