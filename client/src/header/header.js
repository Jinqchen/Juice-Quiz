import React from 'react';
import { Component } from 'react';
import './header.css' ; 
import Signup from'./signUpPop';
//import Axios from "axios"


export default class header extends Component {

  
	constructor(props) {
		super(props);
		this.state = { 
            visible:false, 
            userName:"",
            email:"",
            password:"",
            confirmPassword:"",
		};
	  }
//      submit =()=>{
//       Axios.post("https://juice-quiz.herokuapp.com/api/register", { 
//       username: this.state.userName, 
//       email: this.state.email, 
//       password:this.state.password,
//       confirmPassword:this.state.confirmPassword 
//  }).then((response) => { 
//  console.log(response); 
//  }); 
      
//       this.setState({visible:false})
//   }
    getEmail(signUpemail){
      this.setState({email: signUpemail})
      console.log("parent email is:")
      console.log(this.state.email)
    }

    getConfirm(confirm){
      this.setState({confirmPassword: confirm})
      console.log("parent confirmpassword is:")
      console.log(this.state.confirmPassword)
    }

    getUserName(userName){
      this.setState({userName: userName})
      console.log("parent userName is:")
      console.log(this.state.userName)
    }

    getPassword(password){
      this.setState({password: password})
      console.log("parent password is:")
      console.log(this.state.password)
    }

  render(){ 
      
	return (
    
            <div>
            <div className="header">   
            <button onClick={()=>this.setState({visible:true})}  type="button" className='signUp'>Sign up</button>
            </div>            
            {this.state.visible && <Signup getEmail={this.getEmail.bind(this) } getConfirm={this.getConfirm.bind(this)} getPassword={this.getPassword.bind(this)} getUserName={this.getUserName.bind(this)}></Signup>}
 
            {this.state.visible &&<div> <button className='submit' onClick={()=>this.submit()}  >submit</button>
                  <button className='cancel' onClick={()=>this.setState({visible:false})}>X</button>
                  </div>}
            </div>
            
        
	);
}
   
}

 
