import React from 'react';
import { Component } from 'react';
import './header.css' ; 
import Signup from'./signUpPop';
import Signin from'./signInPop';
import { Media } from 'reactstrap';
//import Axios from "axios"


export default class header extends Component {

  
	constructor(props) {
		super(props);
		this.state = { 
            login:false,
            SignInVisible:false, 
            SignupVisible:false,
            userName:"",
            email:"",
            password:"",
            confirmPassword:"",
            display:"none"
		};
	  }
   
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
    
    signIncallback=()=>{
      this.setState({SignInVisible: false,display:"none"})
    }
    signUpcallback=()=>{
      this.setState({SignupVisible: false,display:"none"})
    }

    Success=()=>{
      this.setState({login:true})
    }


    signOut(){
      this.setState({login:false})
    }

    userIcon(){

      alert("icon hit")
    }

  render(){  
      
	return (
            <div>
            <div className="navbar">
            <img src="logo.jpg"></img>
            {!this.state.login&&<button onClick={()=>this.setState({SignInVisible:true,display:"block"})}  type="button" className='account'>Sign in</button>||<button onClick={()=>this.signOut()}  type="button" className='account'>Sign out</button>}
            { !this.state.login&&<button onClick={()=>this.setState({SignupVisible:true,display:"block"})}  type="button" className='account'>Sign up</button>||<img src="account.jpg" className='accountIcon'  onClick={()=>this.userIcon()} ></img>}
       
             </div>
          
          <div className="main" style={{display:this.state.display}}> 
          {this.state.SignInVisible && <Signin   signIncallback={this.signIncallback} Success={this.Success} getEmail={this.getEmail.bind(this) }  getPassword={this.getPassword.bind(this)}   className="board"></Signin>}
        
          {this.state.SignupVisible && <Signup  signUpcallback={this.signUpcallback} Success={this.Success} getEmail={this.getEmail.bind(this) } getConfirm={this.getConfirm.bind(this)} getPassword={this.getPassword.bind(this)} getUserName={this.getUserName.bind(this)} className="board"></Signup>}
              
       
          </div>
          </div>
             
        
	);
}
   
}


//const Child = ({ fn }) => <button onClick={fn}>Click me!</button>