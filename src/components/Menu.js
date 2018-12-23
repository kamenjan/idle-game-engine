import React from 'react'

import { connect } from "react-redux"
import { push, goBack } from 'connected-react-router'

import MenuItem from "./MenuItem"
import { FaSyncAlt, FaCog, FaArrowCircleLeft, FaSignInAlt } from 'react-icons/fa'

const mapStateToProps = state => ({ ...state.router });
const mapDispatchToProps = dispatch => ({})

class Menu extends React.PureComponent {

  menuItems = () => ([
    {
      icon: <FaArrowCircleLeft size={'2em'} color={'yellow'} />,
      routes: ['/coin', '/settings', '/login'],
      location: '#',
      action: this.props.goBack
    },
    {
      icon: <FaCog size={'2em'} color={'red'} />,
      routes: ['/', '/coin'],
      location: '/settings'
    },
    {
      icon: <FaSyncAlt size={'2em'} color={'blue'} />,
      routes: ['/', '/coin'],
      location: '#',
      action: () => {}
    },
    {
      icon: <FaSignInAlt size={'2em'} color={'blue'} />,
      routes: ['/', '/coin'],
      location: '/login',
      action: () => {}
    }
  ])

  style = {
    backgroundColor: 'green',
    position: 'fixed',
    bottom: 0,
    width: '100%',
    height: '2em'
  }

  render() {
    /* Define menu button structure based on route's first url param  */
    const route = `/${this.props.location.pathname.split('/')[1]}`
    console.log(this.props.location.pathname)

    return (
      <div style={{...this.style}}>
        {this.menuItems().filter( item => item.routes.includes(route)).map((item, i) => (
          <MenuItem key={i} {...item}/>
        ))}
      </div>
    )
  }
}

export default connect(mapStateToProps, { ...mapDispatchToProps, goBack })(Menu)