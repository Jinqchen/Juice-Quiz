import React,{useState} from 'react';
//import { Component } from 'react';
import './iconTab.css' ;    
import {Link } from 'react-router-dom';
//import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai"

const IconTab=(props)=>{
  
  
    const [sidebar, setSidebar]=useState(false)

    const showSidebar=()=>setSidebar(!sidebar)
    const SidebarData=[
		{
			 
			title: 'Subscribed',
			path: './profile',  
            icon:<AiIcons.AiFillCheckCircle/>,
			cName:"nav-text"
		} ,
    {
			 
			title: 'My Platforms',
			path: './managePlatform',  
            icon:<AiIcons.AiOutlineBlock/>,
			cName:"nav-text"
		} ,
		{
            title: 'Message',
			path: './',  
            icon:<AiIcons.AiFillMessage/>,
			cName:"nav-text"
		} ];

    function handleSignout(){
      console.log(props)
      props.signOutcallback(); 
    }
    
    return(
        <> 
          <div className='navbar-icon'>
            <Link to='#' className='menu-bars'>
              <img src="account.jpg" onClick={showSidebar} className="iconClick" />
            </Link>
          </div>
          <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
            <ul className='nav-menu-items' onClick={showSidebar}>
              <li className='navbar-toggle'>
                <Link to='#' className='menu-bars'>
                  <AiIcons.AiOutlineClose />
                </Link>
              </li>
             
              {SidebarData.map((item, index) => {
                return (
                  <li key={index} className={item.cName}>
                    <Link to={item.path}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </li>
                );
              })}
              
              <li className="nav-text" onClick={handleSignout} >
               
                    <AiIcons.AiFillCaretLeft/>
                    <span onClick={props.signOutCallback}>{"Sign out"}</span >
                     
              </li>
            </ul>
            
          </nav> 
      </>
    ); 
   
}
    
 export default IconTab