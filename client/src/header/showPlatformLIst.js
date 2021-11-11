import React from 'react';
import { Component } from 'react';  
import { Link } from 'react-router-dom';

import { Media } from 'reactstrap';
import './showPlatformLIst.css'   
const places = 
	[
		{
			id: 0,
			name: 'Classic Music',
			image: './classicMusic.jpg',
			tag: 'music',
            reputation:1200
		} ,
		{
			id: 1,
			name: 'Pop Music',
			image: './popMusic.jpg',
			tag: 'music',
            reputation:200
		}  ,
		{
			id: 2,
			name: 'League of Legend',
			image: './lol.jpg',
			tag: 'game',
            reputation:5230
		} ,
		{
			id: 3,
			name: 'C++',
			image: './c++.png',
			tag: 'programing',
            reputation:7000
		} ,
		{
			id: 4,
			name: 'NBA',
			image: './nba.png',
			tag: 'sport',
            reputation:5000
		} ,
		{
			id: 5,
			name: 'Math',
			image: './math.jpg',
			tag: 'science',
            reputation:1000
		} ,
		{
			id: 6,
			name: 'Japanese Food',
			image: './jpFood.jpg',
			tag: 'food',
            reputation:1000
		} ,
		{
			id: 7,
			name: 'Itanlian Food',
			image: './ITfood.jpg',
			tag: 'food',
            reputation:1000
		}  
  

	
	];

    export default class showPlatformList extends Component {
        constructor(props) {
            super(props);
            this.state = { 
              trigger:false, 
                email:"",
                password:"" ,
                renderList:{places}
            };   
      
          }

	unsubscribe(){

	}
           
     
   
  
//在这里保证点击每个图片可以转到对应的platform
    
      render(){ 
        
        const menu = this.state.renderList.places.map((place) => {
            return(
			    
                <div className="list">   
			<div class="box">
        <div class="box-bg">
            <img src={place.image} />
        </div>
        <div class="box-text"> 
            <h4>{place.name}</h4> 
			
		<button className="boxbtn" > unsubscribed</button>
        </div>
    </div>
 
				 
				
                <div className='reputation' >reputation: {place.reputation}/10000
			<progress className='repoBar'  max="10000" value={place.reputation}> 70% </progress>
			 
				</div>
                </div>
               
			);
		});
       
        return (
			<>
			
            <div className='board'>

            <div className="boardTitle">subscribed platform</div>
			
            {menu}


                 
                  </div>

				  </>
                  
        );
      
    }
    
}