// import React from 'react';
// import { Component } from 'react';  
// import { Link } from 'react-router-dom';

// import { Media } from 'reactstrap';
// import './CreatePlatform.css'; 
// import Axios from "axios";  


//     export default class EditPlatform extends Component {
//         constructor(props) {
//             super(props);
//             this.state = { 
//               trigger:false,   
//               name:"",
//               tag:"",
//               oneOnwer:false,
//               requireReputation:0,
//               PID:0,
//               success:false
//             };    
//           }
        
//         handleChangeName(e) {  
//             this.setState({name: e.target.value});   
//         }
     
//         handleChangeTag(e) {  
//         this.setState({tag: e.target.value});   
//         }
//         handleChangeOnwer(e){
//             this.setState({oneOnwer: e.target.value});  
//           if (e.target.value){
//             this.setState({replimit:99999})
//           }    
          
          
//           }

//         handleReputation(e){
//             this.setState({requireReputation: e.target.value});  
         
//         }
        
//         uploadIcon(){

//         }
        
        
        
//         submit(){       
//    //   const url = 'https://juice-quiz.herokuapp.com/api/createplatform';
//      const url= 'http://localhost:3001/api/createplatform';
//       Axios.post(url, { 
//              Pname: this.state.name, 
//              tag: this.state.tag, 
//              replimit:this.state.requireReputation,
             
//         }).then((res)=>{return res.data})
//         .then((response) => { 
//           this.setState({PID:response['PID']});
//           this.setState({success:response['success']});
//         }); 
//       if (this.state.success){
//         this.own();
//        this.inital_reputation();
//        alert("Platform Created!") 
//       }
       
//       }
       
        
//     //insert to own 
//     own(){
//     //   const url = `https://juice-quiz.herokuapp.com/api/CreatePlatform/doown`;
// 		  const url= `http://localhost:3001/api/CreatePlatform/doown`;
	     
// 		  Axios.post(url, { 
// 			PID : this.state.PID,
// 			UID: localStorage.getItem("UID"),
// 		  }).then((response) => { 
// 		  console.log(response); 
		  
// 		  }); 
//     }

//     inital_reputation(){
//     //  const url = 'https://juice-quiz.herokuapp.com/api/CreatePlatform/initalR';
//       const url= 'http://localhost:3001/api/CreatePlatform/initalR';
        
//        Axios.post(url, { 
//        PID : this.state.PID,
//        UID: localStorage.getItem("UID"),
//        }).then((response) => { 
//        console.log(response); 
       
//        }); 
 
 
//    }




// render(){ 
        
	
   
// 	return (
// 		<>
		 
// 		<div className='editBoard'>
		
// 		<div className="boardTitle">Platform Management?</div> 
//         <form onSubmit={this.handleSubmit} className="editForm">
//       <li>
//       <label className='editInput'>   Platform Name
//           <input   required onChange={this.handleChangeName.bind(this)}></input> 
//         </label> 
//       </li>
//       <li>
//         <label className='editInput'>  Select tag:
//           <select value={this.state.value} onChange={this.handleChangeTag.bind(this)}>
//             <option value="music">music</option>
//             <option value="sport">sport</option>
//             <option value="programing">programing</option>
//             <option value="science">science</option>
//             <option value="food">food</option>
//             <option value="movie">movie</option>
//             <option value="life">life</option>
//           </select>
//         </label>
//         </li>
//         {/* <li>
//         <label className='editInput' >  Upload paltform icon
//           <button onClick={()=>this.uploadIcon()}>Upload</button>
 
//         </label>

//         </li> */}

//         <li>
//         <label> Allow co-owenr application
//         <select value={this.state.value} onChange={this.handleChangeOnwer.bind(this)}>
//             <option value="true">Yes</option>
//             <option value="false">no</option> 
//         </select>
//           </label>

//           </li>
//       {!this.state.oneOnwer&&<li>
//         <label>  reputation need
//           <input className="repNeed" onChange={this.handleReputation.bind(this)}></input>
 
//         </label>
//         </li>
//       }
//       </form>

      
//       <button  className="submit" onClick={()=>this.submit()} >Submit</button>
			 
// 			</div>

// 			  </>
			  
// 	);
  
// }

// }



import React from 'react';
import { Component } from 'react';  
import { Link } from 'react-router-dom';

import { Media } from 'reactstrap';
import './EditPlatform.css'; 
import Axios from "axios";   

import {Button, Card} from 'react-bootstrap';

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
              success:false,
              file:''
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

handlefileSelected (event){
  const files = event.target.files[0]
  this.setState({file:files})
}


postImage(image, name) {
  const formData = new FormData();
  formData.append("image", image)
  formData.append("name", name)

  const result = Axios.post(`http://localhost:3001/images/${this.state.PID}`, formData, { headers: {'Content-Type': 'multipart/form-data'}})
  return result.data
}
uploadIcon(event){
  console.log("working")
  event.preventDefault()
  const result =  this.postImage(this.state.file, this.state.name)
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
    
render(){ 
        
	
   
	return (
		<>
		 
		<div className='EPeditBoard'>
    <div>
            
            <div className='signUpBoard'>
            <Link to='/'>
            <button className="cancel"   >X</button> </Link>
                 

            <label className='SIGNUP'>New Platform</label> 
                <div className="userInput">    
                <label className='EPeditInput'>Platform Name:  
                <input style={{width:"480px"}} onChange={this.handleChangeName.bind(this)}></input>
          </label> 
                  </div>
                   
                
                   
                  <div className="userInput">    
                        <label className='EPeditInput'>  Select tag:
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
                </div>
                <div className="userInput">    
                        
                        <label  className='EPeditInput'> Allow co-owenr application
                
                <select value={this.state.value} onChange={this.handleChangeOnwer.bind(this)}>
                    <option value="true">Yes</option>
                    <option value="false">no</option> 
                  </select>
                  </label>
                                </div>


                                    {
    !this.state.oneOnwer&& <div className="userInput">    
                                    <label className='EPeditInput'>  reputation need
              <input style={{width:"180px"}} onChange={this.handleReputation.bind(this)}></input>
    
            </label>


              </div>

}

                <div className="userInput">     
                <input onChange={this.handlefileSelected.bind(this)} type="file" accept="image/*"></input>
 
                </div>

                <div className="userInput">     
                <Button className='EPsubmit' style={{background:'white',color:"#F78223",border:"none"}} onClick={(e)=>this.submit(e)}>Create</Button>
                </div>
              
                  </div>

                 
                  </div>
  
	
			  </div>

			  </>
			  
	);
  
}

}