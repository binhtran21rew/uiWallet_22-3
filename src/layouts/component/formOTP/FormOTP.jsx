import React, { useEffect, useState } from 'react'
import { toWords } from 'number-to-words';


import {generateRandomString} from '../../../component/generateString';
import { status, statusColor } from "../../../constant";

import './formOTP.scss';
import ConfirmButton from '../confirmButton/ConfirmButton';
import { useNavigate } from 'react-router-dom';

function FormOTP({children, ...props}) {
    const navigator = useNavigate();
    const {lists, textbtn, payment, onClickBack, topup} = props;
    const [totalPrice, setTotalPrice] = useState(0);
    
    useEffect(() => {
      setTotalPrice((prev) => parseInt(prev) + parseInt(lists.amount) + parseInt(lists.tips))
    }, [lists]);
    return (
      <div className='FormOTP row flex-column fs-small'>
        <div className="mb-3 d-flex justify-content-between align-items-center">
          <span className='fs-5 text-white text-capitalize'>Transaction details</span>
        </div>
        <div className="Form_wrapper">
          <div className="col d-flex justify-content-between">
            <span className='text-blur text-capitalize'>hash</span>
            <span className='fw-bold '>{generateRandomString(30)}</span>
          </div>
          <div className="col d-flex justify-content-between">
            <span className='text-blur text-capitalize'>status</span>
            <div className="d-flex align-items-center">
                {status["success"]}
                <span
                    className={`text-uppercase ms-2 `}
                    style={{
                        color: `${statusColor["success"]}`,
                    }}
                >
                    success
                </span>
            </div>
          </div>
          {
            topup && (
              <>
              <div className="col d-flex justify-content-between">
                <span className='text-blur text-capitalize'>Number of confirmations </span>
                <span className='fw-bold '>#894</span>
              </div>
              <div className="col d-flex justify-content-between">
                <span className='text-blur text-capitalize'>Timestamp</span>
                <span className=''>{lists.dateTime}</span>
              </div>
              <div className="col d-flex justify-content-between">
                <span className='text-blur text-capitalize'>Receiving address</span>
                <div className="d-flex flex-column text-end">
                  <span className='fs-medium'>{lists.name}</span>
                  <span className='fs-small'>{lists.addressWallet}</span>
                </div>
              </div>
              <div className="col d-flex justify-content-between">
                <span className='text-blur text-capitalize'>amount</span>
                <div className="d-flex flex-column text-end">
                  <span className='fs-medium fw-bold'>{lists.amount}</span>
                  <span>{toWords(lists.amount)} wei</span>
                </div>

              </div>
              </>
            )
          }
          {payment && (
            <>
              {
                Object.entries(lists).map(([key, value], id) => {
                  
                  return(
                    <>
                      {key === "recipient" && (
                        <div className="col d-flex justify-content-between">
                          <span className='text-blur text-capitalize'>send to</span>
                          <div className='d-flex flex-column text-end'>
                            <span>{value.name}</span>
                            <span>{ value.wallet.slice(0, 3)}...{value.wallet.slice(-4)}</span>
                          </div>
                        </div>
                      )}
                      {key === "recipient" && (
                        <div className="col d-flex justify-content-between">
                          <span className='text-blur text-capitalize'>fee</span>
                          <div className='d-flex flex-column'>
                            <span className='text-end'>{value.fee} wei</span>
                            <span>{toWords(value.fee)} wei</span>
                          </div>
                        </div>
                      )}
                      {key !== "recipient" && key !== "message" && key !== "saveUser" &&(
                        <div className="col d-flex justify-content-between">
                          <span className='text-blur text-capitalize'>{key}</span>
                          <div className="d-flex flex-column">
                            <span className='text-end'>{value} wei</span>
                            <span>
                            <span>{toWords(value)} wei</span>
                            </span>

                          </div>
                        </div>
      
                      )}
                    </>
                  )
                })
              }
              <div className="col d-flex justify-content-between">
                <span className='text-blur text-capitalize'>total (MTD)</span>
                <div className="d-flex flex-column">
                  <span className='text-end'>{totalPrice} wei</span>
                  <span>
                  <span>{toWords(totalPrice)} wei</span>
                  </span>
                </div>
              </div>
            </>

            
          )}
        </div>
        {payment && (
          <>
            <div className="my-3 d-flex justify-content-between align-items-center">
              <span className='fs-5 text-white text-capitalize'>message</span>
            </div>
            <div className="Form_wrapper">
              {
                Object.entries(lists).map(([key, value], id) => {
                  return(
                    <>
                      {key === "message" && (
                        <div className="col d-flex justify-content-between">
                          <span className='text-blur text-capitalize'>{key}</span>
                          <div className='d-flex flex-column text-end'>
                            <span>{value}</span>
                          </div>
                        </div>
                      )}
                    </>
                  )
                })

              }
            </div>
          </>
        )}
        <div className='mt-4'>
            <div className="">
                <ConfirmButton text={textbtn} onClickBack={() => onClickBack()
                } onClick={() => navigator(-1)}/>
            </div>
        </div>
      </div>
    )
}

export default FormOTP