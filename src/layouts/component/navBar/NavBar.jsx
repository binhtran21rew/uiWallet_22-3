import React from 'react'

import {listNav} from '../../../constant';
import './navBar.scss';
function NavBar({...props}) {
  
  return (
    <div className='NavBar' >
        <ul className='d-flex ps-0 justify-content-evenly'>
          {listNav.map((item, id) => {
            
            return(
              <div  key={`${id}.${item.name}`}  className='NavBar_item'>
                <div className="NavBar_item_icon">
                  {item.icon}
                </div>
                  <li>{item.name}</li>

              </div>
            )
          })}

        </ul>
    </div>
  )
}

export default NavBar