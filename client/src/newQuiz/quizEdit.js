import React from 'react';
import { Component } from 'react';  
import { Link } from 'react-router-dom';

import { Media } from 'reactstrap'; 
import Axios from "axios";  
import './quizEdit.css'
const initQuestions=   [
  {
      questionText: 'What is the capital of France?',
      answerOptions: [
          { answerText: 'New York', isCorrect: false },
          { answerText: 'London', isCorrect: true },
          { answerText: 'Paris', isCorrect: false },
          { answerText: 'Dublin', isCorrect: false },
      ],
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
    key:1
}
]
    export default class quizEdit extends Component {

 
        constructor(props) {
            super(props);
            this.state = { 
              trigger:false,   
              name:"Discription",
              discription:"",
              timeLimited:true,
              limitedHour:0,
              limitedMin:0,
              PID:0,
              success:true,
              currentQuestion:0,
              questions:initQuestions , 
              option1:"",
              option2:"",
              option3:"",
              option4:"",
            };    
           
          }
        
        handleChangeAnswerText1(e) {    
          let tmp = [...this.state.questions];       
          tmp[this.state.currentQuestion].answerOptions[0].answerText=e.target.value 
            this.setState({ tmp });      
          
        }
     
        handleChangeAnswerText2(e) {    
          let tmp = [...this.state.questions];       
          tmp[this.state.currentQuestion].answerOptions[1].answerText=e.target.value 
            this.setState({ tmp });      
          
        }


        handleChangeAnswerText3(e) {    
          let tmp = [...this.state.questions];       
          tmp[this.state.currentQuestion].answerOptions[2].answerText=e.target.value 
            this.setState({ tmp });      
          
        }

        handleChangeAnswerText4(e) {    
          let tmp = [...this.state.questions];       
          tmp[this.state.currentQuestion].answerOptions[3].answerText=e.target.value 
            this.setState({ tmp });      
          
        }
        handleChangeDiscription(e) {   
    let tmp = [...this.state.questions];       
    tmp[this.state.currentQuestion].questionText=e.target.value 
      this.setState({ tmp });      
    

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
        
        setAsAnswer(index){ 
          

        let tmp = [...this.state.questions];       
        tmp[this.state.currentQuestion].answerOptions.forEach(element => {
          element.isCorrect=false
         });
        
        tmp[this.state.currentQuestion].answerOptions[index].isCorrect = true;  
          this.setState({ tmp });    
        console.log(tmp[this.state.currentQuestion].answerOptions[index].isCorrect)     
        }
        
        submit(){   
          for (let i = 0; i <  this.state.questions.length; i++) {
            console.log(this.state.questions[i].key)
          }
       
      }
      switchQuestion(index){  
       this.setState({currentQuestion:index})
        console.log(this.state.questions[this.state.currentQuestion].key)
        
        // console.log(this.state.questions[this.state.currentQuestion].questionText+"index1")
        
      }
       
        
    //insert to own 
    own(){}

    inital_reputation(){ 
      const url= 'http://localhost:3001/api/CreatePlatform/initalR';
        
       Axios.post(url, { 
       PID : this.state.PID,
       UID: localStorage.getItem("UID"),
       }).then((response) => { 
       console.log(response); 
       
       }); 
 
 
   }

   discriptionContent(){
     let discription=this.state.questions[this.state.currentQuestion].questionText
     return(
      <textarea    value={discription}
      className="questionDiscription" rows="5" cols="50" required onChange={this.handleChangeDiscription.bind(this)} > 
 </textarea>
     )
   }


   addNewQuestion(){
  this.setState({ questions: [...this.state.questions, {
    questionText: ' ',
    answerOptions: [
        { answerText: ' ', isCorrect: true },
        { answerText: ' ', isCorrect: false },
        { answerText: ' ', isCorrect: false },
        { answerText: ' ', isCorrect: false },
    ],
    key:this.state.questions.length
}] })  

 
   }

   deleteCurrentQuestion(){ 
     let tmp=[]; 
     for (let i = 0; i <  this.state.questions.length; i++) {

      if(this.state.questions[i].key!=this.state.currentQuestion){ 
        tmp=[...tmp,this.state.questions[i]] ;  
       }
    }
  
    for (let i = 0; i <  tmp.length; i++) {
    tmp[i].key=i 
    console.log(tmp[i].key)
    } 
     this.setState({ questions:tmp})  
    this.setState({ currentQuestion:0})
   }

render(){  
   
	return (
		<>
        <span>
      
		 <div className='editQuizeditBoard'> 
         <img src="logo.jpg" className="quizInitIcon"></img>  
        <div className="editQuestionList">
        {this.state.questions.map((item, index) => {
                return ( 
                     <button  type="button" onClick={()=>this.switchQuestion(item.key)}>{item.key+1}</button> 
                );
              })}
        </div>
        

         <div className="editContent">
        <form onSubmit={this.handleSubmit} className="editForm">
             
        <li>
      <label className='editInput'  > {this.state.name}
        </label>  
      </li>
      <li> 
 

      {  this.discriptionContent()
              } 
 


        </li>

        <li> 
        <input value={this.state.questions[this.state.currentQuestion].answerOptions[0].answerText} type="text"   className="editQuizOption" required onChange={this.handleChangeAnswerText1.bind(this)}>
     
          </input>  
      {!this.state.questions[this.state.currentQuestion].answerOptions[0].isCorrect&&<button type="button" className="editButton" onClick={()=>this.setAsAnswer(0)} >set as answer</button> 
      } 
      
        </li>

        <li> 
        <input value={this.state.questions[this.state.currentQuestion].answerOptions[1].answerText} type="text"   className="editQuizOption" required onChange={this.handleChangeAnswerText2.bind(this)}>
     
     </input>  
        {!this.state.questions[this.state.currentQuestion].answerOptions[1].isCorrect&&<button type="button" className="editButton" onClick={()=>this.setAsAnswer(1)} >set as answer</button> 
      } 
      
        </li>

        <li> 
        <input value={this.state.questions[this.state.currentQuestion].answerOptions[2].answerText} type="text"   className="editQuizOption" required onChange={this.handleChangeAnswerText3.bind(this)}>
     
     </input> 
            {!this.state.questions[this.state.currentQuestion].answerOptions[2].isCorrect&&<button type="button" className="editButton" onClick={()=>this.setAsAnswer(2)} >set as answer</button> 
      } 
        </li> 

        <li> 
        <input value={this.state.questions[this.state.currentQuestion].answerOptions[3].answerText} type="text"   className="editQuizOption" required onChange={this.handleChangeAnswerText4.bind(this)}>
     
     </input> 
           {!this.state.questions[this.state.currentQuestion].answerOptions[3].isCorrect&&<button type="button" className="editButton" onClick={()=>this.setAsAnswer(3)} >set as answer</button> 
      } 
        </li>


       <div className="editListButton">
       <button  type="button" onClick={()=>this.addNewQuestion()} >new</button> 
       <button  type="button"  onClick={()=>this.deleteCurrentQuestion()} >delete</button> 
       </div>
        
      <button type="button" className="submit" onClick={()=>this.submit()} >Create</button>  
       </form>
       </div>
         </div>
         </span>
			  </>
			  
	);
  
}

}