import React from 'react';
import { Component } from 'react';  
import { Link } from 'react-router-dom';

import { Media } from 'reactstrap';
import './showPlatformLIst.css' 
import Axios from "axios";  
// const places = 
// 	[
// 		{
// 			id: 0,
// 			name: 'Classic Music',
// 			image: './classicMusic.jpg',
// 			tag: 'music',
//             reputation:1000
// 		} ,
// 		{
// 			id: 1,
// 			name: 'Pop Music',
// 			image: './popMusic.jpg',
// 			tag: 'music',
//             reputation:1000
// 		}  ,
// 		{
// 			id: 2,
// 			name: 'League of Legend',
// 			image: './lol.jpg',
// 			tag: 'game',
//             reputation:1000
// 		} ,
// 		{
// 			id: 3,
// 			name: 'C++',
// 			image: './c++.png',
// 			tag: 'programing',
//             reputation:1000
// 		} ,
// 		{
// 			id: 4,
// 			name: 'NBA',
// 			image: './nba.png',
// 			tag: 'sport',
//             reputation:1000
// 		} ,
// 		{
// 			id: 5,
// 			name: 'Math',
// 			image: './math.jpg',
// 			tag: 'science',
//             reputation:1000
// 		} ,
// 		{
// 			id: 6,
// 			name: 'Japanese Food',
// 			image: './jpFood.jpg',
// 			tag: 'food',
//             reputation:1000
// 		} ,
// 		{
// 			id: 7,
// 			name: 'Itanlian Food',
// 			image: './ITfood.jpg',
// 			tag: 'food',
//             reputation:1000
// 		}  
  

	
// 	];

    export default class showPlatformList extends Component {
        constructor(props) {
            super(props);
            this.state = { 
              trigger:false, 
                UID:localStorage.getItem("UID"),
				place:"",
                renderList:[]
            };   
       this.get();
          }

	unsubscribe(){

	}
           
		  async get(){
			this._isMounted = true;
		   const url = `https://juice-quiz.herokuapp.com/api/user/subscribed/${this.state.UID}`;
			// const url= `http://localhost:3001/api/user/subscribed/${this.state.UID}`;
		  const res = await Axios.get(url)
		  .then(res=>{return res.data})
		  .then( result =>{
			  if(this._isMounted){
			  //console.log(result);
			  this.setState({places:result},()=>{console.log(this.state.places);});
			  this.setState({renderList:this.state.places});}          
		   });
		}



   
  
//在这里保证点击每个图片可以转到对应的platform
    
render(){ 
        
	const menu = this.state.renderList.map((place) => {
		return(
			
			<div className="list">   
		<div class="box">
	<div class="box-bg">
		<img src={place.Pcover} />
	</div>
	<div class="box-text"> 
		<h4>{place.Pname}</h4> 
		
	<button className="boxbtn" > unsubscribed</button>
	</div>
</div>

			 
			
			<div className='reputation' >reputation: {place.Rpoint}/1000
		<progress className='repoBar'  max="1000" value={place.Rpoint}> 10% </progress>
		 
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