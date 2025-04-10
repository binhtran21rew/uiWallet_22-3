import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { FixedSizeList as List } from "react-window";
import { useDispatch, useSelector } from "react-redux";

import './showHistory.scss';
import { generateListHistory, parseDate, isDateInRange } from '../../../component/generateString';
import {  linkDetailTransaction, status } from '../../../constant';
import Icon from '../../../component/Icon';
import BlockFilter from '../blockFilter/BlockFilter';

function ShowHistory({...props}) {
    var historySelector = useSelector((state) => state.history);
    const dispatch = useDispatch();

    const navigate = useNavigate();
    

    const {isSearch, history, setReport} = props;

    const [searchQuery, setSearchQuery] = useState("");
    const [isDragging, setIsDragging] = useState(false);
    const [startY, setStartY] = useState(0);
    const [scrollTop, setScrollTop] = useState(0);
    const outerRef = useRef(null);
    
    const [extendedList, setExtendedList] = useState([]);
    const clickedHashRef = useRef(null); 
    const [isFilter, setIsFilter] = useState(false);
    const [showPopup, setShowPopup] = useState([]);
    const [dataFilter, setDataFilter] = useState([]);

    const getClientY = (e) => (e.touches ? e.touches[0].clientY : e.clientY || 0);
    
    
    useEffect(() => {
        console.log(dataFilter, historySelector.data[0]);
        
        const filteredHistory = historySelector.data[0].filter(tx => {
            if (dataFilter.name && dataFilter.name.trim() !== "") { 
                const nameFilter = dataFilter.name.toLowerCase().trim();
                const fromName = tx.from?.name?.toLowerCase().trim() || "";
                const sendName = tx.send?.name?.toLowerCase().trim() || "";
        
        
                if (fromName.includes(nameFilter) || sendName.includes(nameFilter)) {
                    return true;
                }
                
                return false;
            }
        
            return (
                (!dataFilter.amount || (tx.amount >= dataFilter.amount[0] && tx.amount <= dataFilter.amount[1])) ||
                (!dataFilter.dataTime || isDateInRange(tx.time, dataFilter.dataTime)) ||
                (!dataFilter.status || tx.status.toLowerCase() === dataFilter.status.toLowerCase()) ||
                (!dataFilter.time || dataFilter.time === "All")
            );
        });
        
        setExtendedList([
            ...filteredHistory,
            { isAddList: true },
        ]);
    }, [dataFilter]);

    useEffect(() => {
        if (searchQuery) {
            const filteredHistory = historySelector.data[0].filter((item) =>
                item.hash.toLowerCase().includes(searchQuery) ||
                item.from.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setExtendedList([
                ...filteredHistory,
                { isAddList: true },
            ]);
        } else {
            setExtendedList([
                ...historySelector.data[0],
                { isAddList: true },
            ]);
        }
    }, [searchQuery, historySelector.data]);

    console.log(clickedHashRef.current);
    
    useEffect(() => {
        let isSwiping = false;


        const handleMouseDown = (e) => {     
            setIsDragging(true);
            setStartY(getClientY(e));
            setScrollTop(outerRef.current.scrollTop || 0);
            isSwiping = false;

            clickedHashRef.current = e.target.closest(".ShowHistory_wrapper")?.dataset.hash || null;

            
        };

        const handleMouseMove = (e) => {
            if(!isDragging) return;
            clickedHashRef.current = null;
            const currentY = getClientY(e);
            const deltaY = currentY - startY;

            if (Math.abs(deltaY) > 5) {
                isSwiping = true;
                outerRef.current.scrollTop = scrollTop - deltaY;
            }
        };

        const handleMouseUp = () => {
            setIsDragging(false);
            
            if (!isSwiping && clickedHashRef.current) {
                navigate(linkDetailTransaction,  {state: {hash: clickedHashRef.current}})
            }
            
        };

        if (outerRef.current) {
            outerRef.current.addEventListener("mousedown", handleMouseDown);
            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mouseup", handleMouseUp);

            outerRef.current.addEventListener("touchstart", handleMouseDown, { passive: true });
            window.addEventListener("touchmove", handleMouseMove);
            window.addEventListener("touchend", handleMouseUp);
        }

        return () => {
            if (outerRef.current) {
                outerRef.current.removeEventListener( "mousedown", handleMouseDown);
                outerRef.current.removeEventListener("touchstart", handleMouseDown, { passive: true });
            }
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);

            window.removeEventListener("touchmove", handleMouseMove);
            window.removeEventListener("touchend", handleMouseUp);
        };
    }, [isDragging, startY, scrollTop]);

    
    const ListRow = ({ index, style }) => {
        const startIndex = index * history;
        const items = extendedList.slice(startIndex, startIndex + history);
        
        return (
            <div
                style={{...style,  marginLeft: 0, marginRight: 0 }}
            >
                {items.map((item, id) => {
                    
                    return(
                        item.isAddList ? (
                            <div  key={id}>
                            </div>
                        ) : (
                            <div data-hash={item.hash} className="ShowHistory_wrapper mt-3" key={id}>
                                <div className="ShowHistory_wrapper_item w-100 row d-flex flex-column">
                                    <div className="item_text col d-flex">
                                        <div className='me-2'>{status[item.status]}</div>
                                        <span style={{fontSize: 16}}>{item.hash}</span>
                                    </div>
                                    <div className="item_name col d-flex justify-content-between mt-2">
                                        <div className="">
                                            <span className='text-capitalize me-2'>to:</span>
                                            <span>
                                            {item.send.address.slice(0, 6)}...{item.send.address.slice(-4)}   
                                            </span>
                                        </div>
                                        <div className="">
                                            <span>{item.send.name}</span>
                                        </div>
                                    </div>
                                    <div className="item_info col d-flex justify-content-between mt-2">
                                        <div className="fw-bold">
                                            <span className='me-3'>MTD:</span>
                                            <span>850 wei</span>
                                        </div>
                                        <div className="">
                                            <span className=''>{item.time}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="ShowHistory_wrapper_icon">
                                    <Icon name="iconArrowRight" height={20} width={25}/>
                                </div>
                            </div>
                        )

                    )
                }

                )}
            </div>
        );
    };
    return (
        <div className='ShowHistory'>
            {!isSearch && (
                <div className="ShowHistory_top d-flex justify-content-between">
                    <span className='text-capitalize text-white'>recent transactions</span>
                    <span className='text-white'>View all</span>
                </div>
            )}
            {isSearch && (
                <div className="ShowHistory_top row d-flex mt-4 mb-4">
                    <div className="col-12  d-flex justify-content-between align-items-center">
                        <span className='text-capitalize fs-5 text-white'>History</span>
                        <div className='d-flex align-items-center' >
                            <span className='text-capitalize me-3 text-white fs-small'>report</span>
                            <div onClick={() => setReport(true)}><Icon name={"iconReport"}/></div>
                        </div>
                    </div>
                    <div className="ShowHistory_search col-12 d-flex  mt-3">
                        <div className="search w-100  me-3">
                            <div className="">
                                <Icon name="iconSearch"/>
                            </div>
                            <input type="text" placeholder='Search...' onChange={(e) => setSearchQuery(e.target.value)}/>
                        </div>
                        <div onClick={() => setIsFilter(!isFilter)} className="ShowHistory_filter rounded-3 d-flex justify-content-center align-items-center "><Icon name={"iconFilter"}/></div>
                    </div>
                </div>
            )}

            <div ref={outerRef} style={{ maxHeight: "550px", overflowY: "auto" }}>
                {extendedList.map((item, index) => (
                    <ListRow key={index} index={index} style={{}} />
                ))}
            </div>

            {isFilter && (
                <div className={`ShowHistory_popup `} 
                style={{backdropFilter: isFilter && 'blur(8px)'}}
                >
                    <div className="w-100">
                    <BlockFilter 
                        setIsOpen = {setIsFilter}
                        setDataFilter= {setDataFilter}
                    />

                    </div>
                </div>

            )}
        </div>
    )
}

export default ShowHistory