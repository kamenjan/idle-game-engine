import React from 'react'
import { Link } from "react-router-dom"

const MenuItem = ( props ) => {

  return(
    <Link to={props.location} onClick={props.action}>{props.icon}</Link>
  )
}

export default MenuItem