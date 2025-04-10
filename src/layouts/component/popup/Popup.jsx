import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import ConfirmButton from "../confirmButton/ConfirmButton";
import { Calendar, Clock, ChevronLeft } from "lucide-react";
import DatePicker from "react-datepicker";

import "./popup.scss";
import Icon from "../../../component/Icon";
import NumericKeyBoard from "../numericKeyboard/NumericKeyBoard";
import CustomRadioCheck from "../customRadioCheck/CustomRadioCheck";

const Popup = ({ children, ...props }) => {
    const {
        isOpen,
        isAlert=false,
        setIsOpen,
        button = true,
        textBtn,
        onClick,
        listAlert,
        onClickBack,
        blur=true,
        className
    } = props;

    const handleBack = (value, id) => {
        
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="fixed inset-0 flex items-center justify-center bg-black/50">
                <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    drag="y"
                    dragConstraints={{ top: 0, bottom: 200 }}
                    dragElastic={0.5} // Smooth drag effect
                    onDragEnd={(e, info) => {
                        if (info.offset.y > 100) setIsOpen(false); // Close if swiped down enough
                    }}
                    className={`Popup p-6 rounded-lg shadow-lg w-96 ${className}`}
                    style={{ touchAction: "none", backgroundColor: `${blur ? "rgba(235, 235, 235, 0.7)" : "rgb(255, 255, 255)"}` }} // Prevent browser interference
                >
                    <div className="Popup_wrapper row flex-column">
                        <div className="Popup_wrapper_top"></div>

                        {isAlert &&
                            listAlert.map((item, id) => {
                                return (
                                    <div key={id}>
                                        <div className="col">
                                            <div className="d-flex flex-column justify-content-center align-items-center">
                                                <div>
                                                    {item.icon && item.icon}
                                                </div>
                                                <div className="d-flex flex-column text-center">
                                                    <span className="fs-medium fw-bold">
                                                        {item.text}
                                                    </span>
                                                    {item.detail && (
                                                        <span className="text-blur fs-small my-3">{item.detail}</span>
                                                    )}
                                                    {item.report && (
                                                        <span className="text-danger text-center" onClick={item.onClickReport}>
                                                            {item.report}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        {button && (
                                            <div className="col Popup_btn mt-4">
                                                <ConfirmButton
                                                    text={textBtn}
                                                    onClickBack={item.onClickBack || onClickBack}
                                                    onClick={item.onClick || onClick}
                                                />
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        {!isAlert && (
                            <>
                                {children}
                            
                                {button && (
                                    <div className="col Popup_btn mt-4">
                                        <ConfirmButton
                                            text={textBtn}
                                            onClickBack={onClickBack || handleBack()}
                                            onClick={onClick}
                                        />
                                    </div>
                                )}
                            </>    
                        )}

                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Popup;
