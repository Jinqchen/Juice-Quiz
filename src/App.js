import React, { useState } from 'react';

export default function App() {

  const [currentQuestion,setCurrentQuestion]=useState(0);
	const [showScore, setShowScore]=useState(false);
	const [currentScore,setScore]=useState(0);
	const questions = [
		{
			questionText: 'What is 1+1?',
			answerOptions: [
				{ answerText: '1', isCorrect: false },
				{ answerText: '3', isCorrect: false },
				{ answerText: '2', isCorrect: true },
				{ answerText: '4', isCorrect: false },
			],
		},
		{
			questionText: 'Hou many stars are there in the whole universe',
			answerOptions: [
				{ answerText: '1000', isCorrect: false },
				{ answerText: '13200000', isCorrect: true },
				{ answerText: '42000', isCorrect: false },
				{ answerText: '8200000', isCorrect: false },
			],
		},
		{
			questionText: 'Where is Berlin?',
			answerOptions: [
				{ answerText: 'German', isCorrect: true },
				{ answerText: 'France', isCorrect: false },
				{ answerText: 'Grace', isCorrect: false },
				{ answerText: 'Italy', isCorrect: false },
			],
		},
		{
			questionText: 'why do I use React?',
			answerOptions: [
				{ answerText: 'Pretty sure that there is a good reason', isCorrect: false },
				{ answerText: 'Becasue others sucks', isCorrect: false },
				{ answerText: 'Becasue is good', isCorrect: false },
				{ answerText: 'Becasue professor ask to', isCorrect: true },
			],
		},
	];
	const handleNextQuestion=(isCorrect)=>{
    if(isCorrect){
      setScore(currentScore+1);
   }else{

   }
		const nextQuestion=currentQuestion+1;
		if(nextQuestion<questions.length){
		
			setCurrentQuestion(nextQuestion);
		}else{
			setShowScore(true);
		}
	}
	

	return (
		<div className='app'>
			
			{showScore ? (
				<div className='score-section'>Your score is {currentScore}</div>
			) : (
				<>
					<div className='question-section'>
						<div className='question-count'>
							<span>Question {currentQuestion+1}</span>/{questions.length}
						</div>
						<div className='question-text'>{questions[currentQuestion].questionText}</div>
					</div>
					<div className='answer-section'>
						 {questions[currentQuestion].answerOptions.map((answerOptions)=>
						 <button onClick={()=>handleNextQuestion(answerOptions.isCorrect)}>{answerOptions.answerText}</button>
						 )}
					</div>
				</>
			)}
		</div>
	);
}
