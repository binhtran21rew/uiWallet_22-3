import React from 'react'

import './cart.scss';
import NavBar from '../../layouts/component/navBar/NavBar';
import BlockWallet from '../../layouts/component/blockWallet/BlockWallet';
import BlockContentTop from '../../layouts/component/blockContentTop/BlockContentTop';


function Cart() {
  return (
    <div className='Cart'>
        <div className="Block_Top">
          <BlockContentTop />
        </div>
        <div className="Block_wallet">
          <BlockWallet 
            data={
              {
                name: "christopher vitory", 
                address: 'fc010f105y 08909fdb87', 
                typeWallet: 3, 
                transaction: [
                  {name: 'mtd', detail: 'metadollar'}, 
                  {name: 'usdt', detail: 'usd tether'}
                ]

              }
            }
          />
        </div>
        <div className="Block_navBar">
          <NavBar />
        </div>
    </div>
  )
}

export default Cart