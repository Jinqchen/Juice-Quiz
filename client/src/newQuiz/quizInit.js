import React from 'react';
import { Component } from 'react';  
import { Link } from 'react-router-dom';

import { Media } from 'reactstrap'; 
import Axios from "axios";  
import './quizInit.css'


    export default class CreateNewQuiz extends Component {
        constructor(props) {
            super(props);
            this.state = { 
              trigger:false,   
              name:"",
              discription:"",
              timeLimited:true,
              limitedHour:0,
              limitedMin:0,
              PID:0,
              success:true
            };    
          }
        
        handleChangeName(e) {  
            this.setState({name: e.target.value});   
        }
     
        handleChangeDiscription(e) {  
        this.setState({discription: e.target.value});   
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
            
          alert("title "+this.state.name)
          alert("discription "+this.state.discription)
          alert("timeLimit? "+this.state.timeLimited)
          alert("hour "+this.state.limitedHour) 
          alert("Min "+this.state.limitedMin)
      }
       
        
    //insert to own 
    own(){}

    inital_reputation(){
      //const url = 'https://juice-quiz.herokuapp.com/api/CreatePlatform/initalR';
      const url= 'http://localhost:3001/api/CreatePlatform/initalR';
        
       Axios.post(url, { 
       PID : this.state.PID,
       UID: localStorage.getItem("UID"),
       }).then((response) => { 
       console.log(response); 
       
       }); 
 
 
   }




render(){ 
        
	
   
	return (
		<>
		 <div className='initQuizeditBoard'>
         <img src="logo.jpg" className="quizInitIcon"></img> 
        <form onSubmit={this.handleSubmit} className="editForm">
            
      <li>
      <label className='editInput'>  Title
        </label>  
      </li>
      <li> 
        <input  className="initQuizTitle" required onChange={this.handleChangeName.bind(this)}></input> 
        </li>

        <li>
      <label className='editInput'>  Discription
        </label>  
      </li>
      <li> 
      <textarea className="quizDiscription" rows="5" cols="50" required onChange={this.handleChangeDiscription.bind(this)}> 
  </textarea>
        </li>
        <li>
        <label> Limited Time
        <select value={this.state.value} onChange={this.handleTimeLimited.bind(this)} className="LimitedTime">
            <option value="true">On</option>
            <option value="false">Off</option> 
        </select>
          </label> 
          </li>
        
        {  this.state.timeLimited&&<li>
        <label> Hour
             
        <input  className="timeQuizInit" required onChange={this.handleTimeHour.bind(this)}></input> 
          </label> 
          <label> Min
        <input  className="timeQuizInit" required onChange={this.handleTimeMin.bind(this)}></input> 
          </label> 
          </li>

          }
      <button  className="submit" onClick={()=>this.submit()} >Create</button>  
       </form>
         </div>
			  </>
			  
	);
  
}

}