import React from 'react';
import { Component } from 'react';  
import { Link } from 'react-router-dom';

import { Media } from 'reactstrap'; 
import Axios from "axios";  
import './quizRate.css'
import {FaStar} from "react-icons/fa"

import {Button, Card} from 'react-bootstrap';


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
              limitedMin:0,
              limitedSec:0,
              timetaken:0,
              PID:0,
              score:0,
              success:true,
              currentQuestion:0,
              questions:initQuestions ,
              rank:80,
              rating:null,
              hover:null,
              timetaken:0

            };    
           this.get()
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
     const url = `https://juice-quiz.herokuapp.com/api/answer/rating`;
		 // const url= `http://localhost:3001/api/answer/rating`;
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



get(){
  console.log("result start ")
    // const url = `https://juice-quiz.herokuapp.com/api/answer/result/${localStorage.getItem('QID')}`;
		   const url= `http://localhost:3001/api/answer/result/${localStorage.getItem('QID')}`;
       Axios.get(url,{
         params:{
            UID: localStorage.getItem('UID')  
         }}).then((response) => { 
           console.log(response.data)
        console.log(response.data[0]['score']);
        this.setState({score:response.data[0]['score']*100});
        this.setState({timetaken:response.data[0]['timespend']});
        //h
        this.setState({limitedMin:  parseInt((this.state.timetaken)/60)})
        
        //s
        this.setState({limitedSec:  parseInt((this.state.timetaken-this.state.limitedMin*60))})

  }
 )
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
   confirm(){
     this.setRate();
   }

   



render(){  
  // const { state } = this.useLocation();
  //  console.log( this.props.location.state )
	return (
		<>
        <span>
      
		 <div className='rateBoardlayOut'> 
     <Link to='/' >
            <button className="cancel"    >X</button> </Link>
         <img src="logo.jpg" className="quizInitIcon" style={{marginBottom:'20px'}}></img>  
        {/* { <div className="editQuestionList"  >
        {/* {this.state.questions.map((item, index) => {
                return ( 
                    item.correct&& <button  type="button" style={{color: "green"}}  >{item.key+1}</button> ||<button  type="button"  style={{color: "red"}} >{item.key+1}</button>
                );
              })} */}
        {/* </div>
         } */}  


          { <div className="editContent">
        <form onSubmit={this.handleSubmit} className="rateEditForm">
          <label className='rateContent'>Congratulations, you got:
          <label className='rateContent'   style={{color: "orange",fontSize:"60px", marginLeft:"40%"}}>{this.state.score } Points 
          </label>


          <label style={{fontSize:"30px",marginBottom:"50px", width:"100%"}}>in <label  style={{color: "orange",fontSize:"50px",width:"50px"}}>{this.state.limitedMin } </label> Mins and <label  style={{color: "orange",fontSize:"50px",width:"50px"}}>{this.state.limitedSec } </label>  Sec
        </label>  
            
          </label>
 
       {/* <label style={{ textAlign:"left", width:"100%"}}>You defeated  <label style={{ textAlign:"left", width:"100%",color: "orange"}}>{this.state.rank }%  </label>
       users of juice quiz</label> */}

       </form>
       
       </div>  }
 
       <div className="rateBoard">   
       <div className="howYouLike">
         How you like this quiz</div>
 {this.starBoard()}</div> 

 
 <div>
       
     <Link to='/' > 
          <Button className='rateConfirm' onClick={()=>this.confirm()}>Confirm</Button></Link>
        </div>
        <div></div>
         </div>
         </span>
         
			  </>
			  
	);
  
}

}