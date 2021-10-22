import React from 'react';
import { Component } from 'react';  
import './signUpPop.css' 

 
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
      render(){ 
        
        return (
          
            <div>
            
            <div className='signUpBoard'>

            <label className='SIGNUP'>SignUp</label> 
                <div className="userInput">    

                
                    <label>Email:</label>
                    <input type="text" placeholder="Enter Email" name="email" required onChange={this.handleChangeEmail.bind(this)}></input>
                  </div>
                  <div className="userInput">    
                    <label>UserName:</label>
                    <input type="text" placeholder="Enter UserName" name="useName" required  onChange={this.handleChangeUserName.bind(this)}>

                    </input>
                  </div>
                  <div className="userInput">    
                    <label>Password:</label>
                    <input type="text" placeholder="Enter password" name="password" required onChange={this.handleChangePassWord.bind(this)}></input>
                  </div>
                  <div className="userInput">    
                    <label>Confirm your pass word:</label>
                    <input type="text" placeholder="Confirm your password" name="confirmPassword" required onChange={this.handleChangeConfirmPassword.bind(this)}></input>
                  </div>
                 
                  </div>

                  
                  </div>
        );
      
    }
}