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
		store=(place)=>{
			localStorage.setItem('QID',place.QID);
			
		}
		redo(){

		}

 
   
  
//在这里保证点击每个图片可以转到对应的platform
    
render(){ 
        
	const menu = this.state.renderList.map((place) => {
		return(
			  
<div style={{ marginLeft:"10%", paddingTop : '18px',width : '80%' }}  >   
{	place.QID!=0&&<Card className="quizHistoryList" style={{}}  > 
		<Card.Body style={{color:'grey'}}>
			<Card.Title>{place.Qname}</Card.Title>
			<Card.Text  style={{fontSize:"24px"}}>
			{place.description} 
			<h4>Score: {place.score}  </h4> 
			<h4>Finished at: {place.whendo}</h4> 
			<h4>Reputation earned: {place.reputationneed}</h4>
			{/* <Link className='SinglePlatformtitle' style={{textDecoration: "none"}} to={"/platform/"+place.PID+"/answer/"+place.QID } onClick={()=>this.store(place)}>    */}
            <Button classname="redoBtn"style={{background:"red", border:"none",marginLeft:"90%"}} variant="primary" 
		   onClick={()=>this.redo(place.PID)}>Redo</Button>  
				{/* </Link>  */}
 		</Card.Text >   
         
		</Card.Body>
        
		</Card> 
		||

		<Card className="quizHistoryList" style={{}}  > 
		<Card.Body style={{color:'grey'}}>
			<Card.Title>Deleted quiz</Card.Title>
			<Card.Text  style={{fontSize:"24px"}}>
				
			<h4>Score: {place.score}  </h4>  
			<h4>Finished at: {place.whendo}</h4>  
		 
 		</Card.Text >   
         
		</Card.Body>
        
		</Card> 
		}
			


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