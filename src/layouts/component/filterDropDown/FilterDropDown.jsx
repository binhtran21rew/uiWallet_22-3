import React from 'react'
import { motion } from "framer-motion";


import './filterDropDown.scss';
function FilterDropDown({...props}) {

    const {isOpen, list, onClick} = props;
    
    return (
        <div className='FilterDropDown'>
            <motion.div
            className="FilterDropDown_menu"
            initial={{ opacity: 0, y: -10 }}
            animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ display: isOpen ? "block" : "none" }}
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
        </div>
    )
}

export default FilterDropDown