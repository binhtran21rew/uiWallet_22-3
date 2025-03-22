import React, { useState, useEffect, useRef } from "react";
import { Area, AreaChart, Tooltip, XAxis, YAxis } from "recharts";

const data = [
  { name: "Page A", uv: 4000, pv: 2400 },
  { name: "Page B", uv: 3000, pv: 1398 },
  { name: "Page C", uv: 2000, pv: 9800 },
  { name: "Page D", uv: 2780, pv: 3908 },
  { name: "Page E", uv: 1890, pv: 4800 },
  { name: "Page F", uv: 2390, pv: 3800 },
  { name: "Page G", uv: 3490, pv: 4300 }
];

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
    <div className="Charts" ref={chartRef} style={{ width: "100%", height: "100%" }}>
      <AreaChart className="Chart_wrapper" width={dimensions.width} height={dimensions.height} data={data}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" hide={true} />
        <YAxis hide={true} />
        <Tooltip />
        <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="url(#colorUv)" />
      </AreaChart>
    </div>
  );
}

export default Charts;
