import React from 'react';
import { Component } from 'react';



export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentQuestion:0,
			showScore:false,
			currentScore:0,
			ques:[],
			queslength:0,
			quesText:"",
			opt1:"",
			opt2:"",
			opt3:"",
			opt4:"",
			RIGHT:"",
			answerOptions:[]
		};
	  }
	
	componentDidMount=()=>{
       
		console.log("Component did mount")
		setTimeout(()=>{
			fetch('https://juice-quiz.herokuapp.com/api/get')
        .then(response => {return response.json()})
        .then(json=>  {
		 console.log(json);
		 var myJSON = JSON.stringify(json);
	     var myObj = JSON.parse(myJSON);
		 this.setState({ques:JSON.stringify(myObj) });
		 this.processData();
		
   })   
})
   

      }
    



	    processData =()=>{
			var data = JSON.parse(this.state.ques);
			console.log(data.length);
			this.setState({queslength:data.length});
			let index = this.state.currentQuestion;
			var option1 =data[index]['option1'];
			var option2 =data[index]['option2'];
			var option3 =data[index]['option3'];
			var option4 =data[index]['option4'];
			this.setState({quesText:data[index]['questionText']})
			this.setState({opt1:option1});
			this.setState({opt2:option2});
			this.setState({opt3:option3});
			this.setState({opt4:option4});
			this.setState({answerOptions:[option1,option2,option3,option4]});
			this.setState({RIGHT: data[index]['correct']})
            console.log(this.state.RIGHT)
		}
		
        
		handleNextQuestion =(answerOption)=>{
		var currentQuestion = this.state.currentQuestion;
		var isCorrect = false;
	    if (answerOption === this.state.RIGHT){isCorrect = true;}

	    var currentScore = this.state.currentScore;
	    var questlen = this.state.queslength;
		const nextQuestion=currentQuestion+1;
		if(nextQuestion<questlen){
			if(isCorrect){
			 	currentScore = currentScore +1;
				 this.setState({currentScore:currentScore});
			}else{

			}
			
			this.setState({currentQuestion:nextQuestion});
		}else{
			if(isCorrect){
				currentScore = currentScore +1;
				this.setState({currentScore:currentScore})}
			    this.setState({showScore:true}) ;
		}
		this.processData();
	}
	

   


		
  render(){
	return (
		<div className='app'>
			{this.state.showScore ? (
				<div className='score-section'>You scored  out of {this.state.currentScore}</div>
			) : (
				<>
					<div className='question-section'>
						<div className='question-count'>
							<span>Question {this.state.currentQuestion+1} </span>/
						</div>
						<div className='question-count'>
							<span>Question {this.state.currentQuestion+1} </span>/
						</div>
						<div className='question-text'>{this.state.quesText}</div>
					</div>
					<div className='answer-section'>
						 {this.state.answerOptions.map((answerOption)=>
						 <button onClick={()=>this.handleNextQuestion(answerOption)}>{answerOption}</button>
						 )}
					</div>
				</>
			)}
		</div>
	);
}}
