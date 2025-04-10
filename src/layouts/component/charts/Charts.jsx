import React, { useState, useEffect, useRef } from "react";
import { Area, AreaChart, Tooltip, XAxis, YAxis } from "recharts";

import './charts.scss';

const data = [
  { name: "4:31 Am", uv: 2000, pv: 2400 },
  { name: "5:02 Am", uv: 3500, pv: 1398 },
  { name: "8:10 Am", uv: 2800, pv: 9800 },
  { name: "10:10 Am", uv: 4080, pv: 3908 },
  { name: "12:15 Am", uv: 3000, pv: 4800 },
  { name: "14:31 Am", uv: 2390, pv: 3800 },
  { name: "15:31 Am", uv: 4290, pv: 4300 }
];

const CustomActiveDot = ({ cx, cy, stroke }) => (
  <>
    {/* Outer dot */}
    <circle
    cx={cx}
    cy={cy}
    r={6}
    fill="#fff"
    stroke={stroke}
    strokeWidth={2}
    filter="url(#dotShadow)"
    />
    {/* Inner dot */}
    <circle
      cx={cx}
      cy={cy}
      r={5}
      fill={"#58f2fc"}
    />
  </>
);


function Charts({...props}) {

  const chartRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 100, height: 100 });
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height
        });
      }
    });

    if (chartRef.current) {
      resizeObserver.observe(chartRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);
  return (
    <div className="Charts" ref={chartRef} style={{ width: "100%", height: props.height || "100%" }}>
      <AreaChart className="Chart_wrapper" width={dimensions.width} height={dimensions.height} data={data}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#58f2fc" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#58f2fc" stopOpacity={0} />
          </linearGradient>
          <filter id="dotShadow" x="-50%" y="-50%" width="300%" height="300%">
            <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#58f2fc" />
          </filter>
        </defs>
        <XAxis 
        tickLine={false}
        axisLine={{
          stroke: "black",    
          strokeWidth: 0.4,
        }}
        tick={{
              fill: 'black',
              fontSize: 12,
              textAnchor: 'end',
        }} dataKey="name" hide={props.xa ? false : true} />
        <YAxis hide={true} />
        <Tooltip contentStyle={{width: "100px"}}/>
        <Area type="monotone" dataKey="uv"  stroke="#58f2fc" fill="url(#colorUv)" 
          isAnimationActive={true} 
          animationDuration={800}     
          animationBegin={0}  
          strokeWidth={2}
          activeDot={<CustomActiveDot />}
        />
      </AreaChart>
    </div>
  );
}

export default Charts;
