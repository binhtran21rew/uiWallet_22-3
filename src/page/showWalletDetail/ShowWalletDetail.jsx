import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import BlockContentTopWallet from "../../layouts/component/blockContentTopWallet/BlockContentTopWallet";


import './showWalletDetail.scss' 
import Icon from "../../component/Icon";
import ScanQr from "../../layouts/component/scanQr/ScanQr";
import { modifiedBGColor } from "../../component/animation";
import success from "../../assets/animation/success.json";
import shield  from "../../assets/animation/shied.json";

import ConfirmButton from "../../layouts/component/confirmButton/ConfirmButton";
import Popup from "../../layouts/component/popup/Popup";
import Lottie from "lottie-react";
import BlockContent from "../../layouts/component/blockContent/BlockContent";
import { imageWallet, itemWallet, linkWalletKey } from "../../constant";
import {updateBlockWallet} from '../../context/slice/updateBLockWalletSlice';

function ShowWalletDetail() {

    const location = useLocation();
    const navigate = useNavigate();

    const {idWallet} = location.state;
    var walletSelector = useSelector((state) => state.wallet);
    var blockWalletSelector = useSelector((state) => state.blockWallet);
    
    const dispatch = useDispatch();

    const [isScan, setIsScan] = useState(false);
    const [isScanning, setIsScanning] = useState(false);
    const [scannedResult, setScannedResult] = useState(null);
    const [addWalletQr, setAddWalletQr] = useState(false);
    const [showItemWallet, setShowItemWallet] = useState(itemWallet);

    const [isPopup, setIsPopup] = useState(false);
    const [formPopup, setFormPopup] = useState([]);
    const [oldKey, setOldKey] = useState("");
    const [btnPopup, setBtnPopup] = useState(false);
    const [selectId, setSelectId] = useState();
    const [popupAlert, setPopupAlert] = useState(false);


    useEffect(() => {
        
    }, [blockWalletSelector.data[idWallet]]);
    
    const onOldKeyChange = (id, value) => {
        setOldKey(value)
    }


    const onClickBack = () => {        
        setIsScan(false);
        setIsScanning(false);
        setScannedResult(null);
        setIsPopup(false);
    }


    const handleScan = () => {
        if(!isScan){
            setIsScan(true);
        }else{
            setIsScanning(true);
        }
    }

    const onClickQr = () => {
        setScannedResult({addressWallet: 'fc010f105y 08909fdb87'})
        setIsScan(false);
        setIsScanning(false)
    }

    const onClickBackQr = () => {
        setIsScanning(false);
        setIsScan(false);
        
    }

    const onClickAddWallet = () => {
        setAddWalletQr(true);
    }

    const handleOption = (type, id) => {
        setSelectId(id);
        if(type === 'key'){   
            if(blockWalletSelector.data[id].lockKey){
                setBtnPopup(false);
                setIsPopup(true);
                setPopupAlert(false);
                setFormPopup([
                    {id: id, text: "Turn Lock Key Off", icon: <Icon name="iconArrowRight" color="black"/>, type: "off"},
                    {id: id, text: "update key", icon: <Icon name="iconArrowRight" color="black"/>, type: "update"},
                ])
                return;
            }                   
            navigate(linkWalletKey, {state: {idWallet: id, type: type}})

        }
        if(type === "time"){
            navigate(linkWalletKey, {state: {idWallet: id, type: type}})
        }

        if(type === "draw"){
            navigate(linkWalletKey, {state: {idWallet: id, type: type}})
        }
    }

    const handleConfirm = () => {
        setIsPopup(false);
        dispatch(updateBlockWallet({idWallet: selectId, type: "key", key: ""}))
        setIsPopup(true);
        setPopupAlert(true);
        setBtnPopup(false);
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
            
            text: "Turn Off Successful!",
            button: false,
        })

        
    }
    
    const onClickPopup = (type, id) => {
        if(type === "submitOff"){
            
        }

        if(type === "submitUpdate"){
            dispatch(updateBlockWallet({idWallet: selectId, type: "key", key: ""}))
            navigate(linkWalletKey, {state: {idWallet: selectId, type: "key"}})
        }

        if(type === "update"){
            setOldKey("");
            setBtnPopup(true);
            setPopupAlert(false);
            setFormPopup([
                {label: "wallet key", placeHolder: "enter old raw key", icon: <Icon name="iconScan2"/>}
            ])

        }

        if(type === "off"){
            setBtnPopup(true);
            setIsPopup(true);
            setPopupAlert(true);
            setFormPopup({
                icon:
                    <Lottie
                        animationData={modifiedBGColor(
                            shield,
                            235,
                            235,
                            235
                        )}
                        loop
                        autoplay
                        style={{ width: 80, height: 80 }}
                    />,
                
                text: "Are you sure to turn lock key off?",
                button: true,
                textbtn: "Submit",
                onClick: () => handleConfirm(),
            })
            
        }
    }

    return (
        <div className="ShowWalletDetail">
            {isPopup && (
                <div className="w-100 h-100" style={{position: 'absolute', top: 0, left: 0, zIndex: 999, backdropFilter: "blur(8px)" }}>
                    <div className="" style={{
                        position: 'absolute',
                        top:  `${btnPopup ? "76%" : "82%"}`,
                        width: "100%"
                    }}>
                         {popupAlert && (
                            <Popup 
                                isOpen={isPopup}
                                setIsOpen={setIsPopup}
                                textBtn={"confirm"}
                                button={btnPopup}
                                isAlert={true}
                                listAlert={[formPopup]}
                                onClickBack={onClickBack}
                                onClick={() => onClickPopup("submitOff")}
                            />
                        )}
                        {!popupAlert && (
                            <Popup 
                                isOpen={isPopup}
                                setIsOpen={setIsPopup}
                                button={btnPopup}
                                textBtn="submit"
                                onClick={() => onClickPopup("submitUpdate")}
                                onClickBack={onClickBack}
                            >
                                {formPopup.map((data, id) => {
                                    return(
                                        <>
                                            {!data.label &&(
                                                <div className="d-flex justify-content-between p-3 bg-white-blur my-1 rounded-3" key={id} onClick={() => onClickPopup(data.type, data.id)}>
                                                    <span className="fw-bold text-capitalize fs-small">{data.text}</span>
                                                    <span>{data.icon}</span>
                                                </div>
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
            {isScan && (
                    <div className="w-100 h-100" style={{position: 'absolute', top: 0, left: 0, zIndex: 999, backdropFilter: "blur(8px)" }}>
                        <div className="" style={{
                            position: 'absolute',
                            top: "77%", left: "0%",
                            width: "100%"
                        }}>
                            <Popup 
                                isOpen={isScan}
                                setIsOpen={setIsScan}
                                isAlert={true}
                                listAlert={[{icon: <Icon name="iconCamera"/>, text: "“Metanode” would like to access the camera"}]}
                                textBtn="allow"
                                onClick={() => handleScan()}
                                onClickBack={() => onClickBack()}
                            />

                        </div>
                    </div>
            )}

            {isScanning &&(
                    <ScanQr setScannedResult={setScannedResult} isScanning={isScanning} setIsScanning={setIsScanning} button={true} textbtn={"add manual"} onClick={onClickQr} onClickBack={onClickBackQr}/>
            )}

            {!scannedResult && (
                <>
                    <div className="Block_Top">
                        <BlockContentTopWallet
                            showToken={true}
                            idWallet={idWallet}
                            onClick={handleScan}
                            listBox={{label: "cold device", icon: <Icon name="iconScan1"/>}}
                        />
                    </div>
                    <div className="Block_Top ShowWalletDetail_wrapper">
                        <span className="text-label">source</span>

                        {blockWalletSelector.data.map((item, id) => {
                            return(
                                <div key={id} className="ShowWalletDetail_wrapper_item row py-3 my-3 bg-white-blur rounded-3 d-flex justify-content-between">
                                    <div className="WalletBlock">
                                        {item.lockKey && item.lockTime && (
                                            <Icon name="iconBlockBoth"/>
                                        )}

                                        { item.lockKey && !item.lockTime && (
                                            <Icon name="iconBlockKey"/>

                                        )}
                                        { !item.lockKey && item.lockTime && (
                                            <Icon name="iconBlockTime"/>

                                        )}
                                    </div>
                                    <div className="col-8 d-flex align-items-center">
                                        <div className="">
                                            <Icon name={item.icon}/>
                                        </div>
                                        <div className="ms-3 d-flex flex-column">
                                            <span className="text-capitalize fw-bold">{item.amount} me</span>
                                            <span className="text-blur">{item.address}</span>
                                        </div>
                                    </div>
                                    <div className="item_option col-4 d-flex justify-content-between align-items-center">
                                        <span onClick={() => handleOption("time", id)}>
                                            <Icon name="iconLockTime"/>
                                        </span>
                                        <span onClick={() => handleOption("draw", id)}>
                                            <Icon name="iconWalletLock"/>
                                        </span>
                                        <span onClick={() => handleOption("key", id)}>
                                            <Icon name="iconLockKey"/>
                                        </span>
                                    </div>

                                </div>
                            )
                        })}

                    </div>
                </>
            )}


            {scannedResult && (
                <div className="Block_Top">
                    <div className="text-center d-flex flex-column align-items-center">
                        <img src={imageWallet} alt="image wallet" width={84} height={84}/>
                        <span className="pt-4 text-label">Add receive address</span>
                    </div>

                    <div className="mt-3">
                        <span className="text-white">wallet address</span>
                        <BlockContent 
                            type="boxInput"
                            listBox={[
                                {
                                    placeholder: 'enter your address',
                                    icon: <Icon name="iconScan2"/>,
                                    value: [scannedResult?.addressWallet]
                                },
                            ]}
                        />
                    </div>

                    <div className="w-75" style={{ 
                        position: 'absolute',
                        top: "77%",
                        left: "12%"
                    }}>
                        <ConfirmButton 
                            text={"confirm"}
                            onClickBack={onClickBack}
                            onClick={onClickAddWallet}
                        />
                    </div>

                    {addWalletQr && (
                        <div className="w-100 h-100" style={{position: 'absolute', top: 0, left: 0, zIndex: 999, backdropFilter: "blur(8px)" }}>
                            <div className="" style={{
                                position: 'absolute',
                                top: "84%",
                                width: "100%"
                            }}>
                                <Popup 
                                    isOpen={addWalletQr}
                                    setIsOpen={setAddWalletQr}
                                    isAlert={true}
                                    listAlert={[
                                        {
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
                                        
                                        text: "Add receive address successful!",
                                        }
                                    ]}
                                    button={false}
                                />

                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default ShowWalletDetail;

