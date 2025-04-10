import React, { useRef, useState } from 'react'
import { Link } from "react-router-dom";
import { PieChart, Pie, Cell, Label, ResponsiveContainer } from "recharts";

import { Tabs, Tab, TabList, TabPanel } from "react-tabs";
import { useSwipeable } from "react-swipeable";
import { Swiper, SwiperSlide } from "swiper/react";



import {linkHome, listNavReport}  from '../../constant';
import BlockContent from '../../layouts/component/blockContent/BlockContent';

import './history.scss';
import ShowHistory from '../../layouts/component/showHistory/ShowHistory';
import Icon from '../../component/Icon';


const data = [
  { name: "Outgoing", value: 40 },
  { name: "Income", value: 60 }
];

const COLORS = ["#6A5AE0", "#3D43F5"]; // Adjust colors as needed

const CustomLabel = ({ cx, cy, midAngle, outerRadius, percent }) => {
  const RADIAN = Math.PI / 180;
  const x = cx + (outerRadius + 20) * Math.cos(-midAngle * RADIAN);
  const y = cy + (outerRadius - 10) * Math.sin(-midAngle * RADIAN);
  const textWidth = 60; // Customize width
  const textHeight = 60; // Customize height

  return (
    <g>
      <rect
        x={x - textWidth / 2}
        y={y - textHeight / 2}
        width={textWidth}
        height={textHeight}
        rx="5" // Rounded corners
        fill="#fff" // Semi-transparent background
      />
      

      <text
        x={x}
        y={y}
        fill="#000"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="14px"
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    </g>
  );
};

function History() {
  const [showIdWallet, setShowIdWallet] = useState(0);
  const [report, setReport] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const swiperRef = useRef(null);

  return (
    <div className="History">
        <div className="Block_Top">
          <BlockContent type="showInfoHistory" isChange={true} showId={showIdWallet} setShowId={setShowIdWallet}/>
        </div>

        {!report && (
          <div className="Block_history">
            <ShowHistory history={5} isSearch={true} setReport={setReport}/>
          </div>
        )}

        {report && (
          <div className="mt-3">
            <span className='text-capitalize text-label'>Report</span>
            <div className="Report_wrapper">
            <Tabs selectedIndex={selectedTab} onSelect={(index) => setSelectedTab(index)}>
              
              <Swiper
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                slidesPerView={2.5}
                spaceBetween={10}
                freeMode={true}
                className="swiper-container"
              >
                <TabList className="tabs_list d-flex p-0">
                  {listNavReport.map((tab, index) => (
                    <SwiperSlide key={index}>
                      <button
                        className={`tabs_list_item text-center rounded-3 p-2 w-100 ${selectedTab === index ? "active" : ""}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTab(index);
                          swiperRef.current?.slideTo(index);
                        }}
                      >
                        <span className='text-white text-capitalize'>
                          {tab.name}
                        </span>
                      </button>
                    </SwiperSlide>
                  ))}
                </TabList>
              </Swiper>

              {listNavReport.map((tab, index) => (
                <TabPanel>
                  <div className="p-3 mt-4 rounded-3 bg-white-blur">
                    <div className='text-center' style={{width: '100%', height: "300px"}}>
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            cy="50%"
                            data={data}
                            innerRadius={50}
                            dataKey="value"
                            label={<CustomLabel />}
                            stroke="rgba(255, 255, 255, 0.7)" 
                            strokeWidth={4}
                          >
                            {data.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index]} />
                            ))}

                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className='d-flex justify-content-around mt-3'>
                      {data.map((entry, index) => (
                        <div key={index} style={{ display: "flex", alignItems: "center", margin: "0 10px" }}>
                          <div
                            style={{
                              width: "12px",
                              height: "12px",
                              backgroundColor: COLORS[index],
                              marginRight: "5px"
                            }}
                          ></div>
                          <span style={{ color: "#fff", fontSize: "14px" }}>{entry.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 d-flex justify-content-evenly">
                      <div className="col-5 d-flex justify-content-center align-items-center py-2 bg-white-blur rounded-4">
                        <div className="bg-white-blur text-center align-content-center me-3" style={{width: '40px', height: "40px", borderRadius: "50%"}}>
                          <Icon name={"iconArrowDownStraight"}/>
                        </div>
                        <div className="text-black-blur d-flex flex-column">
                          <span className='text-capitalize'>30.08 M</span>
                          <span className='text-capitalize'>income</span>
                        </div>
                      </div>

                      <div className="col-5 d-flex justify-content-center align-items-center py-2 bg-white-blur rounded-4">
                        <div className="bg-white-blur text-center align-content-center me-3" style={{width: '40px', height: "40px", borderRadius: "50%",  transform: 'rotate(180deg)'}}>
                          <Icon name={"iconArrowDownStraight"}/>
                        </div>
                        <div className="text-black-blur d-flex flex-column">
                          <span className='text-capitalize'>30.08 M</span>
                          <span className='text-capitalize'>outcome</span>
                        </div>
                      </div>
                  </div>
                </TabPanel>
              ))}
              
            </Tabs>
          </div>
          </div>
        )}
    </div>

  )
}

export default History