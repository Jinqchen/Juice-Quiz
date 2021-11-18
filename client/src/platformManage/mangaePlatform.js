import React from 'react';
import { Component } from 'react';  
import { Link } from 'react-router-dom';

import { Media } from 'reactstrap';
import './mangaePlatform.css' 
import Axios from "axios";  
const places = 
	[
		{
			id: 0,
			name: 'Classic Music',
			image: './classicMusic.jpg',
            reputation:1000,
			isOwner:false
		} ,
		{
			id: 1,
			name: 'Pop Music',
			image: './popMusic.jpg',
            reputation:1000,
			isOwner:true
		}  ,
		{
			id: 2,
			name: 'League of Legend',
			image: './lol.jpg',
            reputation:1000,
			isOwner:false
		} ,
		{
			id: 3,
			name: 'C++',
			image: './c++.png',
            reputation:1000,
			isOwner:false
		} ,
		{
			id: 4,
			name: 'NBA',
			image: './nba.png',
            reputation:1000,
			isOwner:false
		} ,
		{
			id: 5,
			name: 'Math',
			image: './math.jpg',
            reputation:1000,
			isOwner:false
		} ,
		{
			id: 6,
			name: 'Japanese Food',
			image: './jpFood.jpg',
            reputation:1000,
			isOwner:false
		} ,
		{
			id: 7,
			name: 'Itanlian Food',
			image: './ITfood.jpg',
            reputation:1000,
			isOwner:false
		}  
  

	
	];

    export default class managePlatform extends Component {
        constructor(props) {
            super(props);
            this.state = { 
              trigger:false,  
				place:"",
				renderList:{places}
            };   
    //    this.get();
			this.setState({renderList:places});     
          }

	unsubscribe(){

	}
           
		//   async get(){
		// 	this._isMounted = true;
		//    const url = `https://juice-quiz.herokuapp.com/api/user/subscribed/${this.state.UID}`;
		// 	// const url= `http://localhost:3001/api/user/subscribed/${this.state.UID}`;
		//   const res = await Axios.get(url)
		//   .then(res=>{return res.data})
		//   .then( result =>{
		// 	  if(this._isMounted){
		// 	  //console.log(result);
		// 	  this.setState({places:result},()=>{console.log(this.state.places);});
		// 	  this.setState({renderList:this.state.places});}          
		//    });
		// }



   
  
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
			<button className="boxbtn-manage" > manage</button>
			</div>
	</div>
	
	{place.isOwner&&<div className='status'>status: onwer</div>}
	{!place.isOwner&&<div className='status'>status: co-owner</div>}
	{!place.isOwner&&
	<div className='reputation'>reputation: {place.reputation}/10000
				<progress className='repoBar'  max="10000" value={place.reputation}> 70% </progress>
				
			</div>
			
			}
	
				
			</div>
		   
		);
	});
   
	return (
		<>
		 
		<div className='board'>
		
		<div className="boardTitle">Platform Management</div> 
		{menu}


			 
			  </div>

			  </>
			  
	);
  
}

}