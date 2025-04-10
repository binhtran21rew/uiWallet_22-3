import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";


import BlockContentTopWallet from "../../layouts/component/blockContentTopWallet/BlockContentTopWallet";

import { modifiedBGColor } from "../../component/animation";
import error from '../../assets/animation/error.json';
import BlockNFT from "../../layouts/component/blockNFT/BlockNFT";
import ShowIsToken from "../../layouts/component/showIsToken/ShowIsToken";
import Icon from "../../component/Icon";
import Popup from "../../layouts/component/popup/Popup";

import "./showWallet.scss";
import BlockContent from "../../layouts/component/blockContent/BlockContent";
import { linkShowWallet, imageWallet, linkWalletDetail } from "../../constant";
import ScanQr from "../../layouts/component/scanQr/ScanQr";
import ConfirmButton from "../../layouts/component/confirmButton/ConfirmButton";

function ShowWallet({ ...props }) {
    const location = useLocation();
    const navigate = useNavigate();
    const { isWallet, idWallet, alert = false } = location.state || {};

    var walletSelector = useSelector((state) => state.wallet);
    const dispatch = useDispatch();
    
    const [isPopup, setIsPopup] = useState(alert);

    
    const [showPopup, setShowPopup] = useState([]);
    const [isReport, setIsReport] = useState(false);

    const [inputReport, setInputReport] = useState([]);

    useEffect(() => {
        if(alert){
            setIsPopup(true);
            setTimeout(() => {
                navigate(location.pathname, { replace: true, state: { ...location.state, alert: false } });
            }, 100); 
        }
        
    }, [alert, navigate, location]);


    
    const handleErrorBack = () => {
        setIsPopup(false);
         navigate(linkShowWallet, { replace: true,  state: { ...location.state, alert: false } });

    }

    useEffect(() => {
        if (isPopup) {
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
                text: "Fail! Please try again later",
                report: 'Report issue',
                onClickReport: () => setIsReport(true),
                button: true,
                textbtn: "retry",
                onClick: () => console.log(123),
                onClickBack: () => handleErrorBack()
                
            }])

        }


    }, [isPopup]);
    
    useEffect(() => {
        if(isReport){
            setIsPopup(false);
        }
    }, [isReport]);

    const handleReport = () => {
        console.log(123);
        
    }

    const onClickBack = () => {
        setIsPopup(false);
        setIsReport(false);  
    }

    const onInputChange = (id, value) => {
        setInputReport((prev) => {
            const newData = [...prev];

            newData[id] = value;
            return newData;
        })
        
    }

    const handleItemWallet = (id) => {
        navigate(linkWalletDetail, {state: {idWallet: id}})
    }
    
    const onClick = () => {

    }

    if (!isWallet) {
        return (
            <div className={`${alert && 'h-100 '}`}>
                 <ShowIsToken/>
                {isPopup && !isReport && (
                    <div className="w-100 h-100" style={{position: 'absolute', zIndex: 999, backdropFilter: "blur(8px)" }}>
                        <div className="h-100 w-100" style={{
                            position: 'absolute',
                            top: "71%",
                        }}>
                            {
                                showPopup.length > 0 && (
                                    <Popup
                                    isOpen={isPopup}
                                    setIsOpen={setIsPopup}
                                    textBtn={showPopup[0].textbtn}
                                    isAlert={true}
                                    listAlert={showPopup}
                                    onClickBack={onClickBack}
                                />
                                )
                            }


                        </div>
                    </div>
                )}

                {!isPopup && isReport && (
                    <div className="w-100 h-100" style={{position: 'absolute', zIndex: 999, backdropFilter: "blur(8px)" }}>
                        <div className="h-100 w-100" style={{
                            position: 'absolute',
                            top: "58%",
                            left: 0
                        }}>
                            <Popup
                                isOpen={isPopup}
                                textBtn="report issue"
                                onClick={() => handleReport()}
                                onClickBack={() => onClickBack()}
                            >
                                <div className="">
                                    <BlockContent 
                                        type="boxInput" 
                                        listBox={[
                                            {label: "from", placeholder: 'enter address', value: inputReport[0]},
                                            {label: "send to", placeholder: 'enter address', value: inputReport[1]},
                                            {label: "hash", placeholder: 'enter id', value: inputReport[2]},
                                        ]}
                                        onInputChange={onInputChange}
                                    />
                                </div>
                            </Popup>

                        </div>
                    </div>
                )}
            </div>
       );
    }
    

    return (
        <div className="ShowWallet">
            <div className="Block_Top">
                <BlockContentTopWallet
                    showToken={true}
                    idWallet={idWallet}
                    onClick={onClick}
                />
            </div>

            <div className="Block_main" style={{bottom: "12%"}}>
                <div className="row flex-column p-4">
                    <div className="col">
                        <span className="text-white fs-5 text-capitalize">source</span>
                    </div>

                    {walletSelector.data[0].coldWallet[0].data.length > 0  ? walletSelector.data[0].coldWallet[0].data.map((item, id) => {
                        return(
                            <div key={id} className="BlockWallet_wrapper col" onClick={() => handleItemWallet(id)}>
                                <div className="row ">
                                    <div className="col d-flex align-items-center">
                                        <div className="BlockWallet_circle d-flex  justify-content-center">{id + 1}</div>
                                        <span>
                                            {item.address}
                                        </span>
                                    </div>
                                    <div className="col text-end align-content-center">
                                        <span className="fw-bold ">
                                            {item.balance} ME 
                                        </span>
                                        <span className="text-black">
                                            <Icon name="iconArrowRight"/>
                                        </span>

                                        
                                    </div>
                                </div>
                            </div>
                        )
                    }) : (
                        <div className="BlockWallet_wrapper col">
                            <div className="nodata d-flex flex-column justify-content-center align-items-center">
                                <Icon name="iconNoData"/>
                                <span className="text-uppercase fw-bold">No data</span>
                            </div>
                        </div>
                    )}


                </div>
            </div>
        </div>
    );
}



export default ShowWallet;
