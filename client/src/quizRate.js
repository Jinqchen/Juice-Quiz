import React from 'react';
import { Component } from 'react';  
import { Link } from 'react-router-dom';

import { Media } from 'reactstrap'; 
import Axios from "axios";  
import './quizRate.css'
import {FaStar} from "react-icons/fa"
const initQuestions=   [
  {
      questionText: 'What is the capital of France?',
      answerOptions: [
          { answerText: 'New York', isCorrect: false },
          { answerText: 'London', isCorrect: true },
          { answerText: 'Paris', isCorrect: false },
          { answerText: 'Dublin', isCorrect: false },
      ],
      correct:true,
      key:0
  },
  {
    questionText: 'What is the capital of ff?',
    answerOptions: [
        { answerText: 'A', isCorrect: false },
        { answerText: 'B', isCorrect: false },
        { answerText: 'C', isCorrect: true },
        { answerText: 'D', isCorrect: false },
    ],
    correct:false,
    key:1
}


]
    export default class quizEdit extends Component {

 
        constructor(props) {
            super(props);
            this.state = { 
              trigger:false,   
              name:"Congratulations, You got ",
              discription:"",
              timeLimited:true,
              limitedHour:0,
              limitedMin:0,
              PID:0,
              score:90,
              success:true,
              currentQuestion:0,
              questions:initQuestions ,
              rank:80,
              rating:null,
              hover:null
            };    
           
          }
        
      
     
    
       
        
    //insert to own 
    
   discriptionContent(){
     let discription=this.state.questions[this.state.currentQuestion].questionText
     return(
      <textarea    value={discription}
      className="questionDiscription" rows="5" cols="50" required onChange={this.handleChangeDiscription.bind(this)} > 
 </textarea>
     )
   }
   setRate(rate){
       console.log(rate)
       this.setState({rating:rate},()=>{
     //const url = `https://juice-quiz.herokuapp.com/api/answer/rating`;
		  const url= `http://localhost:3001/api/answer/rating`;
       Axios.put(url,{
            QID:localStorage.getItem('QID'),
            rating:rate, 
            UID: localStorage.getItem('UID')  
}).then((response) => { 
 console.log(response); 
 }
 )



       })
  



   }
   starBoard(){ 
       return(<div className="starBoard">
 
        {[...Array(5)].map((star,i)=>{
            let ratingVale=i+1;
                 return <label >
                     <input style={{display:"none"}} type="radio" name="rating" value={ratingVale} onClick={()=>this.setRate(ratingVale)}/>
                     <FaStar className="star" 
                     color={ratingVale<=(this.state.hover||this.state.rating)?"#ffc107":"e4e5e9"}
                     size={80} 
                     onMouseEnter={()=>this.setState({hover:ratingVale})}
                     onMouseLeave={()=>this.setState({hover:null})}
                     /></label>
            })}
       </div>
        
       )
   }

   



render(){  
   
	return (
		<>
        <span>
      
		 <div className='editQuizeditBoard'> 
         <img src="logo.jpg" className="quizInitIcon"></img>  
        { <div className="editQuestionList"  >
        {this.state.questions.map((item, index) => {
                return ( 
                    item.correct&& <button  type="button" style={{color: "green"}}  >{item.key+1}</button> ||<button  type="button"  style={{color: "red"}} >{item.key+1}</button>
                );
              })}
        </div>
         }


          { <div className="editContent">
        <form onSubmit={this.handleSubmit} className="rateEditForm">
          <label className='rateContent'>Congratulations, you got:
          <label className='rateContent'   style={{color: "orange",fontSize:"60px", marginLeft:"40%"}}>{this.state.score } Points 
          </label>


          <label style={{fontSize:"30px",marginBottom:"50px", width:"100%"}}>in <label  style={{color: "orange",fontSize:"50px",width:"50px"}}>{this.state.limitedHour } </label> hour and <label  style={{color: "orange",fontSize:"50px",width:"50px"}}>{this.state.limitedMin } </label>  minutes
        </label>  
            
          </label>

          {/* <label   className="rank">You defeated <label  style={{color: "orange",fontSize:"48px "}}>{this.state.rank }% 
       </label> users in juice quiz</label> */}
       <label style={{ textAlign:"left", width:"100%"}}>You defeated  <label style={{ textAlign:"left", width:"100%",color: "orange"}}>{this.state.rank }%  </label>
       users of juice quiz</label>

       </form>
       
       </div>  }

         {/* <div className="editContent">
        <form onSubmit={this.handleSubmit} className="editForm">
              
      <label className='editInput'  style={{fontSize:"50px"}} > Congratulations,<br/> You got   <label  style={{color: "orange",fontSize:"80px", marginLeft:"40%"}}>{this.state.score }
       </label> points  
       <label style={{fontSize:"30px",marginBottom:"50px"}}>
       in <label  style={{color: "orange",fontSize:"50px"}}>{this.state.limitedHour } </label> hour and <label  style={{color: "orange",fontSize:"50px"}}>{this.state.limitedMin } </label>  minutes
        </label>  
            </label> <br/> 
        <label className="rank">You defeated <label  style={{color: "orange",fontSize:"48px "}}>{this.state.rank }% 
       </label> users in juice quiz</label>
    
         
       </form>
       <div className="rateBoard">
        <label> How you like this quiz </label>
       
 {this.starBoard()}</div>
       </div> */}
       <div className="rateBoard">   
       <div className="howYouLike">
         How you like this quiz</div>
 {this.starBoard()}</div> 
         </div>
         
         </span>
         
			  </>
			  
	);
  
}

}