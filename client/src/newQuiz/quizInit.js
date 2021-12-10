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
         <img src="./logo.jpg" className="quizInitIcon"></img> 
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

      <li>
      <label className='editInput'>  Reputation Point
        </label>  
      </li>
      <li> 
        <input  className="initQuizTitle" required onChange={this.handleChangeRep.bind(this)}></input> 
      </li>



       <Link to={'/quizEdit/'+this.state.QID}>
      <button  className="submit" onClick={()=>this.submit()} >Create</button>  
        </Link>
       
       </form>
         </div>
			  </>
			  
	);
  
}

}