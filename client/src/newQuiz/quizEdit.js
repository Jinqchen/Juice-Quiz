import React from 'react';
import { Component } from 'react';  
import { Link } from 'react-router-dom';

import { Media } from 'reactstrap'; 
import Axios from "axios";   
const initQuestions=   [
  {
      questionText: '',
      answerOptions: [
          { answerText: '', isCorrect: false },
          { answerText: '', isCorrect: true },
          { answerText: '', isCorrect: false },
          { answerText: '', isCorrect: false },
      ],
      key:0
  },
]
    export default class quizEdit extends Component {

    
        constructor(props) {
            super(props);
            this.state = { 
              trigger:false,   
              name:"Description",
              description:"",
              timeLimited:true,
              limitedHour:0,
              limitedMin:0,
              PID:0,
              QID:-1,
              success:true,
              currentQuestion:0,
              questions:initQuestions , 
              option1:"",
              option2:"",
              option3:"",
              option4:"",
            };    
           
          }
        
      
          componentDidMount = () => {
            
            const url = `https://juice-quiz.herokuapp.com/api/answer/${this.state.QID}`;
        // const url= `http://localhost:3001/api/answer/${this.state.QID}`;
            Axios.get(url)
        .then(res=>{return res.data})
        .then( result =>{ 
          console.log("first fetch")
          console.log(result);
          console.log("end of first fetch")
          this.setState({data:result},()=>{console.log(this.state.data);});
          this.processData()  ;this.setState({QID:localStorage.getItem("QID")})     
         });
    
        
      }

      processData = () => {
        this._isMounted = true;
        console.log("start to process data")
        console.log(this.state.data);
        var data= this.state.data
        this.setState({ queslength: data.length/4 });
        var index = this.state.currentQuestion*4;
        console.log()
        console.log(index);
        console.log(this.state.queslength);
        console.log("processing");

        for (var i=0; i< (data.length/4) ;i++){
        this.setState({ quesText: data[index]['Qtext'] });
        console.log(this.state.quesText)
        var option1 = {'answerText':data[index]['Optionx'],'isCorrect':data[index]['correctness']==1};
        var option2 = {'answerText':data[index+1]['Optionx'],'isCorrect':data[index+1]['correctness']==1};
        var option3 = {'answerText':data[index+2]['Optionx'],'isCorrect':data[index+2]['correctness']==1};
        var option4 = {'answerText':data[index+3]['Optionx'],'isCorrect':data[index+3]['correctness']==1};
        
        this.setState({ opt1: option1 });
        this.setState({ opt2: option2 });
        this.setState({ opt3: option3 });
        this.setState({ opt4: option4 });
        this.setState({ answerOptions: [option1, option2, option3, option4] });
        var q= {
          questionText: this.state.quesText,
          answerOptions: this.state.answerOptions,
          key:i
      };
      this.setState({questions:[...this.state.questions,q]})
    }
      //this.setState({questions:this.state.questions.slice(1)})
      console.log(this.state.questions);
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

       
        
        setAsAnswer(index){ 
        let tmp = [...this.state.questions];       
        tmp[this.state.currentQuestion].answerOptions.forEach(element => {
          element.isCorrect=false
         });
        
        tmp[this.state.currentQuestion].answerOptions[index].isCorrect = true;  
          this.setState({ tmp });    
        console.log(tmp[this.state.currentQuestion].answerOptions[index].isCorrect)     
        }
        
        
        
        //sun
        submit(){   
        const url = 'https://juice-quiz.herokuapp.com/api/quizsetCreate';
          //   const url= 'http://localhost:3001/api/quizsetCreate';
      
         Axios.post(url, { 
              QID: localStorage.getItem('QID'), 
              questions:this.state.questions 
         }).then((response) => { 
         console.log(response); 
         alert("create success")
         }); 
    
    }







      switchQuestion(index){  
       this.setState({currentQuestion:index})
        console.log(this.state.questions[this.state.currentQuestion].key)
        
        // console.log(this.state.questions[this.state.currentQuestion].questionText+"index1")
        
      }
       
        
    

  

   discriptionContent(){
     console.log('description')
     console.log(this.state.questions)
     console.log("end of description")
     let description=this.state.questions[this.state.currentQuestion].questionText
     return(
      <textarea    value={description}
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
         <img src="/logo.jpg" className="quizInitIcon"></img>  
        <div className="editQuestionList">
        {this.state.questions.map((item, index) => {
                return (  
                  this.state.currentQuestion==index&&  <button style={{color:"black"}} type="button" onClick={()=>this.switchQuestion(item.key)}>{item.key+1}</button> || <button style={{color:"white"}} type="button" onClick={()=>this.switchQuestion(item.key)}>{item.key+1}</button> 
               );
             })}
              <button  style={{color:"white"}} type="button" onClick={()=>this.addNewQuestion()} >+</button> 
       </div>

         <div className="editContent">
        <form onSubmit={this.handleSubmit} className="QEAeditForm">
              
      <label className='editInput'  > {this.state.name}
        </label>   
       
 

      {  this.discriptionContent()} 
 

 

        {/* <li> 
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
        </li> */}
      
      <input value={this.state.questions[this.state.currentQuestion].answerOptions[0].answerText} type="text"   className="editQuizOption" required onChange={this.handleChangeAnswerText1.bind(this)}>
     
     </input>  
 {!this.state.questions[this.state.currentQuestion].answerOptions[0].isCorrect&&<button type="button" className="editButton" onClick={()=>this.setAsAnswer(0)} >set as answer</button>  ||<label style={{display:"inline-block"}}>√</label>
 }  

   <input value={this.state.questions[this.state.currentQuestion].answerOptions[1].answerText} type="text"   className="editQuizOption" required onChange={this.handleChangeAnswerText2.bind(this)}>

</input>  
   {!this.state.questions[this.state.currentQuestion].answerOptions[1].isCorrect&&<button type="button" className="editButton" onClick={()=>this.setAsAnswer(1)} >set as answer</button> ||<label>√</label>
 } 
  

   <input value={this.state.questions[this.state.currentQuestion].answerOptions[2].answerText} type="text"   className="editQuizOption" required onChange={this.handleChangeAnswerText3.bind(this)}>

</input> 
       {!this.state.questions[this.state.currentQuestion].answerOptions[2].isCorrect&&<button type="button" className="editButton" onClick={()=>this.setAsAnswer(2)} >set as answer</button>  ||<label>√</label>
 }  

   <input value={this.state.questions[this.state.currentQuestion].answerOptions[3].answerText} type="text"   className="editQuizOption" required onChange={this.handleChangeAnswerText4.bind(this)}>

</input> 
      {!this.state.questions[this.state.currentQuestion].answerOptions[3].isCorrect&&<button type="button" className="editButton" onClick={()=>this.setAsAnswer(3)} >set as answer</button>  ||<label>√</label>
 }  


       <div className="editListButton"> 
       <button  type="button"  onClick={()=>this.deleteCurrentQuestion()} >delete</button> 
       </div>
      <Link to='/'>
      <button type="button" className="submit" onClick={()=>this.submit()} >Create</button> 
      </Link> 
       </form>
       </div>
         </div>
         </span>
			  </>
			  
	);
  
}

}