import React from 'react';
import { Component } from 'react';  
import { Link } from 'react-router-dom';
import './mangaePlatform.css' ;    
import { Media } from 'reactstrap'; 
import Axios from "axios";    

import styles  from "bootstrap/dist/css/bootstrap.min.css"
import {Button, Card} from 'react-bootstrap';
    export default class managePlatform extends Component {
        constructor(props) {
            super(props);
            this.state = { 
              trigger:false,  
				place:"",
				renderList:[],
				UID:localStorage.getItem("UID"),
            };   
            this.get();
			//this.setState({renderList:places});     
          }


           
		  async get(){
			this._isMounted = true;
		 const url = `https://juice-quiz.herokuapp.com/api/user/owned/${this.state.UID}`;
		//	  const url= `http://localhost:3001/api/user/owned/${this.state.UID}`;
		  const res = await Axios.get(url)
		  .then(res=>{return res.data})
		  .then( result =>{
			  if(this._isMounted){
			  //console.log(result);
			  this.setState({places:result},()=>{console.log(this.state.places);});
			  this.setState({renderList:this.state.places});}          
		   });
		}


store=(place)=>{
	 console.log("clicked");
	localStorage.setItem('EditPID', place['PID']);
 
}
   
  
//在这里保证点击每个图片可以转到对应的platform
    
render(){ 
        
	const menu = this.state.renderList.map((place) => {
		return(
			
	<div style={{paddingLeft : '5%' ,paddingTop : '5%' }}  >   
	 	<Card className="managePlatFormSingleItem" style={{width : '25rem' }}  >
		<Card.Img  src={'https://juicequiztest.s3.amazonaws.com'+place.Pcover} />
  
  <Card.Body>
    <Card.Title>{place.Pname}</Card.Title>
  

	<Link to={'./platformEdit/'+place.Pname} onClick={()=>this.store(place)}>
	<Button variant="primary" onClick>Manage</Button>
	</Link>
  </Card.Body>
</Card>  
			</div>
		   
		);
	});
   
	return (
		<> 
<div className="ManagePlatFormList">
{menu}</div>

		</>
			  
	);
  
}

}