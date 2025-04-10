import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


import "./blockUpdateToken.scss";
import UpdateTokenPrice from "../../../component/UpdateTokenPrice";
import Charts from "../charts/Charts";

import {addCryptoData, resetCryptoData} from '../../../context/slice/updateCryptoSlice';
import {dataUser, linkToken} from '../../../constant';

function BlockUpdateToken({ ...props }) {
    const {ref, isExpanded } = props;
    var cryptoSelector = useSelector((state) => state.crypto);

    const navigator = useNavigate();
    
    const dispatch = useDispatch();
    
    const [prevPercentChange, setPrevPercentChange] = useState(0);

    
    useEffect(() => {

        const interval = setInterval(() => {
            const newCryptoData = UpdateTokenPrice(dataUser.listToken);
            setPrevPercentChange(cryptoSelector.data[0].percentChange);
            dispatch(addCryptoData(newCryptoData));
        }, 10000);
        return () => {
            clearInterval(interval)
        };
    }, [cryptoSelector.data[0]]);


    const onClick = (id) => {
        navigator(linkToken, {state: {idToken: id}});
    }

    

    return cryptoSelector.data[0].map((item, id) => {
        return (
            <div key={`${id}`} className="BlockUpdateToken" ref={(el) => (ref.current[id] = el)} onClick={() => onClick(id)}>
                <div className="BlockUpdateToken_box d-flex h-100">
                    <div className="col-4">
                        <div className="Block_wrapper_right">
                            <div className="Block_wrapper_top">
                                <span className="name">{item.name.name}</span>
                                <div className="detail d-flex">
                                    <span>{item.name.detail} </span>
                                    <span className="dot"></span>
                                    <span>{item.pairValue}</span>
                                </div>
                            </div>
                            <div className="Block_wrapper_bottom">
                                <div
                                    style={{
                                        color:
                                            item.percentChange >
                                            prevPercentChange
                                                ? "green"
                                                : "red",
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    <div>
                                        <span>{item.percentChange}%</span>
                                    </div>
                                    <div
                                        className={`${
                                            item.percentChange >
                                            prevPercentChange
                                                ? "half-right-box"
                                                : "half-left-box"
                                        }`}
                                        style={{
                                            borderRightColor:
                                                item.percentChange >
                                                prevPercentChange
                                                    ? "green"
                                                    : "red",
                                        }}
                                    ></div>
                                </div>

                                <span>${item.valueChange}</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-8 h-100">
                        <div className="Block_wrapper_left">
                            <div className="Block_wrapper_top ">
                                <span className="name">
                                    ${item.price}
                                </span>
                                <div className="detail">
                                    <span>{item.quantity}</span>
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
