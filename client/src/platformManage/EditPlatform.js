import React from 'react';
import { Component } from 'react';  
import { Link } from 'react-router-dom';

import { Media } from 'reactstrap';
import './EditPlatform.css'; 
import Axios from "axios";  
import { Card } from 'reactstrap';


    export default class EditPlatform extends Component {
        constructor(props) {
            super(props);
            this.state = { 
              trigger:false,   
              name:"",
              tag:"",
              namechange:false,
              tagchange:false,
              oneOnwer:false,
              requireReputation:0,
              repchange:false,
              EPID:localStorage.getItem('EditPID'),
              success:false
            };    
          }
        handleChangeName(e) {  
            this.setState({name: e.target.value}); 
            this.setState({namechange:true});  
        }
     
        handleChangeTag(e) {  
        this.setState({tag: e.target.value});  
        this.setState({tagchange:true}); 
        }

        handleChangeOnwer(e)   {
            this.setState({oneOnwer: e.target.value}); 
            if (e.target.value){
              this.setState({replimit:99999});
              this.setState({repchange:true}); 
            }    
        }

        handleReputation(e){
            this.setState({requireReputation: e.target.value}); 
            console.log(this.state.requireReputation)
            this.setState({repchange:true});  
        }

       updateName(){
    //    const url = `https://juice-quiz.herokuapp.com/api/EditPlatform/name/${this.state.name}`;
          const url= `http://localhost:3001/api/EditPlatform/name/${this.state.name}`;
        Axios.put(url,{PID:this.state.EPID}).then((response) => { 
      console.log(response); 
      }
      )
    }
    updateTag(){
    //  const url = `https://juice-quiz.herokuapp.com/api/EditPlatform/tag/${this.state.tag}`;
        const url= `http://localhost:3001/api/EditPlatform/tag/${this.state.tag}`;
      
    Axios.put(url,{PID:this.state.EPID}).then((response) => { 
    console.log(response); 
    }
    )
  }
  updateRep(){
     // const url = `https://juice-quiz.herokuapp.com/api/EditPlatform/replimit/${this.state.replimit}`;
     const url= `http://localhost:3001/api/EditPlatform/replimit/${this.state.requireReputation}`;
    
  Axios.put(url,{PID:this.state.EPID}).then((response) => { 
  console.log(response); 
  }
  )
}





        submit(){ 
        if(this.state.namechange){
          this.updateName()
        }
        if(this.state.tagchange){
          this.updateTag()
        }
        if(this.state.repchange){
          this.updateRep()
        }
        alert("Change updated!")
        }
        // uploadIcon(){

        // }
        // create(){
          
        // }
    
render(){ 
        
	
   
	return (
		<>
		 
		<div className='EPeditBoard'>

  
		<div className="boardTitle">Platform Management</div> 
        <form onSubmit={this.handleSubmit} className="editForm">
      <div style={{display:"inline-block"}}>
      <label className='EPeditInput'>Platform Names  
          
        </label> 
        <input   required onChange={this.handleChangeName.bind(this)}></input> 
      </div>
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
        {/* <li>
        <label className='editInput' >  Upload paltform icon
          <button onClick={()=>this.uploadIcon()}>Upload</button>
 
        </label>

        </li> */}

        <li>
        <label> Allow co-owenr application
        <select value={this.state.value} onChange={this.handleChangeOnwer.bind(this)}>
            <option value="true">Yes</option>
            <option value="false">no</option> 
          </select>
          </label>

          </li>
         {!this.state.oneOnwer&& <li>
        <label>  reputation need
          <input className="repNeed" onChange={this.handleReputation.bind(this)}></input>
 
        </label>
        </li>
     }
      </form>

      <button  className="submit" onClick={()=>this.submit()} >Submit</button>
			 
			  </div>

			  </>
			  
	);
  
}

}