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
    
    
    // componentDidMount=()=>{
    //     this.process();
       
    // };




    // filter=(tag)=>{ 
    //     const newList=[]
    //     for (let i = 0; i < this.state.places.length; i++) { 
    //         if(this.state.places[i].tag===tag){    
    //           newList.push(this.state.places[i])
    //         }
    //     }
    //          console.log(newList.length) 
    //          this.setState({renderList:newList})
    // };
  
     filter=(tag)=>{
         const url = `https://juice-quiz.herokuapp.com/api/Platform/${tag}`;
       //  const url= `http://localhost:3001/api/Platform/${tag}`;
      const res = Axios.get(url)
      .then(res=>{return res.data})
      .then( result =>{
          console.log(result);
          this.setState({places:result});
          this.state.renderList=[...this.state.places];
          console.log(this.state.renderList.length);
          this.setState({places:this.state.renderList});
       });
     }
    



    handleChangeSearch(e) {  
		this.setState({searchContent: e.target.value});   
	} 
 
    async process(){
       const url = 'https://juice-quiz.herokuapp.com/api/Platform';
       //  const url= 'http://localhost:3001/api/Platform';
      const res = await Axios.get(url)
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
    async search(){
    alert(this.state.searchContent)
     const url=`https://juice-quiz.herokuapp.com/api/platformSearch/${this.state.searchContent}`;
     //const url= `http://localhost:3001/api/platformSearch/${this.state.searchContent}`;
      const res = await Axios.get(url)
      .then(res=>{return res.data})
      .then( result =>{
		
		  //console.log(result);
          this.setState({places:result},()=>{console.log(this.state.places);});
          this.setState({renderList:this.state.places});        
       }); 
    }
 


    
	render() {    
		return (
            <div>
			<div className="menu">
                
            { <div className="tagFilter">
                
                 <button onClick={()=>this.process()}    type="button"  className="tag"> General</button>
                 <button onClick={()=>this.filter("Music")}    type="button"  className="tag">Music</button>
                 <button onClick={()=>this.filter("Sport")}    type="button"  className="tag">Sport</button>
                 <button onClick={()=>this.filter("Programming")}    type="button"  className="tag"> Programming</button>
                 <button onClick={()=>this.filter("Science")}   type="button"  className="tag">Science</button>
                 <button onClick={()=>this.filter("Food")}    type="button"  className="tag">Food</button>
                 <button onClick={()=>this.filter("Movie")}    type="button"  className="tag">Movie</button>
                 <button onClick={()=>this.filter("Culture")}    type="button" className="tag">Culture</button>
                 <button onClick={()=>this.filter("Math")}    type="button" className="tag">Math</button> 
                 <button onClick={()=>this.filter("Game")}    type="button" className="tag">Game</button>
            </div> }
            
            
            { <div className="search"> 
			 <input type="text" className='searchContent' required onChange={this.handleChangeSearch.bind(this)}></input>
			{  <button className='searchButton'onClick={()=>this.search()}>Search </button>   }
			</div> }
 
            <PlatFormList places={this.state.renderList} />  
            {/* <div>
                <button onClick={()=>this.process()} type="button">Refresh</button>
            </div> */}
            </div>
		</div>
		);
	}
    
}

