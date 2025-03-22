import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";

import {addCryptoData, resetCryptoData} from '../../../context/slice/updateCryptoSlice';

import './blockToken.scss';
function BlockToken({ ...props }) {
    const { isExpanded } = props;
    const [count, setCount] = useState(0);
    const dispatch = useDispatch();

    var cryptoSelector = useSelector((state) => state.crypto);
    
    useEffect(() => {
        if(cryptoSelector.data[0]){
            let start = 0;
            const end = cryptoSelector.total[0].price?.toFixed(2)
            const duration = 1000; // 2 seconds
            const stepTime = 10; // update interval
        
            const interval = setInterval(() => {
                start += Math.ceil(end / (duration / stepTime));
                if (start >= end) {
                start = end;
                clearInterval(interval);
                }
                setCount(start);
            }, stepTime);
            
            return () => clearInterval(interval);
        }
        
      }, [isExpanded]);
    return (

        cryptoSelector.data[0] && (
        <div className="BlockToken text-center">
            {/* {cryptoSelector[0]?.map((data, id) => { */}
                {!isExpanded && 
                    <div className="d-flex flex-column justify-conent-center alaign-item-center">
                        <span className="BlockToken_name">
                            {cryptoSelector.data[0][0].name.name} price
                        </span>
                        <span className="BlockToken_price">
                            {cryptoSelector.data[0][0].price}
                        </span>
                    </div>
                   
                }
                {isExpanded &&

                        <div className="d-flex flex-column justify-conent-center alaign-item-center">
                            <span className="BlockToken_name">
                                price
                            </span>
                            <span className="BlockToken_price">
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 1 }}
                                    className="text-4xl font-bold text-center mt-10"
                                    >
                                    {count.toLocaleString()}
                                </motion.div>
                            </span>
                        </div>
        
                }
            {/* })} */}
        </div>

        )
    );
}

export default BlockToken;
