import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const RangeContainer = styled.div`
  width: 100%; /* Adjust as needed */
`;

// const RangeInputStyled = styled.input.attrs({ type: 'range' })`
//   -webkit-appearance: none;
//   -moz-appearance: none;
//   outline: 0;
//   border-radius: 40px;
//   width: 100%;
//   height: 4px;
//   background: ${(props) =>
//     `linear-gradient(to right, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.4) ${props.value}%, #fff ${props.value}%, #fff 100%);`};
//   box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.5);
  
//   opacity: 0.7;
//   -webkit-transition: 0.2s;
//   transition: opacity 0.2s;


//   &::-webkit-slider-thumb {
//     -webkit-appearance: none;
//     width: 22px;
//     height: 22px;
//     background-image: radial-gradient(circle, #000 28%, #fff 40%);
//     border-radius: 50%;
//     box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.5);
//   }

//   &::-moz-range-thumb {
//     width: 20px;
//     height: 20px;
//     border-radius: 50%;
//     background: #4caf50;
//     cursor: pointer;
//   }
// `;
const RangeInputStyled = styled.input.attrs({ type: 'range' })`
  -webkit-appearance: none;
  -moz-appearance: none;
  outline: 0;
  border-radius: 40px;
  width: 100%;
  height: 4px;
  background: ${(props) =>
      props.defaults ? `linear-gradient(to right, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.4) ${props.value}%, #fff ${props.value}%, #fff 100%);` : `linear-gradient(to right, rgba(14, 14, 14, 1) 0%, rgba(2, 2, 2, 1) ${props.value}%, #fff ${props.value}%, #fff 100%);`
  };
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.5);
  
  opacity: 0.7;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;


  ${(props) => 
    props.defaults ? `
      &::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 22px;
        height: 22px;
        background-image: radial-gradient(circle, #000 28%, #fff 40%);
        border-radius: 50%;
        box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.5);
      }
    ` : `
      &::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 22px;
        height: 22px;
        background-image: radial-gradient(circle, #fff 100%);
        border-radius: 50%;
      }`
  }


  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #4caf50;
    cursor: pointer;
  }
`;

const Tooltip = styled.div`
  position: absolute;
  bottom: 77%;
  transform: translateX(-50%);
  background: #2b2b2b;
  color: #fff;
  padding: 2px 8px;
  border-radius: 6px;
  font-size: 12px;
  margin-bottom: 8px;
  white-space: nowrap;

  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #2b2b2b transparent transparent transparent;
  }
`;

function RangeInput({...props}) {
    const {valueRange, setValueRange, defaults=true} = props;
    const rangeRef = useRef(null);
    const [thumbLeft, setThumbLeft] = useState(0);
    
    const updateThumbPosition = (value) => {
      const input = rangeRef.current;
      if (!input) return;
      
      const min = Number(input.min || 0);
      const max = Number(input.max || 100);
      const percent = (value - min) / (max - min);
      const inputWidth = input.offsetWidth;
      
      // 11 is half the thumb width (22px / 2) — center the tooltip
      const thumbOffset = percent * (inputWidth - 22) + 157;
      
      setThumbLeft(thumbOffset);  
    };

    const handleRangeChange = (event) => {
      const val = Number(event.target.value)
      setValueRange(val);
      updateThumbPosition(val);
    };
    
    useEffect(() => {
      updateThumbPosition(Number(valueRange));
    }, [valueRange]);
  return (

    <RangeContainer>
      {defaults && (
        <RangeInputStyled
          min="0"
          max="100"
          value={valueRange}
          onChange={handleRangeChange}
          defaults={defaults}
        />
      )}
      {!defaults && (
        <>
          <Tooltip style={{ left: `${thumbLeft}px` }}>{valueRange}%</Tooltip>
          <RangeInputStyled
            ref={rangeRef}
            min="0"
            max="100"
            value={valueRange}
            onChange={handleRangeChange}
            defaults={defaults}
          />
        </>
      )}
    </RangeContainer>
  );
}

export default RangeInput;