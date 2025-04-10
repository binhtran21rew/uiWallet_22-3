import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import BlockContent from "../blockContent/BlockContent";
import { Tabs, Tab, TabList, TabPanel } from 'react-tabs';


import Icon from "../../../component/Icon";
import ConfirmButton from "../confirmButton/ConfirmButton";
import NumericKeyBoard from "../numericKeyboard/NumericKeyBoard";
import { modifiedBGColor } from "../../../component/animation";
import success from '../../../assets/animation/success.json'
import Lottie from "lottie-react";



function WalletBlockDraw({...props}) {
    const location = useLocation();
    const navigate = useNavigate();

    var walletSelector = useSelector((state) => state.wallet);

    const {setIsPopup, setPopupAlert, setFormPopup, setBtnAlert, setOldKey} = props;

    const keyboardRef = useRef(null);
    const inputRef = useRef([]);
    const buttonRef = useRef(null);

    const [hashKey, setHashKey] = useState("");
    const [rawKey, setRawKey] = useState("");

    const [isGenerate, setIsGenerate] = useState(false);
    
    const [amounts, setAmounts] = useState({});
    const [isError, setIsError] = useState({});
    const [isInput, setIsInput] = useState(false);
    const [activeInputId, setActiveInputId] = useState(null);
    const [isConfirmDraw, setIsConfirmDraw] = useState(false);


    const generateHash = () => {
        setIsGenerate(true);
        const newHash = Math.random().toString(36).substring(2, 15);
        setRawKey(newHash);
    };


    const onHashKeyChange = (value) => {
        setHashKey(value)
    }
    const onRawKeyChange = (value) => {
        setRawKey(value)
    }

    const handleInputChange = (id, value) => {        
        setAmounts((prev) => ({
            ...prev,
            [id]: value.replace(/\D/g, ""), // Allow only numbers
        }));
    };

    const handleFocus = (id) => {
        setIsInput(true);
        setActiveInputId(id);

        if (keyboardRef.current) {
            keyboardRef.current.setInput(amounts[id] || ""); // Restore saved value
        }
        setTimeout(() => inputRef.current[id]?.focus(), 0);
    };


    const onClickBack = (stage) => {
        if(stage === 1){
            navigate(-1);
        }else{
            setIsConfirmDraw(false);
        }
    }

    const handleNext = (stage) => {
        if(stage === "draw"){
            const newErrors = {};
            walletSelector.data[0].assets.forEach((item, id) => {
                if (
                    amounts[id] &&
                    parseInt(amounts[id]) > parseInt(item.quantity)
                ) {
                    newErrors[id] = true;
                }
            });
            setIsError(newErrors);
            

            if(Object.keys(isError).length === 0 && Object.keys(amounts).length > 1){
                setIsConfirmDraw(true);
            }
        }
        
        if(stage === "hashKey"){
            setHashKey("");
            if(!hashKey) return;
            setIsPopup(true);
            setPopupAlert(true);
            setBtnAlert(true)
            
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
                onClick: () => navigate('/cart'),
            })
        }

        if(stage === "rawKey"){
            setRawKey("");
            if(!rawKey) return;
            setOldKey("");
            setIsPopup(true);
            setPopupAlert(false);
            setBtnAlert(true)
            
            setFormPopup([
                {label: "wallet key", placeHolder: "enter old raw key", icon: <Icon name="iconScan2"/>}
            ])
        }
    }

    return (
        <div className="BlockTop d-flex flex-column">
            {isConfirmDraw && (
                <>
                    <span className="text-label my-3">comfirm withdraw</span>

                    <div className="Block_wrapper_key">
                        <Tabs>
                            <TabList className="d-flex p-0 bg-white-blur text-center rounded-3 text-capitalize">
                                <Tab className="col-6  p-2 rounded-3">
                                    by hashkey
                                </Tab>
                                <Tab className="col-6  p-2 rounded-3">
                                    by rawkey
                                </Tab>
                            </TabList>

                            <TabPanel>
                                <div
                                    className="AddHash d-flex  rounded-3"
                                    style={{
                                        backgroundColor:
                                            "rgba(255, 255, 255, 0.4)",
                                    }}
                                >
                                    <div className="col-2 align-content-center text-center">
                                        <Icon name={"iconScan1"} />
                                    </div>
                                    <div className="col-10 d-flex align-items-center pe-3">
                                        <input
                                            onChange={(e) =>
                                                onHashKeyChange(e.target.value)
                                            }
                                            type="text"
                                            placeholder={
                                                "enter new hashkey ..."
                                            }
                                            value={hashKey}
                                            className="text-capitalize bg-transparent text-gray-500 text-2xl font-medium w-20 outline-none mt-1 no-spinner"
                                            style={{
                                                borderRadius: "8px",
                                                padding: 10,
                                                width: "100%",
                                            }}
                                        />
                                        {hashKey && (
                                            <div onClick={() => setHashKey("")}>
                                                <Icon name={"iconClear"} />
                                            </div>
                                        )}
                                        {!hashKey && (
                                            <div className="">
                                                <Icon name={"iconScan2"} />
                                            </div>
                                        )}
                                    </div>
                                    <div
                                        className="w-75"
                                        style={{
                                            position: "absolute",
                                            top: "70%",
                                            left: "12%",
                                        }}
                                    >
                                        <ConfirmButton
                                            text={"comfirm"}
                                            onClickBack={() => onClickBack(2)}
                                            onClick={() => handleNext("hashKey")}
                                        />
                                    </div>
                                </div>
                            </TabPanel>
                            <TabPanel>
                                <div
                                    className="AddHash d-flex rounded-3"
                                    style={{
                                        backgroundColor:
                                            "rgba(255, 255, 255, 0.4)",
                                    }}
                                >
                                    <div className="col-2 align-content-center text-center">
                                        <Icon name={"iconScan1"} />
                                    </div>
                                    <div className="col-10 d-flex align-items-center pe-3">
                                        <input
                                            onChange={(e) =>
                                                onRawKeyChange(e.target.value)
                                            }
                                            type="text"
                                            placeholder={
                                                "enter new rawKey ..."
                                            }
                                            value={rawKey}
                                            className="text-capitalize bg-transparent text-gray-500 text-2xl font-medium w-20 outline-none mt-1 no-spinner"
                                            style={{
                                                borderRadius: "8px",
                                                padding: 10,
                                                width: "100%",
                                            }}
                                        />
                                        {rawKey && (
                                            <div
                                                onClick={() => {
                                                    setRawKey("");
                                                }}
                                            >
                                                <Icon name={"iconClear"} />
                                            </div>
                                        )}
                                        {!rawKey && (
                                            <div className="">
                                                <Icon name={"iconScan2"} />
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="text-end mt-3">
                                    <button
                                        className="bg-dark text-uppercase py-1 px-3 rounded-3 text-white fs-small"
                                        onClick={() => generateHash()}
                                    >
                                        generate
                                    </button>
                                </div>
                                <div
                                    className="w-75"
                                    style={{
                                        position: "absolute",
                                        top: "70%",
                                        left: "12%",
                                    }}
                                >
                                    <ConfirmButton
                                        text={"comfirm"}
                                        onClickBack={() => onClickBack(2)}
                                        onClick={() => handleNext("rawKey")}
                                    />
                                </div>
                            </TabPanel>
                        </Tabs>
                    </div>
                </>
            )}

            {!isConfirmDraw && (
                <>
                    <span className="text-label my-3">Withdraw</span>
                    <div className="" style={{ position: "relative" }}>
                        <div className="Transaction_BlockContent_circle">
                            <Icon name="iconArrowDownStraight" />
                        </div>
                        <BlockContent
                            type={"boxInput"}
                            inputRef={inputRef}
                            amounts={amounts}
                            onInputChange={handleInputChange}
                            onFocus={handleFocus}
                            listBox={[
                                {
                                    readOnly: true,
                                    type: "withdraw",
                                    name: walletSelector.data[0].assets[0].name,
                                    balance:
                                        walletSelector.data[0].assets[0]
                                            .quantity,
                                    isError: isError,
                                    error: "Insufficient USDT balance!",
                                },
                                {
                                    readOnly: true,
                                    type: "deposit",
                                    name: walletSelector.data[0].assets[0].name,
                                    balance:
                                        walletSelector.data[0].assets[0]
                                            .quantity,
                                    isError: isError,
                                    error: "Insufficient USDT balance!",
                                },
                            ]}
                        />
                    </div>

                    <span className="text-label my-3">wallet address</span>
                    <div className="mt-3">
                        <BlockContent
                            type={"showInfoWallet"}
                            isToken={true}
                            showId={0}
                            listBox={{
                                icon: <Icon name={"iconCard"} />,
                                label: walletSelector.data[0].name,
                                text: walletSelector.data[0].addressWallet,
                            }}
                        />
                    </div>

                    <div className="Transaction_Inputboard">
                        {!isInput && (
                            <div className="Transaction_button">
                                <ConfirmButton
                                    text={"next"}
                                    onClickBack={() => onClickBack(1)}
                                    onClick={() => handleNext("draw")}
                                />
                            </div>
                        )}
                        {isInput && (
                            <>
                                <div className="Transaction_button">
                                    <ConfirmButton
                                        text={"next"}
                                        buttonRef={buttonRef}
                                        onClickBack={() => onClickBack(1)}
                                        onClick={() => handleNext("draw")}
                                    />
                                </div>
                                <NumericKeyBoard
                                    keyboardRef={keyboardRef}
                                    onChange={(value) =>
                                        handleInputChange(activeInputId, value)
                                    }
                                />
                            </>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export default WalletBlockDraw;
