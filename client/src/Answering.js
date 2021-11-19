import React from 'react';
import { Component } from 'react';
import Axios from "axios";


export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data:"",
			currentQuestion: 0,
			showScore: false,
			currentScore: 0,
			ques: [],
			queslength: 0,
			quesText: "",
			opt1: "",
			opt2: "",
			opt3: "",
			opt4: "",
			answerOptions: [],
			QID: localStorage.getItem('QID')
		};
	}

	componentDidMount = () => {
        // const url = `https://juice-quiz.herokuapp.com/api/answer/${this.state.QID}`;
		const url= `http://localhost:3001/api/answer/${this.state.QID}`;
		console.log("Component did mount")
        Axios.get(url)
		.then(res=>{return res.data})
		.then( result =>{
			
			console.log(result);
			this.setState({data:result},()=>{console.log(this.state.data);});
			this.processData()       
		 });

    
	}




	processData = () => {
		console.log(this.state.data);
		var data= this.state.data
		this.setState({ queslength: data.length/4 });
		let index = this.state.currentQuestion*4;
		console.log(index);
		console.log(this.state.queslength);
		console.log("processing");
		this.setState({ quesText: data[index]['Qtext'] });
		console.log(this.state.quesText)
		var option1 = {'text':data[index]['Optionx'],'correctness':data[index]['correctness']};
		var option2 = {'text':data[index+1]['Optionx'],'correctness':data[index+1]['correctness']};
		var option3 = {'text':data[index+2]['Optionx'],'correctness':data[index+2]['correctness']};
		var option4 = {'text':data[index+3]['Optionx'],'correctness':data[index+3]['correctness']};
		
		this.setState({ opt1: option1 });
		this.setState({ opt2: option2 });
		this.setState({ opt3: option3 });
		this.setState({ opt4: option4 });
		this.setState({ answerOptions: [option1, option2, option3, option4] });
		console.log(this.state.answerOptions);
	}


	handleNextQuestion = (answerOption) => {
		var currentQuestion = this.state.currentQuestion;
		console.log('handler');
		var isCorrect = false;
		if (answerOption["correctness"] === 1) { isCorrect = true; }

		var currentScore = this.state.currentScore;
		var questlen = this.state.queslength;

		
		const nextQuestion = currentQuestion+1;
		console.log('nextQuestion');
		console.log('questlen');
		this.setState({ currentQuestion: nextQuestion });
		if (nextQuestion < questlen) {
			if (isCorrect) {
				currentScore = currentScore + 1;
				this.setState({ currentScore: currentScore });
			}

			
		} else {
			if (isCorrect) {
				currentScore = currentScore + 1;
				this.setState({ currentScore: currentScore })
			}
			this.setState({ showScore: true });
		};
		
		console.log(this.state.currentQuestion);
		this.processData();
	}






	render() {
		return (
			<div className='app'>
				{this.state.showScore ? (
					<div className='score-section'>You scored  out of {this.state.currentScore}</div>
				) : (
					<>
						<div className='question-section'>
							<div className='question-count'>
								<span>Question {this.state.currentQuestion + 1} </span>/
							</div>
							<div className='question-text'>{this.state.quesText}</div>
						</div>
						<div className='answer-section'>
							{this.state.answerOptions.map((answerOption) =>
								<button onClick={() => this.handleNextQuestion(answerOption)}>{answerOption['text']}</button>
							)}
						</div>
					</>
				)}
			</div>
		);
	}
}
