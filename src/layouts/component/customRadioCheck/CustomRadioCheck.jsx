import React, { useState } from "react";
import "./customRadioCheck.scss";

const CustomRadioCheck = ({ text, checked, onClick, color }) => {
  return (
    <div className="d-flex">
        <label className="custom-radio">
        <input
            type="radio"
            checked={checked}
            readOnly={true}
            className="radio"
            onClick={() => onClick()}
        />
        <span className="checkmark"></span>
        </label>
        <label className="radio-label ms-2 text-capitalize" style={{color: color ? color : 'black' }}>{text}</label>
    </div>
  );
};


export const CustomCheckBox = ({ children, ...props }) =>  {
  const {selected, setSelected} = props;
  
  return (
    <div className="">
      {props.items.map((item, id) => (
        <label key={id} className="d-flex custom-radio align-items-center justify-content-between bg-white-blur px-3 py-2 m-2 rounded-3">
          {children && children(item, selected) }

          <input
            type="radio"
            name="select"
            value={id}
            checked={selected === id}
            onChange={() => setSelected(id)}
            className="hidden"
            style={{backgroundColor: '#d8d8d8'}}
          />
          <span className="checkmark"></span>
        </label>
      ))}
    </div>
  );
}

export default CustomRadioCheck;
