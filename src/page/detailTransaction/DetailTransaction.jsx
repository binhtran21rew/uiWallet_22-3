import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./detailTransaction.scss";

import { status, statusColor } from "../../constant";
import ConfirmButton from '../../layouts/component/confirmButton/ConfirmButton';
function DetailTransaction({ props }) {
    const location = useLocation();
    const { hash } = location.state;
    
    var historySelector = useSelector((state) => state.history);
    const dispatch = useDispatch();
    const [detailTrans, setDetailTrans] = useState();
    
    
    useEffect(() => {
      const getList = historySelector.data[0].filter(
        (item) => item.hash === hash
      );
      setDetailTrans(getList[0]);
    }, [hash]);
    
    const onClick = () => {
        
    }

    return (
        <div className="DetailTransaction">
          {detailTrans && (
            <>
              <div className="mb-3">
                  <span className="text-blur fs-4">Transaction detail</span>
              </div>
              <div className="DetailTransaction_wrapper row">
                  <div className="col-12">
                      <div className="d-flex justify-content-between">
                          <span className="text-capitalize text-blur">hash</span>
                          <span>{detailTrans.hash}</span>
                      </div>
                      <div className="d-flex justify-content-between">
                          <span className="text-capitalize text-blur">
                              status
                          </span>
                          <div className="d-flex align-items-center">
                              {status[detailTrans.status]}
                              <span
                                  className={`text-uppercase ms-2 `}
                                  style={{
                                      color: `${statusColor[detailTrans.status]}`,
                                  }}
                              >
                                  {detailTrans.status}
                              </span>
                          </div>
                      </div>
                      <div className="d-flex justify-content-between">
                          <span className="text-capitalize text-blur">
                              number of confirmations
                          </span>
                          <span>{detailTrans.id}</span>
                      </div>
                      <div className="d-flex justify-content-between">
                          <span className="text-capitalize text-blur">
                              timestamp
                          </span>
                          <span>{detailTrans.time}</span>
                      </div>
                      <div className="d-flex justify-content-between">
                          <span className="text-capitalize text-blur">from</span>
                          <div className="d-flex flex-column align-items-end">
                              <span>{detailTrans.from.name}</span>
                              <span>{detailTrans.from.address}</span>
                          </div>
                      </div>
                  </div>
                  <div className="col-12">
                      <div className="d-flex justify-content-between">
                          <span className="text-capitalize text-blur">from</span>
                          <div className="d-flex flex-column align-items-end">
                              <span>{detailTrans.from.name}</span>
                              <span>{detailTrans.from.address}</span>
                          </div>
                      </div>
                      <div className="d-flex justify-content-between">
                          <span className="text-capitalize text-blur">
                              amount (MTD)
                          </span>
                          <span className={`text-uppercase ms-2 `}>
                              {detailTrans.amount} wei
                          </span>
                      </div>
                      <div className="d-flex justify-content-between">
                          <span className="text-capitalize text-blur">
                              Tips (MTD) wei
                          </span>
                          <span>{detailTrans.tips}</span>
                      </div>
                      <div className="d-flex justify-content-between">
                          <span className="text-capitalize text-blur">
                              total (MTD) wei
                          </span>
                          <span>{detailTrans.total}</span>
                      </div>
                  </div>
                  <div className="col-12">
                      <div className="d-flex justify-content-between">
                          <span className="text-capitalize text-blur">
                              message
                          </span>
                          <span>thanh toan tien hang</span>
                      </div>
                  </div>

              </div>

                <div className=" mt-3">
                    <ConfirmButton text="custom" onClick={() => onClick()}/>

                </div>

            
            </>

          )}
        </div>
    );
}

export default DetailTransaction;
