import React from 'react';
import { Component } from 'react';  
import { Link } from 'react-router-dom';

import { Media } from 'reactstrap';
import './showPlatformLIst.css' 
import Axios from "axios";  

import {Button, Card} from 'react-bootstrap';

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
		   // const url = `https://juice-quiz.herokuapp.com/api/user/subscribed/${this.state.UID}`;
			const url= `http://localhost:3001/api/user/subscribed/${this.state.UID}`;
		  const res = await Axios.get(url)
		  .then(res=>{return res.data})
		  .then( result =>{
			  if(this._isMounted){
			  //console.log(result);
			  this.setState({places:result},()=>{console.log(this.state.places);});
			  this.setState({renderList:this.state.places});}          
		   });
		}

   unsubscribe=(PID)=>{
//		 const url = `https://juice-quiz.herokuapp.com/api/platform/delSub/${PID}`;
	const url= `http://localhost:3001/api/platform/delSub/${PID}`;
	     
	Axios.delete(url, { data:{UID: localStorage.getItem("UID")}}).then((response) => { 
	console.log(response); 
    this.get();
	}); 
}

   
  
//在这里保证点击每个图片可以转到对应的platform
    
render(){ 
        
	const menu = this.state.renderList.map((place) => {
		return(
			
// 			<div className="list">   
// 		<div class="box">
// 	<div class="box-bg">
// 		<img src={place.Pcover} />
// 	</div>
// 	<div class="box-text"> 
// 		<h4>{place.Pname}</h4> 
		
// 	<button className="boxbtn" onClick={()=>this.unsubscribe(place.PID)}> unsubscribed</button>
// 	</div>
// </div> 
// 			<div className='reputation' >reputation: {place.Rpoint}/1000
// 		<progress className='repoBar'  max="1000" value={place.Rpoint}> 10% </progress>
		 
// 			</div>
// 			</div>

<div style={{paddingLeft : '18px' ,paddingTop : '18px'}}  >   
				<Card className="managePlatFormSingleItem" style={{width : '18rem' }}  >
		<Card.Img  src={'https://juicequiztest.s3.amazonaws.com'+place.Pcover} />
		<Card.Body>
			<Card.Title>{place.Pname}</Card.Title>
			<Card.Text  style={{fontSize:"12px"}}>
			Platform Description
			</Card.Text >   
			<Button style={{background:"red", border:"none"}} variant="primary" onClick={()=>this.unsubscribe(place.PID)}>Unsubscribe</Button> 
		</Card.Body>
		</Card>  
	</div>
		   
		);
	});
   
	return (
		<>
		
		<div className='ManagePlatFormList'>
		{menu}
		</div>

			  </>
			  
	);
  
}
    
}