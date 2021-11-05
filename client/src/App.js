import React from 'react';
import { Component } from 'react';
import './App.css' 
import Header from './header/header';
import Menu from './page/menu';
import ShowPlatformList from'./header/showPlatformLIst';
import SinglePlatForm from './singlePlatform/singlePlatForm';
import Answer from './Answering.js';
import { BrowserRouter as Router, Route,Routes, Link } from 'react-router-dom';




export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentQuestion: 0, 
		};
	}
 
	render() {
		 
		return (
				
            <div className='App'>
				
				<Router> 
				  <Header/>
                  <Routes>
				   	   <Route exact path='/' element={<Menu />} />
				       <Route path='/platform' element={<SinglePlatForm/>} />	  
					   <Route path='/answer' element ={<Answer/>} />
			      </Routes>

                </Router>	
		    </div>
		     
			
			
		);
		
	}
}