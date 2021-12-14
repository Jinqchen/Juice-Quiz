import React from 'react';
import { Component } from 'react';  
//import "bootstrap/dist/css/bootstrap.min.css"
import Header from './header/header';
import Menu from './page/menu';
import ShowPlatformList from'./header/showPlatformLIst';
import SinglePlatForm from './singlePlatform/singlePlatForm';
import Answer from './Answering.js';
import { BrowserRouter as Router, Route,Routes} from 'react-router-dom';

import ManagePlatform from './platformManage/mangaePlatform'; 
import EditPlatform from './platformManage/EditPlatform';
import CreatePlatform from './platformManage/CreatePlatform';
import QuizInit from './newQuiz/quizInit';
import QuizEdit from './newQuiz/quizEdit';
import QuizManageMent from './platformManage/quizManageMent';
import QuizSetEdit from './newQuiz/quizSetEdit';
import QuizEditAfter from './newQuiz/quizEditAfter';
import QuizRate from './quizRate'
import QuizHistory from './platformManage/quizHistory'
export default class App extends Component {
	constructor(props) {
		super(props);
	}
 
	render() {
		 
		return (
				
            <div className='App'>
				
				<Router> 
				  <Header/>
                  <Routes>
				   	   <Route exact path='/' element={<Menu />} />
				       <Route path='/platform/:id' element={<SinglePlatForm/>} />	  
					   <Route path='/platform/:id/answer/:id' element ={<Answer/>} />
					   <Route path='/profile' element ={<ShowPlatformList/>}/>
					   <Route path='/managePlatform' element ={<ManagePlatform/>}/>
					   <Route path='/manageQuiz' element ={<QuizManageMent/>}/>
					   <Route path='/managePlatform/platformEdit/:id' element ={<EditPlatform/>}/>
                       <Route path='/platformCreate' element ={<CreatePlatform/>}/>
					   <Route path='/quizInit' element ={<QuizInit/>}/> 
					   <Route path='/quizEdit/:id' element ={<QuizEdit/>}/>
					   <Route path='/quizEditAfter/:id' element ={<QuizEditAfter/>}/>
					   <Route path='/quizSetEdit/:id' element ={<QuizSetEdit/>}/>
					   <Route path='/quizRate' element ={<QuizRate/>}/>
					   <Route path='/quizHistory' element ={<QuizHistory/>}/>
			      </Routes>

                </Router>	
		    </div>
		     
			
			
		);
		
	}
}
