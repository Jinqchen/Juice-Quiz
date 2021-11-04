import React from 'react';
import { Component } from 'react';
import './menu.css'  
import PlatFormList from './platFormList'; 
//import { PLACES } from './platFormItems';
import Axios from "axios";

export default class Menu extends Component {
	constructor(props) {
		super(props);
		this.state = {
			places: "",
            renderList:[{}]
		};
   
       this.process();
        
	}
    
    
    componentDidMount=()=>{
        console.log("MO");
        this.process();
        this.refresh();
    };




    filter=(tag)=>{ 
        const newList=[]
        for (let i = 0; i < this.state.places.length; i++) { 
         if(this.state.places[i].tag===tag){    
            newList.push(this.state.places[i])
         }
             }
             console.log(newList.length) 
             this.setState({renderList:newList})
    };
    
    refresh(){   
       
         
    };
 
//
    async process(){
      const res = await Axios.get('https://juice-quiz.herokuapp.com/api/Platform')
      .then(res=>{return res.data})
      .then( result =>{
          console.log(result);
          this.setState({places:result});
          this.state.renderList=[...this.state.places];
           console.log(this.state.renderList.length);
          this.setState({places:this.state.renderList});
      
         
         
 
    });

}



	render() {    
		return (
            <div>
			<div className="menu">
                
            <div className="tagFilter">
                
                 <button onClick={()=>this.process()}    type="button"  className="tag"> General</button>
                 <button onClick={()=>this.filter("music")}    type="button"  className="tag">Music</button>
                 <button onClick={()=>this.filter("sport")}    type="button"  className="tag">Sport</button>
                 <button onClick={()=>this.filter("programing")}    type="button"  className="tag"> Programing</button>
                 <button onClick={()=>this.filter("science")}   type="button"  className="tag">Science</button>
                 <button onClick={()=>this.filter("food")}    type="button"  className="tag">Food</button>
                 <button onClick={()=>this.filter("movie")}    type="button"  className="tag">Movie</button>
                 <button onClick={()=>this.filter("life")}    className="tag">Life</button>
                 
            
            
            </div>
            
			<div className="item">
            <PlatFormList places={this.state.renderList} /> 
            </div>
            </div>
		</div>
		);
	}
    
}

