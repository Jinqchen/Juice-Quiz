import React from 'react';
import { Component } from 'react';   
import { Media } from 'reactstrap';
import Axios from "axios";
import { Link } from 'react-router-dom';

import {Button, Card} from 'react-bootstrap';

export default class quizManageMent extends Component {
	_isMounted = false;
	constructor(props) {
		super(props);
		this.state = {
			//决定是否显示subscribe按钮和订阅按钮
			logged:localStorage.getItem("Logged"),
			places: [],
            renderList:[],
			hotac:true,
			rateac:true,
			UID:localStorage.getItem('UID'),
			QID:0,
			PID: localStorage.getItem('PID'),
			rander:false,
			searchContent:"",
			rank:'',
			quiznum:0,
		};
        
	}
    

	
 componentDidMount=()=>{
	this.getnumber();	
	this.setState({rander:true});
	
}




	async getnumber(){
		this._isMounted = true;
     // const url = `https://juice-quiz.herokuapp.com/api/manageQuiz/quizlist_total/${this.state.UID}`;
		 const url= `http://localhost:3001/api/manageQuiz/quizlist_total/${this.state.UID}`;
      const res = await Axios.get(url)
      .then(res=>{return res.data})
      .then( result =>{
		  this.setState({quiznum: result},()=>{
			  console.log(this.state.quiznum)
			  if(this.state.quiznum.length!=0){
		        this.get() ;}
		
		});
          
       });
    };

  
  
	async get(){

		this._isMounted = true;
		for(var i=0;i<this.state.quiznum.length;i++){ 
	 // const url = `https://juice-quiz.herokuapp.com/api/manageQuiz/quizlist/${this.state.quiznum[i]['QID']}`;
		 const url= `http://localhost:3001/api/manageQuiz/quizlist/${this.state.quiznum[i]['QID']}`;
      const res = await Axios.get(url)
      .then(res=>{return res.data})
      .then( result =>{
		  if(this._isMounted){
			  result[0]['QID']=this.state.quiznum[i]['QID'];
		  this.state.places.push(result[0]);
          console.log(this.state.places)
          this.setState({renderList:this.state.places});}          
       });}
    };


    //Search 
	handleChangeSearch(e) {  
		this.setState({searchContent: e.target.value});   
	} ;

	async search(){
		if (this.state.searchContent===""){
			this.get();
		}else{
			const url= `https://juice-quiz.herokuapp.com/api/quiz/${this.state.searchContent}`;
		//const url= `http://localhost:3001/api/quiz/${this.state.searchContent}`;
		  const res = await Axios.get(url,{
			params: {
			  PID: this.state.PID			  
			}
		  })
		  .then(res=>{return res.data})
		  .then( result =>{
			  console.log(result);
			  this.setState({places:result},()=>{console.log(this.state.places);});
			  this.setState({renderList:this.state.places});        
		   });
		}
	};

store=(place)=>{
	localStorage.setItem('QID',place.QID);
}
 

delete_quiz(quizID){
//  const url = `https://juice-quiz.herokuapp.com/api/platform/delCoown/${this.state.PID}`;
    const url= `http://localhost:3001/api/quiz/delete/${quizID}`;	     
    Axios.delete(url).then((response) => { 
    console.log(response);
	
    }); 
	this.get() 
}


	render() {     
	
		const menu = this.state.renderList.map((place) => {
			return( 
				<div style={{paddingLeft : '18px' ,paddingTop : '18px' }}  >   
				<Card className="managePlatFormSingleItem" style={{width : '18rem' }}  >
		<Card.Img  src="./demo-image.jpg" />
		<Card.Body>
			<Card.Title>{place.Qname}</Card.Title>
			<Card.Text  style={{fontSize:"12px",textOverflow:"ellipsis", height:"28px",whiteSpace:"nowrap",overflow:"hidden"}}>
			{place.description}
			</Card.Text >  
			<div className="quizMngBtn"  style={{marginLeft:"-5%"}}>
			<Link   to={'/quizEditAfter/'+place.QID}  onClick={()=>this.store(place)}>
			<Button variant="primary" onClick>Edit</Button>
			</Link>
		<Button  variant="primary" onClick={()=>this.delete_quiz(place.QID)}>Delete</Button>
		
		</div>
		</Card.Body>

		</Card>  
	</div>
			   
			);
		});
		return (
           <div>
		
            <div className="header"> 
			</div> 
			  <div className="singlePlatformsearch"> 
			<input className='singlePlatformsearchContent' required onChange={this.handleChangeSearch.bind(this)}></input>
			<button className='singlePlatformsearchButton'onClick={()=>this.search()}>Search </button>
			</div>     
             
  
			<div>
			{
			this.state.rander&&<div className="ManagePlatFormList">
            {menu}</div>
	        }			
			</div>
		</div>
		)
	}
    
}