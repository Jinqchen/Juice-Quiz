import React from 'react';
import { Component } from 'react';  
import { Link } from 'react-router-dom';

import { Media } from 'reactstrap'; 
import Axios from "axios";  
import './quizInit.css'

import {Button, Card} from 'react-bootstrap';

    export default class CreateNewQuiz extends Component {
        constructor(props) {
            super(props);
            this.state = { 
              trigger:false,   
              name:"",
              description:"",
              timeLimited:true,
              limitedHour:0,
              limitedMin:0,
              PID:localStorage.getItem('PID'),
              UID:localStorage.getItem('UID'),
              success:false,
              Repoint:0,
              QID:0,
            };    
          }
        
        handleChangeName(e) {  
            this.setState({name: e.target.value});   
        }
        handleChangeRep(e) {  
          this.setState({Repoint: e.target.value});   
      }
     
        handleChangeDiscription(e) {  
        this.setState({description: e.target.value});   
        }

        handleTimeLimited(e)   {
            this.setState({timeLimited: e.target.value});    
            this.render()
          }
         handleTimeHour(e){
            this.setState({limitedHour: e.target.value});           
         } 
 
        handleTimeMin(e){
            this.setState({limitedMin: e.target.value});    
        } 
        
        
        submit(){ 
      //      const url = 'https://juice-quiz.herokuapp.com/api/initQuiz';
     const url= 'http://localhost:3001/api/initQuiz';
     Axios.post(url, { 
            title: this.state.name, 
            description: this.state.description, 
            timelimit:this.state.limitedHour*3600+this.state.limitedMin*60,
            Repoint:this.state.Repoint,
            PID:this.state.PID,
            UID:this.state.UID
            
       }).then((res)=>{return res.data})
       .then((response) => { 
         console.log(response);
         this.setState({QID:response['QID']});
         localStorage.setItem('QID',response['QID'])
         this.setState({success:response['success']});
       }); 
     if (this.state.success){
      alert("Quiz Created! Please start to edit quiz!") 
     }
         
      }
       
        
   
    



render(){ 
        
	
   
	return (
		<>

    
		 <div className='initQuizeditBoard'>
     <Link to='/'>
            <button className="cancel"   >X</button> </Link>
         <img src="./logo.jpg" className="quizInitIcon"></img> 
        <form onSubmit={this.handleSubmit} className="editForm">
            
      <div className='initeditInput'>  Title
        <input  className="initQuizTitle" required onChange={this.handleChangeName.bind(this)}></input>  
        </div>   
 
      <div className='initeditInput'>  Discription   
      <textarea className="quizDiscription" rows="5" cols="50" required onChange={this.handleChangeDiscription.bind(this)}> 
  </textarea>
        </div>

 
        <div style={{color:'white'}}> Limited Time
        <select value={this.state.value} onChange={this.handleTimeLimited.bind(this)} className="LimitedTime">
            <option value="true">On</option>
            <option value="false">Off</option> 
        </select>
          </div>  
        
        {  this.state.timeLimited&& 
        <div style={{display:'flex',color:'white',marginTop:'20px'}}> 
        <div className='timeInit'> Hour
             
        <input maxLength={2} className="timeQuizInit" required onChange={this.handleTimeHour.bind(this)}></input> 
          </div> 
           <div  className='timeInit'> Min
        <input maxLength={2} className="timeQuizInit" required onChange={this.handleTimeMin.bind(this)}></input> 
          </div>  
          </div>
          }
 
      <div className='initeditInput' >  Reputation Point
        <input  className="initQuizTitle" style={{width:'50%',marginLeft:'20px'}} required onChange={this.handleChangeRep.bind(this)}></input>  
        </div>    

 
        <Link to={'/quizEdit/'+this.state.QID}>
      <Button style={{backgroundColor:'white',color:"#fc7e18",border:'none',marginLeft:'40%',width:'10%',height:'50px',marginTop:'20px'}} className="initSumbit" onClick={()=>this.submit()} >Create</Button>  
        </Link>        

       </form>
         </div>
			  </>
			  
	);
  
}

}