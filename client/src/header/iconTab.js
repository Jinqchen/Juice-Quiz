
import React, { useEffect, useState } from "react";
//import { Component } from 'react';
import './iconTab.css' ;    
import {Link } from 'react-router-dom';
//import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai"
import Axios from "axios";

function IconTab(props){
    const [sidebar, setSidebar]=useState(false)
    const [name,setName] = useState()
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
      title: 'Quiz History',
			path: './quizHistory',  
       icon:<AiIcons.AiFillMessage/>,
			cName:"nav-text"
		},
  {
    title: 'New platform',
    path: '/platformCreate',  
    icon:<AiIcons.AiTwotoneBulb/>,
    cName:"nav-text"
  },
  {
    title: 'Manage Quiz',
    path: '/manageQuiz',  
    icon:<AiIcons.AiOutlineBars/>,
    cName:"nav-text"
  }
 
];


useEffect(() => {
   //    const url = `https://juice-quiz.herokuapp.com/api/platform/${this.state.PID}/replimit`;
   const url= `http://localhost:3001/api/getusername/${localStorage.getItem('UID')}`;
   Axios.get(url).then(res=>{return res.data})
   .then((response) => { 
     console.log(response[0]['Uname'])  
    setName(response[0]['Uname'])
   console.log(name)
   });
});


    function handleSignout(){
      console.log(props)
      props.signOutcallback(); 
    }
    
    return(
        <> 
          <div className='navbar-icon'>
            <Link to='#' className='menu-bars'>
              <img src="account.jpg" onClick={showSidebar} className="iconClick" />
              <br/>
              
            <h4 className="userNameHeader" style={{color:'#F78223'}}>{name}</h4>
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
              <Link to={"/"}>
                    <AiIcons.AiFillCaretLeft/>
                    <span onClick={props.signOutCallback}>{"Sign out"}</span >
                    </Link>
              </li>
            </ul>
            
          </nav> 
      </>
    ); 
   
}
    
 export default IconTab