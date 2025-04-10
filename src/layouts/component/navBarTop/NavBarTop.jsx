import React from 'react'
import { Settings2 } from 'lucide-react';


import {linkCart} from '../../../constant'
import './navBarTop.scss';
import { Link } from 'react-router-dom';
import Icon from '../../../component/Icon';
function NavBarTop({...props}) {
  return (
    !props.hidden && (
      <div className='NavBarTop d-flex justify-content-between w-100 px-4'>

          <div className="NavBarTop_icon">
              <Link to={linkCart}>
                <Icon name={"iconUser"}/>
              </Link>
          </div>
          <div className="NavBarTop_icon" onClick={() => props.onClick()}>
              <Icon name={"iconSetting"}/>
          </div>
      </div>

    )
  )
}

export default NavBarTop