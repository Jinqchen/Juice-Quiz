import React from 'react';
import { Component } from 'react';
import './App.css' 
import Header from './header/header';
import Menu from './page/menu';


export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentQuestion: 0, 
		};
	}
 


 
 



	render() {
		return (

			<div>
<div className='App'>
				
				<Menu></Menu>
		</div>
		<Header></Header>

			</div>
			
		);
	}
}
