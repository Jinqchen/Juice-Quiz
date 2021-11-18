import React from 'react';
import { Component } from 'react';  
import { Link } from 'react-router-dom';

import { Media } from 'reactstrap';
import './EditPlatform.css'; 
import Axios from "axios";  


    export default class EditPlatform extends Component {
        constructor(props) {
            super(props);
            this.state = { 
              trigger:false,   
              name:"",
              tag:"",
              oneOnwer:false,
              requireReputation:0
            };    
          }
          handleChangeName(e) {  
            this.setState({name: e.target.value});   
        }
     
        handleChangeTag(e) {  
        this.setState({tag: e.target.value});   
        }
        handleChangeOnwer(e)   {
            this.setState({oneOnwer: e.target.value});   
        }

        handleReputation(e){
            this.setState({requireReputation: e.target.value});   
        }
        submit(){ 
    
        }
        uploadIcon(){

        }
        create(){
          
        }
    
render(){ 
        
	
   
	return (
		<>
		 
		<div className='editBoard'>
		
		<div className="boardTitle">Platform Management</div> 
        <form onSubmit={this.handleSubmit} className="editForm">
      <li>
      <label className='editInput'>   Platform Name
          <input   required onChange={this.handleChangeName.bind(this)}></input> 
        </label> 
      </li>
      <li>
        <label className='editInput'>  Select tag:
          <select value={this.state.value} onChange={this.handleChangeTag.bind(this)}>
            <option value="music">music</option>
            <option value="sport">sport</option>
            <option value="programing">programing</option>
            <option value="science">science</option>
            <option value="food">food</option>
            <option value="movie">movie</option>
            <option value="life">life</option>
          </select>
        </label>
        </li>
        <li>
        <label className='editInput' >  Upload paltform icon
          <button onClick={()=>this.uploadIcon()}>Upload</button>
 
        </label>

        </li>

        <li>
        <label> Allow co-owenr application
        <select value={this.state.value} onChange={this.handleChangeOnwer.bind(this)}>
            <option value="true">Yes</option>
            <option value="false">no</option> 
          </select>
          </label>

          </li>
          <li>
        <label>  reputation need
          <input className="repNeed" onChange={this.handleReputation.bind(this)}></input>
 
        </label>
        </li>
     
      </form>

      <button  className="submit" onClick={()=>this.submit()} >Submit</button>
			 
			  </div>

			  </>
			  
	);
  
}

}