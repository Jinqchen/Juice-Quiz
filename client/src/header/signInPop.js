import React from 'react';
import { Component } from 'react';  
import './signInPop.css' 
import Axios from "axios";

export default class signIn extends Component {
      constructor(props) {
          super(props);
          this.state = { 
            trigger:false, 
            email:"",
            password:"" 
            };
            console.log(this.props.SignInVisible)
      }
           
      handleChangePassWord(e) {  
          this.setState({password: e.target.value});  
          this.props.getPassword(this.state.password)
      }
   
      handleChangeEmail(e) {  
      this.setState({email: e.target.value});  
      this.props.getEmail(this.state.email) 
      }   
    


    signIn(){
    //const url = 'https://juice-quiz.herokuapp.com/api/login';
    const url= 'http://localhost:3001/api/login';
        Axios.post(url, {
        email: this.state.email,
        password: this.state.password,
      }).then((response) => {
        console.log(response.data);
        if (response.data['success']===true){
          this.props.signIncallback();
          localStorage.setItem('UID',response.data['UID'] );
          this.props.Success();
          localStorage.setItem('Logged',true);
        }
        else{
          alert(response.data['message'])
        }
      });
    
    }

    
      render(){ 
        
        return (
          
            <div>
            
            <div className='signUpBoard'>
            <button className="cancel" onClick={()=>this.props.signIncallback()} >X</button>
            <button className="SignIn" onClick={()=>this.signIn()} >Sign in</button>
                 

            <label className='SIGNUP'>Login Your account</label> 
                <div className="userInput">    

                 
                    <input type="text" placeholder="Enter Email" name="email" required onChange={this.handleChangeEmail.bind(this)}></input>
                  </div>
                   
                  <div className="userInput">     
                    <input  type="password" placeholder="Enter password" name="password" required onChange={this.handleChangePassWord.bind(this)}></input>
                  </div>
                   
                  </div>

                 
                  </div>
                  
        );
      
    }
}