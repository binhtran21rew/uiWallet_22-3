import React, { useRef, useState, useEffect } from 'react'
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Calendar, Clock, ChevronLeft } from "lucide-react";
import DatePicker from "react-datepicker";


import Icon from "../../../component/Icon";
import ConfirmButton from "../confirmButton/ConfirmButton";
import NumericKeyBoard from "../numericKeyboard/NumericKeyBoard";
import FilterDropDown from '../filterDropDown/FilterDropDown';
import Popup from '../popup/Popup';
import CustomRadioCheck from "../customRadioCheck/CustomRadioCheck";



import './blockFilter.scss';

const filterTypes = ["All", "Income", "Outgoing"];
const filterTime = ["Yesterday", "7day", "LastMonth"];
const statusTypes = ["Success", "Pending", "Denied"];
const filterUnit = [{name: 'wei'},{ name: 'aa'}, {name :'bb'}];

function BlockFilter({...props}) {
    const {list, setIsOpen, handleSubmit, setDataFilter} = props;

    const [selectedType, setSelectedType] = useState("All");
    const [selectedTime, setSelectedTime] = useState('Yesterday');
    const [selectedUnit, setSelectedUnit] = useState(filterUnit[0].name);
    const [selectedAmount, setSelectedAmount] = useState([0,0]);
    const [selectDateTime, setSelectDateTime] = useState(["",""]);

    const [status, setStatus] = useState("Success");
    const [searchQuery, setSearchQuery] = useState(null);
    const [isOpenUnit, setIsOpenUnit] = useState(false);
    const [listPopup, setListPopup] = useState([]);
    const [isOpenPopup, setIsOpenPopup] = useState(false);

    const [isToAmount, setIsToAmount] = useState(false);
    const [isToDate, setIsToDate] = useState(false);
    const keyboardRef = useRef(null);


    const handleBack = (value, id) => {
        setIsOpenPopup(false);
    };

    const handleChangeUnit = (id) => {
        setSelectedUnit(filterUnit[id].name)
        
    }
    
    const handleClick = (e) => {
        const {name} = e.currentTarget.dataset;
        
        if(name === "amountTo" || name === "amountFrom"){
            setListPopup([
                {type: "amount", label: "from", placeholder: 'enter the amount ...', icon: <Icon name="iconScan2"/>, textBtn: "done"},
                {type: "amount", label: "to", placeholder: 'enter the to ...', icon: <Icon name="iconScan2"/>, textBtn: "done"},
            ])

        }else{
            setListPopup([
                {type: "dateTime", label: "from", placeholder: 'select date', icon: <Icon name="iconCalendar"/>, textBtn: 'Done', time: {label: "select time",placeholder: 'Select time', icon: <Icon name="iconClock"/>}},
                {type: "dateTime", label: "to", placeholder: 'select date', icon: <Icon name="iconCalendar"/>, textBtn: 'Done', time: {label: "select time",placeholder: 'Select time', icon: <Icon name="iconClock"/>}},

                {type: "button", button: 'true', textBtn: "done"}
            ])
        }
        setIsOpenPopup(true);
        
    }

    const btnBack = () => {
        setIsOpen(false);
        
    }

    const handleSearch = () => {
        setDataFilter({
            type: selectedType,
            amount: selectedAmount,
            status: status,
            dataTime: selectDateTime,
            time: selectedTime,
            name: searchQuery
        });
        setIsOpen(false);
    }

    const handleDecrease = (amount, index) => {
        setSelectedAmount((prev) => {
            const newAmounts = [...prev];
            newAmounts[index] = Math.max(
                0,
                parseInt(newAmounts[index]) - parseInt(amount)
            );
            keyboardRef.current?.setInput(newAmounts[index].toString());
            return newAmounts;
        });
    };

    const handleIncrease = (amount, index) => {
        setSelectedAmount((prev) => {
            const newAmounts = [...prev];
            newAmounts[index] = parseInt(newAmounts[index]) + parseInt(amount);
            keyboardRef.current?.setInput(newAmounts[index].toString());
            return newAmounts;
        });
    };

    const handleInputChange = (value, index) => {
        setSelectedAmount((prev) => {
            const newAmounts = [...prev];
            newAmounts[index] = value ? parseInt(value) : 0; // Update only the selected index
            return newAmounts;
        });

        if (keyboardRef.current) {
            keyboardRef.current.setInput(value ? value.toString() : "");
        }
    };
    return (
        <div className='BlockFilter' style={{height: "890px"}}>
            <div className="flex items-center justify-center min-h-screen bg-gray-100 h-100">
                <div className="fixed inset-0 flex items-center justify-cente h-100">
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
                        className="BlockFilter_wrapper  p-6 rounded-lg shadow-lg w-96 h-100"
                        style={{ touchAction: "none" }} // Prevent browser interference
                    >
                        <div className="w-100 h-100">
                            <h2 className="mb-3">Filter</h2>
                            <div className="Form_type d-flex justify-content-between w-100">
                            {filterTypes.map((type) => (
                                <button 
                                    key={type} 
                                    className={`btn ${selectedType === type ? "btn-dark" : "btn-outline-secondary"}`} 
                                    style={{ width: "100px" }}
                                    onClick={() => setSelectedType(type)}
                                >
                                    {type}
                                </button>
                            ))}
                            </div>
                            
                            <div className="Form_amount mt-4">
                                <div className="row d-flex">
                                    <label className="col form-label fw-bold">Amount</label>
                                    <div className="col" onClick={() => setIsOpenUnit(!isOpenUnit)}>
                                        <div className="text-end text-blur">
                                            <span>
                                                unit:
                                            </span>
                                            <span className='ms-3 me-2'>
                                                {selectedUnit}
                                            </span>
                                            {isOpenUnit ? <Icon name={"iconArrowUp"} /> : <Icon name={"iconArrowDown"} /> }

                                        </div>
                                        <div className="box_dropdown">
                                            <div className="">
                                                <FilterDropDown
                                                    isOpen={isOpenUnit}
                                                    list={filterUnit}
                                                    onClick={handleChangeUnit}
                                                />

                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="row flex-row">
                                    <div className="col">
                                        <input readOnly={true} data-name="amountFrom" value={selectedAmount[0]} data="input-amount" className="form-control" placeholder="From" onClick={(e) => handleClick(e)}/>
                                    </div>
                                    <div className="col">
                                        <input readOnly={true} data-name="amountTo" value={selectedAmount[1]} data="input-amount" className="form-control" placeholder="To" onClick={(e) => handleClick(e)}/>
                                    </div>
                                </div>

                            </div>
                            
                            <div className="Form_status mt-4">
                                <label className="form-label fw-bold">Status</label>
                                <div className="d-flex justify-content-between">
                                {statusTypes.map((type) => (
                                    <div className="form-check" key={type}>
                                    <input 
                                        className="form-check-input" 
                                        type="radio" 
                                        name="status" 
                                        value={type} 
                                        id={type} 
                                        checked={status === type} 
                                        onChange={() => setStatus(type)} 
                                    />
                                    <label className="form-check-label" htmlFor={type}>{type}</label>
                                    </div>
                                ))}
                                </div>
                            </div>
                            
                            <div className="Form_time mt-4">
                                <label className="form-label  fw-bold">Time</label>
                                <div className="d-flex gap-2">
                                    {filterTime.map((type) => (
                                        <button 
                                            key={type} 
                                            className={`btn ${selectedTime === type ? "btn-dark" : "btn-outline-secondary"}`} 
                                            style={{ width: "100px" }}
                                            onClick={() => setSelectedTime(type)}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                                <div className="row flex-row mt-3">
                                    <div className="col">
                                        <input readOnly={true} data-name="timeFrom" value={selectDateTime[0]}   data="input-time" className="form-control" placeholder="From" onClick={(e) => handleClick(e)}/>
                                    </div>
                                    <div className="col">
                                        <input readOnly={true} data-name="timeTo"  value={selectDateTime[1]}  data="input-time" className="form-control" placeholder="To" onClick={(e) => handleClick(e)}/>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="Form_name mt-4 position-relative">
                                <label className="form-label fw-bold">Name</label>
                                <div className="input-group">
                                    <input 
                                        type="text" 
                                        className="form-control border-start-0" 
                                        value={searchQuery} 
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        data={"input-text"}
                                    />

                                    <span className="">
                                        <Search size={16} />
                                    </span>
                                </div>
                            </div>
                            


                        </div>
                        <div className="" style={{
                                position: 'absolute',
                                left: "5%",
                                bottom: "20%",
                                width: "90%",

                            }}>
                            <ConfirmButton text="confirm" onClickBack={btnBack} onClick={() => handleSearch()}/>

                            </div>
                    </motion.div>
                </div>
            </div>

            {isOpenPopup && (
                <div className={`BlockFilter_popup`} 
                >
                    <div className="w-100">
                    <Popup
                        setIsOpen={setIsOpenPopup}
                        button={false}
                    >
                         <div className="container" style={{ height: "100%" }} >
                            {listPopup.map((item, id) => {  
                                return (
                                    <div key={id}>
                                        {item.type === "dateTime" && (
                                            <>
                                                {item.label === "from" && !isToDate &&(
                                                    <DateTimePicker item={{id:id, type: item.type, label: item.label, icon: item.icon, time: item.time, textBtn: item.textBtn}} onConfirm={() => setIsToDate(true)} onClickBack={() => handleBack()} setSelectDateTime={setSelectDateTime}/>

                                                )}
                                                {item.label === "to" && isToDate &&(
                                                    <DateTimePicker item={{id:id, type: item.type, label: item.label, icon: item.icon, time: item.time, textBtn: item.textBtn}} onConfirm={() => handleBack()} onClickBack={() => setIsToDate(false)} setSelectDateTime={setSelectDateTime}/>

                                                )}
                                            </>
                                        )}
                                        {item.type === "amount" && (
                                            <>
                                                {!isToAmount && item.label === "from" && (
                                                        <AmountInput
                                                            label={item.label}
                                                            index={id}
                                                            selectedAmount={selectedAmount}
                                                            handleDecrease={handleDecrease}
                                                            handleIncrease={handleIncrease}
                                                            handleInputChange={handleInputChange}
                                                            settingAmounts={[
                                                                10, 100,
                                                                1000,
                                                            ]}
                                                            keyboardRef={keyboardRef}
                                                            onConfirm={() => setIsToAmount(true)}
                                                            setIsOpen={setIsOpen}
                                                            icon={item.icon}
                                                        />
                                                    )}
                                                {isToAmount && item.label === "to" && (
                                                        <AmountInput
                                                            label={item.label}
                                                            index={id}
                                                            selectedAmount={selectedAmount}
                                                            handleDecrease={handleDecrease}
                                                            handleIncrease={handleIncrease}
                                                            handleInputChange={handleInputChange}
                                                            settingAmounts={[
                                                                10, 100,
                                                                1000,
                                                            ]}
                                                            keyboardRef={keyboardRef}
                                                            onConfirm={() =>handleBack()}
                                                            setIsOpen={setIsOpen}
                                                            onClickBack={() =>setIsToAmount(false)}
                                                            icon={item.icon}
                                                        />
                                                    )}
                                            </>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </Popup>

                    </div>
                </div>
            )}
        </div>
    )
}



const AmountInput = ({setIsOpen,label,index,selectedAmount,handleDecrease,handleIncrease,handleInputChange,settingAmounts,keyboardRef,onConfirm,onClickBack,icon}) => ( 
    <div className="mt-3">
        <label className="label text-capitalize fw-bold">{label}</label>
        <div className="input-group w-100 mt-3" style={{ height: "42px" }}>
            <input
                readOnly={true}
                type="text"
                placeholder={`Enter ${label}`}
                value={selectedAmount[index]}
                className="input text-capitalize"
                style={{ borderRadius: "8px", padding: 10, width: "100%" }}
            />
            <div style={{ position: "absolute", right: "5%", bottom: "20%" }}>
                {icon}
            </div>
        </div>

        <div className="d-flex mt-3">
            {settingAmounts.map((amt) => (
                <div
                    className="bg-white me-3 rounded-3 d-flex justify-content-center align-items-center"
                    style={{ width: "100px", height: "40px" }}
                    key={`${label}-${amt}`}
                >
                    <span
                        className="p-3"
                        onClick={() => handleDecrease(amt, index)}
                    >
                        -
                    </span>
                    <span>{amt}</span>
                    <span
                        className="p-3"
                        onClick={() => handleIncrease(amt, index)}
                    >
                        +
                    </span>
                </div>
            ))}
        </div>
        <div className="mt-5">
            <ConfirmButton
                text="Next"
                onClickBack={() =>
                    onClickBack ? onClickBack() : setIsOpen(false)
                }
                onClick={() => onConfirm()}
            />
            <NumericKeyBoard
                keyboardRef={keyboardRef}
                onChange={(value) => handleInputChange(value, index)}
            />
        </div>
    </div>
);


const DateTimePicker = ({ item,  onConfirm, onClickBack, setSelectDateTime}) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [enableTime, setEnableTime] = useState(false);
  
    useEffect(() => {
        
        setSelectDateTime(prev => {
                const updatedDateTime = [...prev];
                if(selectedTime && selectedDate){
                    const formattedDate = selectedDate.toLocaleDateString("en-CA") || ""; // YYYY-MM-DD
                    const formattedTime = selectedTime.toLocaleTimeString("en-US", { hour12: false }) || ""; // HH:mm:ss
                    updatedDateTime[item.id] = `${formattedDate} ${formattedTime}`;

                }else{
                    updatedDateTime[item.id] = "";
                }
                

                return updatedDateTime;
        }); 
    }, [selectedDate, selectedTime, item.id]);
    
    return (
      <div className="mt-3">
            <label className="label text-capitalize fw-bold">{item.label}</label>
            <div className="input-group w-100 mt-3" style={{ height: "42px" }}>
              <DatePicker
                customInput={<input readOnly />}
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="yyyy/MM/dd"
                className="form-control custom-datepicker"
                placeholderText="Select date"
              />
              <div className="icon-container" style={{ position: "absolute", right: "5%", bottom: "25%" }}>
                {item.icon}
              </div>
            </div>
  
          <div className="radio-group mt-3">
            <CustomRadioCheck 
                checked={enableTime}
                onClick={() => setEnableTime(!enableTime)}
                text={item.time.label}
            />
            {enableTime && (
              <div className="input-group w-100 mt-3" style={{ height: "42px" }}>
                <DatePicker
                    customInput={<input readOnly />}
                    selected={selectedTime}
                    onChange={(date) => setSelectedTime(date)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeFormat="HH:mm"
                    dateFormat="HH:mm"
                    className="form-control custom-datepicker"
                    placeholderText={item.time.placeholder}
                />
                <div className="icon-container" style={{ position: "absolute", right: "5%", bottom: "25%" }}>
                  {item.icon}
                </div>
              </div>
            )}
          </div>

            <div className="mt-5">
                <ConfirmButton
                    text={item.textBtn}
                    onClickBack={ () => onClickBack()}
                    onClick={() => onConfirm()}
                />
            </div>
      </div>
    );
};
export default BlockFilter