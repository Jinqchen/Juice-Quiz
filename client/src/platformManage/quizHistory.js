import React from 'react';
import { Component } from 'react';  
import { Link } from 'react-router-dom';

import { Media } from 'reactstrap'; 
import Axios from "axios";  

import {Button, Card} from 'react-bootstrap';

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
	}   
	
  	];

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

	
           
		  async get(){
			this._isMounted = true;
		  // const url = `https://juice-quiz.herokuapp.com/api/user/history/${this.state.UID}`;
			 const url= `http://localhost:3001/api/user/history/${this.state.UID}`;
		  const res = await Axios.get(url)
		  .then(res=>{return res.data})
		  .then( result =>{
			  if(this._isMounted){
			  console.log(result);
			  this.setState({places:result},()=>{console.log(this.state.places);});
			  this.setState({renderList:this.state.places});}          
		   });
		}

unsubscribe=(PID)=>{
		 const url = `https://juice-quiz.herokuapp.com/api/platform/delSub/${PID}`;
//	const url= `http://localhost:3001/api/platform/delSub/${PID}`;
	     
	Axios.delete(url, { data:{UID: localStorage.getItem("UID")}}).then((response) => { 
	console.log(response); 
   
	}); 
 this.get();









	}

   
  
//在这里保证点击每个图片可以转到对应的platform
    
render(){ 
        
	const menu = places.map((place) => {
		return(
			  
<div style={{ marginLeft:"10%", paddingTop : '18px',width : '80%' }}  >   
				<Card className="quizHistoryList" style={{}}  > 
		<Card.Body>
			<Card.Title>{place.Pname}</Card.Title>
			<Card.Text  style={{fontSize:"24px"}}>
			Quiz Description score:xx reputation earned:xx 
            <Button classname="redoBtn"style={{background:"red", border:"none",marginLeft:"50%"}} variant="primary" onClick={()=>this.unsubscribe(place.PID)}>Redo</Button> 

			</Card.Text >   
         
		</Card.Body>
        
		</Card>  
	</div>
		   
		);
	});
   
	return (
		<> 
		<div  >
		{menu} 
		</div> 
			  </>
			  
	);
  
}
    
}