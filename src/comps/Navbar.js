import React from 'react'
import logo from "./sja-logo.png"
import './navbar.css';

import { NavLink, Link, useNavigate} from "react-router-dom"
import { Button, Flex, Divider, Image } from '@aws-amplify/ui-react';
import { Auth } from 'aws-amplify';
import { useSelector } from 'react-redux';

function Navbar() {
  const navigate = useNavigate()
  const userState = useSelector((state) => state.userState)
  console.log(userState)
  return (
    <nav>
      <Flex
          width="100%"
          alignItems="center"
          justifyContent="space-between"
          paddingTop={5}
          paddingLeft = {20}
          paddingRight = {10}
          paddingBottom={2}
          
      >
            <Link to='/'><Image src = {logo} width={80} height={80}/></Link>
            <NavLink to='/dashboard'>Dashboard</NavLink>
            <NavLink to='/services'>Services</NavLink>
            <NavLink to='/about'>About</NavLink>
            <NavLink to='/contact'>Contact</NavLink>
            <NavLink to='/profile'>Profile</NavLink>
            { !userState.authState ? (
              <Link to='/login'><Button>Login</Button></Link>
              ) : (
                <Button onClick={()=>{Auth.signOut().then(()=>navigate('/'))}}>Logout</Button>
              )
            
              } 
      </Flex>
      <Divider />
    </nav>
  )
}

export default Navbar