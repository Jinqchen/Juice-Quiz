import React from 'react';
import { Component } from 'react';



export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
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
			answerOptions: []
		};
	}

	componentDidMount = () => {

		console.log("Component did mount")
		setTimeout(() => {
			fetch('https://juice-quiz.herokuapp.com/api/get')
				.then(response => { return response.json() })
				.then(json => {
					console.log(json);
					var myJSON = JSON.stringify(json);
					var myObj = JSON.parse(myJSON);
					this.setState({ ques: JSON.stringify(myObj) });
					console.log("before");
					this.processData();
					console.log("after");

				})
		})


	}




	processData = () => {
		var data = JSON.parse(this.state.ques);
		this.setState({ queslength: data["count(QuestionID)"] });
		let index = this.state.currentQuestion;
		console.log(index);
		console.log(this.state.queslength);
		console.log("processing");
		let Optionx = data[index + 1]['Optionx'];
		var option1 = Optionx[0];
		var option2 = Optionx[1];
		var option3 = Optionx[2];
		var option4 = Optionx[3];
		this.setState({ quesText: data[index + 1]['Qtext'] });
		this.setState({ opt1: option1 });
		this.setState({ opt2: option2 });
		this.setState({ opt3: option3 });
		this.setState({ opt4: option4 });
		this.setState({ answerOptions: [option1, option2, option3, option4] });
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
								<button onClick={() => this.handleNextQuestion(answerOption)}>{answerOption['Optionx']}</button>
							)}
						</div>
					</>
				)}
			</div>
		);
	}
}
