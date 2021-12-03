import React from 'react';
import { Component } from 'react';   
import { Media } from 'reactstrap';
import Axios from "axios";
import { Link } from 'react-router-dom';

export default class quizManageMent extends Component {
	_isMounted = false;
	constructor(props) {
		super(props);
		this.state = {
			//决定是否显示subscribe按钮和订阅按钮
			logged:localStorage.getItem("Logged"),
			places: [],
            renderList:[{}],
			hotac:true,
			rateac:true,
			UID:localStorage.getItem('UID'),
			PID: localStorage.getItem('PID'),
			rander:false,
			searchContent:"",
			rankList:[{}],
			rank:'',
			quiznum:0,
		};
        
	}
    

	
 componentDidMount=()=>{
	this.getnumber();
	
	
	this.setState({rander:true});
	
}





// Sort function 
	sortByHot(){ 
		var places = this.state.places
		if(this.state.hotac){
          places.sort(function(a, b){return -a.hot + b.hot});
		   this.setState({hotac:false});
		}
		else{
		 places.sort(function(a, b){return a.hot - b.hot}); 
		 this.setState({hotac:true});
		}
		
		this.setState({rateac:true})
		console.log(places)
		
		this.setState({renderList: places })
	}
	
	sortByRate(){
		var places = this.state.places
		if(this.state.rateac){
			places.sort(function(a, b){return -a.ave_rate + b.ave_rate}); 
			this.setState({rateac:false})
		  }
		  else{
		   places.sort(function(a, b){return a.ave_rate - b.ave_rate}); 
		   this.setState({rateac:true})
		  }
		  this.setState({hotac:true})
		console.log(places)
		this.setState({renderList: places })

	}
 

  
	async getnumber(){
		this._isMounted = true;
      const url = `https://juice-quiz.herokuapp.com/api/manageQuiz/quizlist_total/${this.state.UID}`;
	//	 const url= `http://localhost:3001/api/manageQuiz/quizlist_total/${this.state.UID}`;
      const res = await Axios.get(url)
      .then(res=>{return res.data})
      .then( result =>{
		  this.setState({quiznum: result},()=>{
			  console.log(this.state.quiznum)
			  if(this.state.quiznum.length!=0){
		        this.get() ;}
		
		});
          
       });
    };

  
  
	async get(){

		this._isMounted = true;
		for(var i=0;i<this.state.quiznum.length;i++){ 
	  const url = `https://juice-quiz.herokuapp.com/api/manageQuiz/quizlist/${this.state.UID}`;
	//	 const url= `http://localhost:3001/api/manageQuiz/quizlist/${this.state.quiznum[i]['QID']}`;
      const res = await Axios.get(url)
      .then(res=>{return res.data})
      .then( result =>{
		  if(this._isMounted){
			  result[0]['QID']=this.state.quiznum[i]['QID'];
		  this.state.places.push(result[0]);
          console.log(this.state.places)
          this.setState({renderList:this.state.places});}          
       });}
   





    };


//Search 
	handleChangeSearch(e) {  
		this.setState({searchContent: e.target.value});   
	} ;

	async search(){
		if (this.state.searchContent===""){
			this.get();
		}else{
			const url= `https://juice-quiz.herokuapp.com/api/quiz/${this.state.searchContent}`;
		//const url= `http://localhost:3001/api/quiz/${this.state.searchContent}`;
		  const res = await Axios.get(url,{
			params: {
			  PID: this.state.PID			  
			}
		  })
		  .then(res=>{return res.data})
		  .then( result =>{
			
			  console.log(result);
			  this.setState({places:result},()=>{console.log(this.state.places);});
			  this.setState({renderList:this.state.places});        
		   });
		
		}
		
	};

store=(place)=>{
	localStorage.setItem('QID',place.QID);
}

newQuiz(){
	alert("!")
}



	render() {     
	
		return (
           <div>
		
            <div className="header"> 
			</div> 
			<div className="search"> 
			<input className='searchContent' required onChange={this.handleChangeSearch.bind(this)}></input>
			<button className='searchButton'onClick={()=>this.search()}>Search </button>
			</div>   
            
			
			<div className="sort">

			
			<button className='sortButton'onClick={()=>this.sortByRate()}>⭐ Rate </button>
            <button className='sortButton' onClick={()=>this.sortByHot()}>🔥 Hot </button>
			</div>
 
			<div className='platFormlist'> 
			<div>
			{this.state.rander&&this.state.renderList.map((place) => {
		//console.log(this.state.places)	
		return(
		 
			<div className="item">  
			 <div className='title'>
				<Link to={'/quizEditAfter/'+place.QID} onClick={()=>this.store(place)}> {place.Qname}</Link> 
				<div className='rate'>⭐: {place.ave_rate} 🔥：{place.hot}</div> 
			 </div >
			 	<div className='content'> 
				 <div className='discription'>{place.description}</div>
			 	<Media object src={'../'+place.pic} alt={place.Releaser} className='userIcon'/> 
				 </div>
			</div>
			
		);
	})}			
			
			</div>
			 </div>
		</div>
		)
	}
    
}