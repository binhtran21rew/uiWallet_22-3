import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import Icon from "../../../component/Icon";
import RangeInput from "../../../component/RangeInput";
import ConfirmButton from "../confirmButton/ConfirmButton";
import Lottie from "lottie-react";
import { modifiedBGColor} from "../../../component/animation";
import shield  from "../../../assets/animation/shied.json";

import { addMonthsToDateNow } from "../../../component/generateString";
import {updateBlockWallet} from '../../../context/slice/updateBLockWalletSlice';



function WalletBlockCodeTimeKey({...props}) {
    const location = useLocation();
    const navigate = useNavigate();

    const {setIsPopup, setPopupAlert, setFormPopup, setBtnAlert, setEventClickPopup, idWallet, type} = props;
    var blockWalletSelector = useSelector((state) => state.blockWallet);
    const dispatch = useDispatch();
    

    const [selectedPeriod, setSelectedPeriod] = useState(12);
    const [isSetTime, setIsSetTime] = useState(false);
    const [formatDate, setFormatDate] = useState();
    const [periodOptions, setPeriodOptions] = useState([]);
    const [isCustomKey, setIsCustomKey] = useState(false);

    const listRef = useRef(null);
    const clickItemRef = useRef(null)
    const [isDragging, setIsDragging] = useState(false);
    const [startY, setStartY] = useState(0);
    const [scrollTop, setScrollTop] = useState(0);
    
    const [valueRange, setValueRange] = useState(0);


    const getClientY = (e) => (e.touches ? e.touches[0].clientY : e.clientY || 0);

    useEffect(() => {
        const options = Array.from({ length: 24 }, (_, i) => ({
          value: i + 1,
          label: `${i + 1} Month`,
        }));
        setPeriodOptions(options);
    }, []);

    useEffect(() => {
        
        setFormatDate(addMonthsToDateNow(selectedPeriod))
        
    }, [selectedPeriod]);

    
    useEffect(() => {
        const ref = listRef.current;
        if(!ref) return;
        let isSwiping = false;

        const handleMouseDown = (e) => {
            setIsDragging(true);
            setStartY(getClientY(e));
            setScrollTop(ref.scrollTop || 0);
            isSwiping = false;
        }

        const handleMouseMove = (e) => {
            if(!isDragging) return;
            const currentY = getClientY(e);
            const deltaY = currentY - startY;

            if (Math.abs(deltaY) > 5) {
                isSwiping = true;
                ref.scrollTop = scrollTop - deltaY;
            }
        }

        const handleMouseUp = (e) => {
            setIsDragging(false);      
            if(!isSwiping){
                setSelectedPeriod(e.target.closest(".period-item")?.dataset.value || selectedPeriod);
            }

        }

        ref.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);

        ref.addEventListener("touchstart", handleMouseDown, { passive: true });
        window.addEventListener("touchmove", handleMouseMove);
        window.addEventListener("touchend", handleMouseUp);


        return () => {
          
            ref.removeEventListener( "mousedown", handleMouseDown);
            ref.removeEventListener("touchstart", handleMouseDown, { passive: true });
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);

            window.removeEventListener("touchmove", handleMouseMove);
            window.removeEventListener("touchend", handleMouseUp);
        };
    }, [isDragging, startY, scrollTop]);
      
    const onClickBack = (stage) => {
        if(stage === 1){
            navigate(-1);
        }else if(stage === 2){
            setIsSetTime(false);
            setIsCustomKey(false);
        }else{
            setIsPopup(false);
        }
    }

    const handleNext = (stage) => {
        if(stage === 1){
            setPopupAlert(false);
            setIsSetTime(true);
        }
        if(stage === 2){
            dispatch(updateBlockWallet({idWallet, type, time: selectedPeriod}))
            setBtnAlert(true);
            setEventClickPopup("block");
            setFormPopup({
                icon: <Lottie
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
                text: `Are you sure to lock this wallet in ${selectedPeriod} month?`
            })
            setPopupAlert(true);
            setIsPopup(true);
        }
    }

    const ListRow = ({ index, style }) => {
        const startIndex = index * 2;
        const items = periodOptions.slice(startIndex, startIndex + 2);

        return(
            <div className="">
                {items.map((option) => (
                    
                    <div
                        key={option.value}
                        className="period-item"
                        data-value={option.value}
                    >
                        {option.label}
                    </div>

                ))}
            </div>
        )
    }

    return (
        <div className="BlockTop d-flex flex-column">
            <span className="text-label my-3">Code time key</span>
            <div className="text-white mb-4">
                <span>
                Basiccally lock your asset in a safe place for a period of time like a treasury.
                </span>
                <span className="text-decoration-underline ms-2">
                    Learn more.
                </span>
            </div>

            {!isSetTime && (
                <div className="Block_wrapper_time">
                    <div className="d-flex justify-content-between bg-white-blur p-3 rounded-4">
                        <span className="text-blur">Period</span>
                        <span className="fw-bold">{selectedPeriod} month</span>
                    </div>
                    <div className="d-flex align-items-center mt-2">
                        <Icon name={"iconInfo"} />
                        <span
                            className="text-white ps-2"
                            style={{ fontSize: 12 }}
                        >
                            Expected release date
                        </span>
                        <span
                            className="text-white ps-2"
                            style={{ fontSize: 14 }}
                        >
                            {formatDate}
                        </span>
                    </div>
                    <div  className="period-list-bg bg-white-blur" >
                        <div ref={listRef} className="period-list">
                            {periodOptions.map((option, index) => (
                                 <ListRow key={index} index={index} style={{}} />
                            ))}
                        </div>
                    </div>
                    <div
                        className="w-75"
                        style={{
                            position: "absolute",
                            top: "64%",
                            left: "12%",
                        }}
                    >
                        <ConfirmButton
                            text={"next"}
                            onClickBack={() => onClickBack(1)}
                            onClick={() => handleNext(1)}
                        />
                    </div>
                </div>
            )}

            {isSetTime && (
                <div className="Block_wrapper">
                    <div className="row d-flex flex-row">
                        <div className="text-label col-4">
                            <span className="slider-label left">Lock rate</span>
                        </div>
                        <div className="col-8">
                            <RangeInput
                                setValueRange={setValueRange}
                                valueRange={valueRange}
                                defaults={false}
                            />
                        </div>
                    </div>
                    <div
                        className="w-75"
                        style={{
                            position: "absolute",
                            top: "80%",
                            left: "12%",
                        }}
                    >
                        <ConfirmButton
                            text={"next"}
                            onClickBack={() => onClickBack(2)}
                            onClick={() => handleNext(2)}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default WalletBlockCodeTimeKey;
