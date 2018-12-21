import React from 'react'
import moment from "moment/moment";

import { connect } from "react-redux"

const mapStateToProps = state => ({
  ...state.time
})

const DevelopmentInterface = props => {

  let {serverTime, localTime, synced, lastSync, offset } = props
  return(
    <table>
      <tbody>
      <tr>
        <td>offset:</td>
        <td>{offset}</td>
      </tr>
      <tr>
        <td>local time:</td>
        <td>{localTime}</td>
        <td>{moment(localTime).format("hh:mm:ss")}</td>
      </tr>
      <tr>
        <td>server time:</td>
        <td>{serverTime}</td>
        <td>{moment(serverTime).format("hh:mm:ss")}</td>
      </tr>
      </tbody>
    </table>
  )
}

export default connect(mapStateToProps)(DevelopmentInterface)