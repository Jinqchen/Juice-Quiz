import React from 'react';
import { Component } from 'react';  
import './signUpPop.css' ;
import Axios from "axios";
 
    export default class signUp extends Component {
        constructor(props) {
            super(props);
            this.state = { 
              trigger:false,
                userName:"",
                email:"",
                password:"",
                conformPassword:"",
            };
            
          }
          handleChangeUserName(e) { 
             this.setState({userName: e.target.value});  
             this.props.getUserName(this.state.userName)
            
        }
        handleChangePassWord(e) {  
          this.setState({password: e.target.value});  
          this.props.getPassword(this.state.password)
        
     }
   
       handleChangeEmail(e) {  
     this.setState({email: e.target.value});  
     this.props.getEmail(this.state.email)
    
}

    handleChangeConfirmPassword(e){
      this.setState({conformPassword: e.target.value});
      this.props.getConfirm(this.state.conformPassword)

    }

    //这里传参给后端  
    signUp(){
     // const url = 'https://juice-quiz.herokuapp.com/api/register';
      const local= 'http://localhost:3001/api/register';
      if(this.state.password===this.state.conformPassword){   
         Axios.post(local, { 
              username: this.state.userName, 
              email: this.state.email, 
              password:this.state.password,
              confirmPassword:this.state.confirmPassword 
         }).then((response) => { 
         console.log(response); 
         this.setState({visible:false})
         this.props.signUpcallback();
         }); 
     }
     else{
       alert("The password is not the same")
     }

           
    }
    
      render(){ 
        
        return (
          
            <div>
            
            <div className='signUpBoard'>
              
            <button className="cancel" onClick={()=>this.props.signUpcallback()} >X</button>
           
            <label className='SIGNUP'>Create Your account</label> 
                <div className="userInput">    

                 
                    <input type="text" placeholder="Enter Email" name="email" required onChange={this.handleChangeEmail.bind(this)}></input>
                  </div>
                  <div className="userInput">     
                    <input type="text" placeholder="Enter UserName" name="useName" required  onChange={this.handleChangeUserName.bind(this)}>

                    </input>
                  </div>
                  <div className="userInput">     
                    <input type="text" placeholder="Enter password" name="password" required onChange={this.handleChangePassWord.bind(this)}></input>
                  </div>
                  <div className="userInput">     
                    <input type="text" placeholder="Confirm your password" name="confirmPassword" required onChange={this.handleChangeConfirmPassword.bind(this)}></input>
                  </div>
                 
                  </div>
            <button className="SignUp" onClick={()=>this.signUp()} >Sign in</button>

                  
                  </div>
        );
      
    }
}