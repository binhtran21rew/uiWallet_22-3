import React from 'react'
import { motion } from "framer-motion";
import { blo } from "blo";


import './filterDropDown.scss';
function FilterDropDown({...props}) {

    const {isOpen, list, onClick, bgColor, isWallet} = props;
    
    return (
        <div className='FilterDropDown'>
            {!isWallet && (
                <motion.div
                className="FilterDropDown_menu"
                initial={{ opacity: 0, y: -10 }}
                animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                style={{ display: isOpen ? "block" : "none", background: `${bgColor ? "linear-gradient(to bottom, rgba(204, 224, 255, 1), rgba(138, 46, 255, 1))" : "rgba(79, 79, 79, 0.4)"}`}}
                >
                <ul>
                {list?.map((item, id) => {
                        return (
                            <li key={`${id}.${item.name}`} onClick={() => onClick(id)}>
                                {item.name}
                            </li>
                        );
                })}
                </ul>
                </motion.div>

            )}

            {isWallet && (
                <motion.div
                className="FilterDropDown_menu"
                initial={{ opacity: 0, y: -10 }}
                animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                style={{ display: isOpen ? "block" : "none", background: bgColor && `rgb(255, 255, 255)`, width: "200px"}}
                >
                <ul>
                {list?.map((item, id) => {
                        return (
                            <li key={`${id}.${item.name}`} onClick={() => onClick(id)}>
                                <div className="BlockContentInfo_icon me-2">
                                    <img
                                        alt={
                                            item.name
                                        }
                                        src={blo(
                                            item.name
                                        )}
                                        width={36}
                                        height={36}
                                        style={{ borderRadius: 8 }}
                                    />
                                </div>
                                <span className='text-black ms-3'>
                                    {item.name}
                                </span>
                            </li>
                        );
                })}
                </ul>
                </motion.div>

            )}
        </div>
    )
}

export default FilterDropDown