import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


import "./blockUpdateToken.scss";
import UpdateTokenPrice from "../../../component/UpdateTokenPrice";
import Charts from "../charts/Charts";

import {addCryptoData, resetCryptoData} from '../../../context/slice/updateCryptoSlice';


function BlockUpdateToken({ ...props }) {
    const { listToken, ref, isExpanded } = props;
    var cryptoSelector = useSelector((state) => state.crypto);
    
    const dispatch = useDispatch();
    
    const [prevPercentChange, setPrevPercentChange] = useState(0);
    const [cryptoData, setCryptoData] = useState(UpdateTokenPrice(listToken));

    
    
    useEffect(() => {
        if(cryptoSelector.data.length === 0) {
            dispatch(addCryptoData(cryptoData));
        }
        
        
        const interval = setInterval(() => {
            const newCryptoData = UpdateTokenPrice(listToken);
            setPrevPercentChange(cryptoData.percentChange);
            setCryptoData(newCryptoData);
            dispatch(addCryptoData(newCryptoData));
        }, 10000);
        return () => {
            clearInterval(interval)
        };
    }, [listToken]);

    

    return listToken?.map((item, id) => {
        return (
            <div key={`${id}.${item}`} className="BlockUpdateToken" ref={(el) => (ref.current[id] = el)}>
                <div className="BlockUpdateToken_box row h-100">
                    <div className="col-4">
                        <div className="Block_wrapper_right">
                            <div className="Block_wrapper_top">
                                <span className="name">{item.name}</span>
                                <div className="detail d-flex">
                                    <span>{item.detail} </span>
                                    <span className="dot"></span>
                                    <span>{cryptoData[id].pairValue}</span>
                                </div>
                            </div>
                            <div className="Block_wrapper_bottom">
                                <div
                                    style={{
                                        color:
                                            cryptoData[id].percentChange >
                                            prevPercentChange
                                                ? "green"
                                                : "red",
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    <div>
                                        <span>{cryptoData[id].percentChange}</span>
                                    </div>
                                    <div
                                        className={`${
                                            cryptoData[id].percentChange >
                                            prevPercentChange
                                                ? "half-right-box"
                                                : "half-left-box"
                                        }`}
                                        style={{
                                            borderRightColor:
                                                cryptoData[id].percentChange >
                                                prevPercentChange
                                                    ? "green"
                                                    : "red",
                                        }}
                                    ></div>
                                </div>

                                <span>${cryptoData[id].valueChange}</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-8 h-100">
                        <div className="Block_wrapper_left">
                            <div className="Block_wrapper_top ">
                                <span className="name">
                                    ${cryptoData[id].price}
                                </span>
                                <div className="detail">
                                    <span>{cryptoData[id].quantity}</span>
                                </div>
                            </div>
                            <div className="Block_wrapper_bottom ">
                                <div className="Block_chart">
                                    <Charts key={`chart-${id}-${isExpanded}`}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    });
}

export default BlockUpdateToken;
