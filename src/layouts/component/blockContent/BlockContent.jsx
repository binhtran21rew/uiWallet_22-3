import React, { useEffect, useRef,  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { blo } from "blo";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { CheckCircle, Circle } from "lucide-react";


import "./blockContent.scss";
import Icon from "../../../component/Icon";
import NumericKeyBoard from "../numericKeyboard/NumericKeyBoard";
import FilterDropDown from "../filterDropDown/FilterDropDown";
import Popup from '../popup/Popup';
import CustomRadioCheck, {CustomCheckBox} from "../customRadioCheck/CustomRadioCheck";


function BlockContent({ children, ...props }) {
    var walletSelector = useSelector((state) => state.wallet);

    const [isOpen, setIsOpen] = useState(false);
    const [changeId, setChangeId] = useState(0);
    const dispatch = useDispatch();
    
    const {
        type,
        listBox,
        inputRef,
        amounts,
        onInputChange,
        onFocus,
        showId,
        setShowId,
        isChange,
        showAmount,
        label,
        showText = true,
        onClickScan,
        bgInput = true,
    } = props;

    useEffect(() => {
        setIsOpen(false);
        
    }, [showId]);
    
    
    const handleChangeId = (id) => {
        
        setShowId(id);
    }
    
    switch (type) {
        case "showFilter": return(
            <div className="BlockContentInfo">
                { 
                    label && (
                        <div className="mb-3">
                            <span className="text-label">
                                {label}

                            </span>
                        </div>
                    )
                }
                <div className={`BlockContentInfo_wrapper BlockContentInfo_wrapper_blur d-flex align-items-center`}>
                    <div
                        className={`BlockContentInfo_wrapper_left col-9  align-items-center flex-row d-flex `}
                    >
                        <div className="BlockContentInfo_text d-flex align-items-center justify-content-between">

                            {listBox[showId].text === "transak" ? (
                                <div className="transak">
                                    <div className="">
                                        {listBox[showId].icon}
                                    </div>
                                </div>
                            ) : (
                                listBox[showId].icon && (
                                    <div className="">
                                        { listBox[showId].icon }
                                    </div>
                                )
                            )}
                            {showText && listBox[showId].text && (
                                <span className="ps-3 fw-bold fs-medium">
                                    {listBox[showId].text}
                                </span>

                             )}
                        </div>
    
                    </div>   
                    {isChange && (
                        <div className="BlockContentInfo_wrapper_right d-flex col-3 justify-content-end">
                            <div className={`BlockContentInfo_wrapper_box`} onClick={() => setIsOpen(true)}>
                            
                                {isOpen ? <Icon name={"iconArrowUp"} /> : <Icon name={"iconArrowDown"} /> }

                            </div>
                                {isOpen && (
                                    <div className="BlockContentInfo_box_dropdown" style={{
                                        position: 'absolute',
                                        top: "25%",
                                        right: "4%",
                                        zIndex: 8,
                                        width: "360px",
                                        backdropFilter: 'blur(8px)'
                                    }}>
                                        <Popup 
                                            isOpen={isOpen}
                                            setIsOpen={setIsOpen}
                                            textBtn="confirm"
                                            onClick={() => handleChangeId(changeId)}
                                        >
                                        <ul className="d-flex flex-column">
                                            <CustomCheckBox selected={changeId} setSelected={setChangeId} items={listBox}>
                                                {
                                                    (item, isSelected) => (                                                                                
                                                    <li className="d-flex m-2 ">
                                                        <div className="BlockContentInfo_icon me-2">
                                                        {item.text === "transak" ? (
                                                            <div className="transak">
                                                                <div className="">
                                                                    {item.icon}
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            listBox[showId].icon && (
                                                                <div className="">
                                                                    { item.icon }
                                                                </div>
                                                            )
                                                        )}
                                                        </div>
                                                        {listBox[showId].text && (
                                                            <div className="d-flex ms-3 flex-column justify-content-center">
                                                                <span className='text-black'>
                                                                    {item.text}
                                                                </span>
                                                            </div>
                                                        )}
                                                    </li>
                                                    )
                                                }
                                            </CustomCheckBox>

                                            
                                        </ul>
                                        </Popup>

                                    </div>

                                )}
                        </div>

                    )}
                    
                </div>
            </div>
        )
        case "showInfoHistory": return(
            <div className="BlockContentInfo">
            <div
                className={`BlockContentInfo_wrapper 
                    BlockContentInfo_wrapper_blur d-flex align-items-center`}
            >
                <div
                    className={`BlockContentInfo_wrapper_left col-9  align-items-center flex-row d-flex `}
                >
                    <div className="BlockContentInfo_text d-flex flex-column">
                        <span>
                            {walletSelector.data[0].name}
                        </span>
                        <div className="d-flex align-items-center">
                            <div className="me-2">
                                <Icon name="iconWallet"/>

                            </div>
                            <span className="">
                                {
                                    walletSelector.data[0].coldWallet[showId]
                                        .address
                                }
                            </span>
                        </div>
                        <div className="d-flex align-items-center">
                            <div className="me-1">
                                <span className="text-capitalize text-blur ">balance (MTD):</span>
                            </div>
                            <span className="">
                                {
                                    walletSelector.data[0].coldWallet[showId]
                                        .totalWallet
                                } wei
                            </span>
                        </div>
                    </div>
                </div>
                <div className="BlockContentInfo_wrapper_right d-flex col-3 justify-content-end">
                    <div className={`BlockContentInfo_wrapper_box`} onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <Icon name={"iconArrowUp"} /> : <Icon name={"iconArrowDown"} /> }
                        <div className="BlockContentInfo_box_dropdown" style={{
                            position: 'absolute',
                            top: "200%",
                            right: "-28%",
                            zIndex: 8
                        }}>
                            <FilterDropDown
                                bgColor={true}
                                isOpen={isOpen}
                                list={walletSelector.data[0].coldWallet}
                                onClick={setShowId}
                                isWallet={true}
                            />

                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
        case "showInfoWallet":
            return (
                <div className="BlockContentInfo">
                    <div
                        className={`BlockContentInfo_wrapper 
                            BlockContentInfo_wrapper_blur d-flex align-items-center`}
                    >
                        <div
                            className={`BlockContentInfo_wrapper_left col-9  align-items-center flex-row d-flex `}
                        >
                            {props.isToken && (
                                <div className="BlockContentInfo_icon me-2 px-2">
                                    {listBox?.icon && listBox.icon}
                                    {!listBox && (
                                        <img
                                            alt={
                                                walletSelector.data[0].coldWallet[showId]
                                                    .name
                                            }
                                            src={blo(
                                                walletSelector.data[0].coldWallet[showId]
                                                    .name
                                            )}
                                            width={36}
                                            height={36}
                                            style={{ borderRadius: 8 }}
                                        />
                                    )}
                                </div>
                            )}
                            <div className="BlockContentInfo_text d-flex flex-column justify-content-between">
                                <span >
                                    {listBox?.label || walletSelector.data[0].coldWallet[showId].name}
                                </span>
                                <span>
                                    { listBox?.text ||
                                        walletSelector.data[0].coldWallet[showId]
                                            .address
                                    }
                                    
                                </span>
                                
                            {showAmount && (
                                <span className="d-flex" style={{height: 20}}>
                                    <p className="me-2">
                                        balance
                                    </p>
                                    {
                                        walletSelector.data[0].coldWallet[showId].totalWallet
                                    }
                                    
                                </span>
                                    
                            )}
                            </div>

                        </div>
                        {props.isToken ? (
                            <>
                                {isChange && 
                                    <div className="BlockContentInfo_wrapper_right d-flex col-3 justify-content-end">
                                        <div className={`BlockContentInfo_wrapper_box`} onClick={() => setIsOpen(true)}>
                                        
                                            {isOpen ? <Icon name={"iconArrowUp"} /> : <Icon name={"iconArrowDown"} /> }
                                        </div>

                                        {isOpen && (
                                            <div className="BlockContentInfo_box_dropdown" style={{
                                                position: 'absolute',
                                                top: "30%",
                                                left: "3%",
                                                zIndex: 8,
                                                width: "360px",
                                                backdropFilter: 'blur(8px)'
                                            }}>
                                                <Popup 
                                                    isOpen={isOpen}
                                                    setIsOpen={setIsOpen}
                                                    textBtn="confirm"
                                                    onClick={() => handleChangeId(changeId)}
                                                >
                                                <ul className="d-flex flex-column">
                                                    <CustomCheckBox selected={changeId} setSelected={setChangeId} items={walletSelector.data[0].coldWallet}>
                                                        {
                                                            (item, isSelected) => (                                                                                
                                                            <li className="d-flex m-2 ">
                                                                <div className="BlockContentInfo_icon me-2">
                                                                    <img
                                                                        alt={item.name}
                                                                        src={blo(item.name)}
                                                                        width={36}
                                                                        height={36}
                                                                        style={{ borderRadius: 8 }}
                                                                    />
                                                                </div>
                                                                <div className="d-flex ms-3 flex-column justify-content-center">
                                                                    <span className='text-black'>
                                                                        {item.name}
                                                                    </span>
                                                                    <span className="fs-small">
                                                                        {item.address}

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
                                    </div>
                                }
                            </>
                        
                        ) : (
                            <div className="BlockContentInfo_wrapper_right d-flex col-3 justify-content-end">
                                <div className={`BlockContentInfo_wrapper_box`} onClick={() => onClickScan()}>
                                    
                                    {listBox?.icon || <Icon name="iconScan2" />}
                                    
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            );
        case "boxInput":
            return listBox.map((item, id) => {
                if(item.type === 'withdraw' || item.type === "deposit"){
                    return(
                        <div key={id} className={`${item.isError[id] && "position-relative mb-5"}`}>
                            {item.isError[id] && (
                                <div className={"position-absolute text-danger d-flex bottom-0 start-0"} style={{transform: "translateY(120%)"}}>
                                    <div className="me-2">
                                        <Icon name={"iconError"}/>
                                    </div>
                                    <span>
                                        {item.error}
                                    </span>
                                </div>

                            )}
                            <div
                                className={`BoxInput flex-column mt-3 ${item.isError[id] && 'error'}`}
                                onFocus={() => onFocus(id)}
                                style={{backgroundColor: `${bgInput ? "rgba(255, 255, 255, 0.4)" : "unset"}`}}
                            >
                                <div className="col d-flex justify-content-between">
                                    <span className="text-capitalize text-black">
                                        {item?.type}
                                    </span>
                                    <span className="text-capitalize">
                                        balance: {item?.balance}
                                    </span>
                                </div>
                                <div className="col d-flex justify-content-between mt-2">
                                    <div className="">
                                        <input
                                            readOnly={item.readOnly}
                                            ref={(el) => (inputRef.current[id] = el)}
                                            type="text"
                                            value={amounts[id]}
                                            onChange={(e) => onInputChange(id, e.target.value)}
                                            className="bg-transparent text-gray-500 text-2xl font-medium w-20 outline-none mt-1 no-spinner"
                                            placeholder="000"
                                            min={0}
                                        />
                                    </div>
                                    <span className="text-uppercase text-black">
                                        {item?.name}
                                    </span>
                                </div>
                            </div>

                        </div>
                    )
                }else{
                    return(
                        <div key={id} className="">
                            {item.label && (
                                <div className="fw-bold text-capitalize my-2">{item.label}</div>
                            )}
                            <div  className={`BoxInput d-flex align-items-center ${item.mt ? 'mt-3' : "mt-1"}`}
                                style={{backgroundColor: `${bgInput ? "rgba(255, 255, 255, 0.4)" : "unset"}`}}
                            >
                                <input
                                    onChange={(e) => onInputChange(id, e.target.value)}
                                    readOnly={item.readOnly}
                                    type="text"
                                    placeholder={item.placeholder}
                                    value={item.value}
                                    
                                    className="input text-capitalize bg-transparent text-gray-500 text-2xl font-medium w-20 outline-none mt-1 no-spinner"
                                    style={{ borderRadius: "8px", padding: 10, width: "100%" }}
                                />
                                {/* {item.icon &&  item.position && (
                                    <div style={{ position: "absolute", right: "5%", bottom: "20%" }}>
                                        {item.icon}
                                    </div>
                                )} */}
                                {item.icon &&   (
                                    <div>
                                        {item.icon}
                                    </div>
                                )}
                            </div>

                        </div>

                    )
                }

            });
        default:
            return listBox.map((item, id) => {
                
                return(
                    <div className="d-flex flex-column justify-content-center mt-3">
                        <span className="text-white text-capitalize">{item.label}</span>
                        <div className="row  bg-white-blur rounded-3 py-2 ">
                            <div className="col text-capitalize fw-bold">{item.title}</div>
                            <div className="">
                                {item.icon && (
                                    <span className="me-2">
                                        {item.icon}
                                    </span>
                                )}
                                <span className="text-blur " style={{fontSize: 12}}>
                                    {item.detail}

                                </span>
                                {item.balance && (
                                    <div className="">
                                        <span className="text-capitalize text-blur me-2">balance (MTD):</span>
                                        <span>{item.balance} wei</span>
                                    </div>
                                )}

                            </div>
                        </div>
                    </div>

                )
            })
    }
}

export default BlockContent;
