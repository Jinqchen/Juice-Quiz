import React from 'react';
import { Component } from 'react';
import './App.css' 
import Header from './header/header';
import Menu from './page/menu';

import ShowPlatformList from'./header/showPlatformLIst'
import SinglePlatForm from './singlePlatform/singlePlatForm'


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
				{/* <ShowPlatformList></ShowPlatformList> */}
				
<div className='App'>
				{/* <SinglePlatForm></SinglePlatForm> */}
				{/* <Menu></Menu> */}
		</div>
		<Header></Header>

			</div>
			
		);
	}
}
