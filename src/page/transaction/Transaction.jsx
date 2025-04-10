import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Lottie from "lottie-react";
import animationData from "../../component/animation";

import "./transaction.scss";
import BlockContent from "../../layouts/component/blockContent/BlockContent";
import { useDispatch, useSelector } from "react-redux";
import NumericKeyBoard from "../../layouts/component/numericKeyboard/NumericKeyBoard";
import Icon from "../../component/Icon";
import ConfirmButton from "../../layouts/component/confirmButton/ConfirmButton";
import Popup from "../../layouts/component/popup/Popup";
import { imageSuccess, imageToken, topup, linkTopup } from "../../constant";
import { modifiedBGColor } from "../../component/animation";
import error from '../../assets/animation/error.json';

import success from '../../assets/animation/success.json';
function Transaction() {
    const location = useLocation();
    const navigate = useNavigate();


    const { name,  idWallet} = location.state;

    var walletSelector = useSelector((state) => state.wallet);
    const dispatch = useDispatch();

    const [isInput, setIsInput] = useState(false);
    const [activeInputId, setActiveInputId] = useState(null);
    const [amounts, setAmounts] = useState({});
    const [isError, setIsError] = useState({});
    const [isOpen, setIsOpen] = useState(false);
    const [showPopup, setShowPopup] = useState([]);

    const [isTopup, setIsTopup] = useState(false); 
    const inputRef = useRef([]);
    const buttonRef = useRef(null);
    const keyboardRef = useRef(null);



    useEffect(() => {
        if(name === "topup"){        
            setIsTopup(true);
            setIsOpen(true);
            setShowPopup(topup)
        }
    }, [name]);



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


    const handleConfirm = (type) => {
        if(type === "success"){
            navigate('/cart')
        }else{
            setIsError({});
            setIsOpen(false);
        }
    }

    const handleSubmit = () => {
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

        if(Object.keys(newErrors).length === 0){
            setIsOpen(Object.keys(newErrors).length === 0);
            setShowPopup([{
                icon:
                    <Lottie
                        animationData={modifiedBGColor(
                            success,
                            235,
                            235,
                            235,
                        )}
                        loop
                        autoplay
                        style={{ width: 80, height: 80 }}
                    />,
                
                text: "Withdraw Successful!",
                button: true,
                textbtn: "Submit",
                onClick: () => handleConfirm('success'),
            }])
        }else if (Object.keys(newErrors).length === 2){
            
            setIsOpen(Object.keys(newErrors).length === 2);
            setShowPopup([{
                icon:
                <Lottie
                    animationData={modifiedBGColor(
                        error,
                        225,
                        235,
                        235
                    )}
                    loop
                    autoplay
                    style={{ width: 80, height: 80 }}
                />,
                text: "Failed! Please try again after 5 minutes!",
                button: true,
                textbtn: "retry",
                onClick: () => handleConfirm('retry'),
            }])
        }
        setIsInput(false);
        setIsTopup(false);
    };

    const handleClickTopup = (id) => {
        navigate(linkTopup, {state: {idTopup: id}});
    }


    
    return (
        <div className={`Transaction`}>
            {isOpen && (
                <div className={`Transaction_popup `} 
                style={{backdropFilter: 'blur(8px)'}}
                >
                    <div className="w-100">
                        {name === "topup" && isTopup ? (
                            <Popup
                                isOpen={isOpen}
                                setIsOpen={setIsOpen}
                                button={false}
                            >
                                <div className="">
                                    <div className="col mt-3">
                                        <span>Select provider to get a quote</span>
                                    </div>
                                    {showPopup.map((item, id) => {
                                        return(
                                            <div className="col mt-3">
                                                <div className="col p-2 bg-box mt-3 rounded-3" key={id}>
                                                    <div className="d-flex" style={{
                                                        position: "relative",
                                                    }}
                                                    onClick={() => handleClickTopup(id)}
                                                    >
                                                        {item.text === "transak" ? (
                                                            <div className="transak">
                                                                <div className="">
                                                                    {item.icon}
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div className="">
                                                                { item.icon }
                                                            </div>
                                                        )}
                                                        <div className="d-flex flex-column ms-3">
                                                            <span className="text-capitalize fw-bold">
                                                                {item.text}
                                                            </span>
                                                            <span className="fs-small text-blur">
                                                                {item.detail}
                                                            </span>
                                                        </div>

                                                    
                                                            <div className="" style={{
                                                                    position:"absolute",
                                                                    right: "5%",
                                                                    bottom: "30%",
                                                                }}>
                                                                <Icon color={ "rgba(79, 79, 79, 0.4)"} name={ "iconArrowRight"}/>
                                                            </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                    <div className="col mt-3 mb-3">
                                        <span>Fees availability and purchase limits vary between providers you can check their quotes and select one that works best for you.</span>
                                    </div>
                            </div>
                            </Popup>

                        ) : (
                            
                            <Popup
                                isOpen={isOpen}
                                setIsOpen={setIsOpen}
                                textBtn={showPopup[0].textbtn}
                                isAlert={true}
                                listAlert={showPopup}
                            />
                        )}

                    </div>
                </div>

            )}

            <div className="">
                <span className="text-white text-capitalize fs-5">
                    {name}
                </span>
            </div>

            <div className="Transaction_BlockContent mb-4 w-100">
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
                            name: walletSelector.data[0].assets[idWallet].name,
                            balance:
                                walletSelector.data[0].assets[idWallet]
                                    .quantity,

                            error: 'Insufficient USDT balance!',
                            isError: isError
                        },
                        {
                            readOnly: true,
                            type: "deposit",
                            name: walletSelector.data[0].assets[idWallet].name,
                            balance:
                                walletSelector.data[0].assets[idWallet]
                                    .quantity,
                            error: 'Insufficient USDT balance!',
                            isError: isError
                        },
                    ]}
                />
            </div>
            <div className="Transaction_Inputboard">
                {!isInput && (
                    <div className="Transaction_button">
                        <ConfirmButton
                            text={"confirm"}
                            onClick={handleSubmit}
                        />
                    </div>
                )}
                {isInput && (
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
                                handleInputChange(activeInputId, value)
                            }
                        />
                    </>
                )}
            </div>
            
            <div>
                <span className="text-label">Receiving address</span>
            </div>
            <div className="mt-3">
                <BlockContent type={"showInfoWallet"} isToken={true} showId={idWallet} />
            </div>
               





        </div>
    );
}

export default Transaction;
