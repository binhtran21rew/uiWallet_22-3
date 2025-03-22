import React from 'react'
import { Link } from "react-router-dom";
import { motion } from "framer-motion";


import {linkHome}  from '../../constant';


function History() {
  return (
    <div className="History">
      <h1>History Page</h1>
      <Link to={linkHome}>Go to Cart</Link>

    </div>

  )
}

export default History