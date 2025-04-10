import React, { useEffect, useState } from "react";
import BlockContent from "../../layouts/component/blockContent/BlockContent";
import { Tabs, Tab, TabList, TabPanel } from "react-tabs";
import { QRCodeCanvas } from "qrcode.react";


import "./backup.scss";
import Icon from "../../component/Icon";
import { seedPharase } from "../../constant";

function Backup() {
    const [key, setKey] = useState("");
    useEffect(() => {
        if(!key){
            const newHash = Math.random().toString(36).substring(2, 15);
            setKey(newHash);
        }
        
    }, [key]);


    return (
        <div className="Backup">
            <div className="text-label fs-5 my-4">Backup with QR code</div>
            <div className="text-label mb-3 ">wallet address</div>

            <div className="">
                <BlockContent
                    type={"showInfoWallet"}
                    isToken={true}
                    showId={0}
                />
            </div>
            <div className="Backup_wrapper">
                <Tabs className="Backup_wrapper_tabs">
                    <TabList className="tabs_list d-flex p-0">
                        <Tab className="tabs_list_item col-6 text-center p-2">
                            Create
                        </Tab>
                        <Tab className="tabs_list_item col-6 text-center p-2">
                            Add Hashkey
                        </Tab>
                    </TabList>

                    <TabPanel>
                        <div className="d-flex justify-content-between py-2 px-3 rounded-3 bg-white-blur">
                            <span>{key}</span>
                            <Icon name="iconScan2" />
                        </div>

                        <div className="bg-white-blur p-3 rounded-4 mt-4">
                            <div className="d-flex justify-content-between">
                                <span className="text-capitalize fw-bold">QR rprivate key</span>
                                <span><Icon name="iconImage"/></span>
                            </div>
                            <div className="text-center my-3">
                                <QRCodeCanvas 
                                    value={JSON.stringify(key)} 
                                    size={260} 
                                    level="H" 
                                    bgColor="transparent" 
                                    fgColor="#000000"
                                    className=""
                                />
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="bg-white-blur p-2 rounded-3">
                            <div className="d-flex flex-wrap">
                                {seedPharase.map((data, id) => {
                                    return(
                                        <div className="bg-white-blur me-2 my-1 p-1 rounded-2" key={id}>
                                            {data}
                                        </div>
                                    )
                                })}

                            </div>
                            <div className="text-end">
                                <Icon name="iconScan2"/>

                            </div>
                        </div>
                        <div className="bg-white-blur p-3 rounded-4 mt-4">
                            <div className="d-flex justify-content-between">
                                <span className="text-capitalize fw-bold">QR rprivate key</span>
                                <span><Icon name="iconImage"/></span>
                            </div>
                            <div className="text-center my-3">
                                <QRCodeCanvas 
                                    value={JSON.stringify(seedPharase)} 
                                    size={260} 
                                    level="H" 
                                    bgColor="transparent" 
                                    fgColor="#000000"
                                    className=""
                                />
                            </div>
                        </div>
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    );
}

export default Backup;
