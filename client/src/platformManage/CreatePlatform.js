import React from 'react';
import { Component } from 'react';  
import { Link } from 'react-router-dom';

import { Media } from 'reactstrap';
import './CreatePlatform.css'; 
import Axios from "axios";  


    export default class EditPlatform extends Component {
        constructor(props) {
            super(props);
            this.state = { 
              trigger:false,   
              name:"",
              tag:"",
              oneOnwer:false,
              requireReputation:0,
              PID:0,
              success:false,
              file:''
            };    
          }
        
        handleChangeName(e) {  
            this.setState({name: e.target.value});   
        }
     
        handleChangeTag(e) {  
        this.setState({tag: e.target.value});   
        }
        handleChangeOnwer(e){
            this.setState({oneOnwer: e.target.value});  
          if (e.target.value){
            this.setState({replimit:99999})
          }    
          
          
          }

        handleReputation(e){
            this.setState({requireReputation: e.target.value});  
         
        }
        

        handlefileSelected (event){
          const files = event.target.files[0]
          this.setState({file:files})
        }





        uploadIcon(event){
          console.log("working")
          event.preventDefault()
          const result =  this.postImage(this.state.file, this.state.name)
        }
        
        postImage(image, name) {
          const formData = new FormData();
          formData.append("image", image)
          formData.append("name", name)
        
          const result = Axios.post(`http://localhost:3001/images/${this.state.PID}`, formData, { headers: {'Content-Type': 'multipart/form-data'}})
          return result.data
        }

        
        submit(e){       
   //   const url = 'https://juice-quiz.herokuapp.com/api/createplatform';
     const url= 'http://localhost:3001/api/createplatform';
      Axios.post(url, { 
             Pname: this.state.name, 
             tag: this.state.tag, 
             replimit:this.state.requireReputation,
             
        }).then((res)=>{return res.data})
        .then((response) => { 
          this.setState({PID:response['PID']});
          this.setState({success:response['success']});
        }); 
      if (this.state.success){
       this.uploadIcon(e)
       this.own();
       this.inital_reputation();
       alert("Platform Created!") 
      }
       
      }
       
        
    //insert to own 
    own(){
    //   const url = `https://juice-quiz.herokuapp.com/api/CreatePlatform/doown`;
		  const url= `http://localhost:3001/api/CreatePlatform/doown`;
	     
		  Axios.post(url, { 
			PID : this.state.PID,
			UID: localStorage.getItem("UID"),
		  }).then((response) => { 
		  console.log(response); 
		  
		  }); 
    }

    inital_reputation(){
    //  const url = 'https://juice-quiz.herokuapp.com/api/CreatePlatform/initalR';
      const url= 'http://localhost:3001/api/CreatePlatform/initalR';
        
       Axios.post(url, { 
       PID : this.state.PID,
       UID: localStorage.getItem("UID"),
       }).then((response) => { 
       console.log(response); 
       
       }); 
 
 
   }



render(){ 
        
	
   
	return (
		<>
		 
		<div className='editBoard'>
		
		<div className="boardTitle">Platform Management?</div> 
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
        <input onChange={this.handlefileSelected.bind(this)} type="file" accept="image/*"></input>
 
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
      {!this.state.oneOnwer&&<li>
        <label>  reputation need
          <input className="repNeed" onChange={this.handleReputation.bind(this)}></input>
 
        </label>
        </li>
      }
      </form>

      
      <button  className="submit" onClick={(e)=>this.submit(e)} >Submit</button>
			 
			</div>

			  </>
			  
	);
  
}

}