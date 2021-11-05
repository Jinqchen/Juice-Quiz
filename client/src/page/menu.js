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
            searchContent:"",
			places: "",
            renderList:[{}]
		};
   
       this.process();
        
	}
    
    
    componentDidMount=()=>{
        console.log("MO");
        this.process();
       
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
    
    handleChangeSearch(e) {  
		this.setState({searchContent: e.target.value});   
	} 
 
    async process(){
       // const url = 'https://juice-quiz.herokuapp.com/api/Platform';
        const local= 'http://localhost:3001/api/Platform';
      const res = await Axios.get(local)
      .then(res=>{return res.data})
      .then( result =>{
          console.log(result);
          this.setState({places:result});
          this.state.renderList=[...this.state.places];
          console.log(this.state.renderList.length);
          this.setState({places:this.state.renderList});
       });
    }

    //在这里进行qurey
    search(){
    alert(this.state.searchContent)
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
            
            
            <div className="search"> 
			<input className='searchContent' required onChange={this.handleChangeSearch.bind(this)}></input>
			<button className='searchButton'onClick={()=>this.search()}>Search </button>
			</div>



			<div className="item">
            <PlatFormList places={this.state.renderList} /> 
            </div>
            {/* <div>
                <button onClick={()=>this.process()} type="button">Refresh</button>
            </div> */}
            </div>
		</div>
		);
	}
    
}

