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
            reputation:1000
		} ,
		{
			id: 1,
			name: 'Pop Music',
			image: './popMusic.jpg',
			tag: 'music',
            reputation:1000
		}  ,
		{
			id: 2,
			name: 'League of Legend',
			image: './lol.jpg',
			tag: 'game',
            reputation:1000
		} ,
		{
			id: 3,
			name: 'C++',
			image: './c++.png',
			tag: 'programing',
            reputation:1000
		} ,
		{
			id: 4,
			name: 'NBA',
			image: './nba.png',
			tag: 'sport',
            reputation:1000
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
           
     
   
  
//在这里保证点击每个图片可以转到对应的platform
    
      render(){ 
        
        const menu = this.state.renderList.places.map((place) => {
            return(
			    
                <div className="list">  
               
                <Media left>
				<Link to="../platform">
			 	<Media object src={place.image} alt={place.id} className='object'/> 
                </Link>
                <h>{place.name}</h>
				
				</Media>
				
                <Media className='reputation' >{place.reputation}</Media>
                </div>
               
			);
		});
       
        return (
          
            <div className='board'>
            
            {menu}

                 
                  </div>
                  
        );
      
    }
    
}