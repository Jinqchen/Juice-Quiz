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
			subscribed:false,
			co_owner:false,
			owner:false,
			authority:false,
			logged:localStorage.getItem("Logged"),
			places: '',
            renderList:[{}],
			hotac:true,
			rateac:true,
			Pname :localStorage.getItem('Pname'),
			Pcover:localStorage.getItem('Pcover'),
			PID: localStorage.getItem('PID'),
			rander:false,
			searchContent:"",
			rankList:[{}],
			rank:'',
			replimit:0,
			Urep:0
		};
        
	}
    

	
 componentDidMount=()=>{
	this.get() ;
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
 

  
	async get(){
		this._isMounted = true;
    //  const url = `https://juice-quiz.herokuapp.com/api/platform/quizlist/${this.state.PID}`;
		 const url= `http://localhost:3001/api/platform/quizlist/${this.state.PID}`;
      const res = await Axios.get(url)
      .then(res=>{return res.data})
      .then( result =>{
		  if(this._isMounted){
		  //console.log(result);
          this.setState({places:result},()=>{console.log(this.state.places);});
          this.setState({renderList:this.state.places});}          
       });
    };

  



//Search 
	handleChangeSearch(e) {  
		this.setState({searchContent: e.target.value});   
	} ;

	async search(){
		if (this.state.searchContent===""){
			this.get();
		}else{
		//	const url= `https://juice-quiz.herokuapp.com/api/quiz/${this.state.searchContent}`;
		const url= `http://localhost:3001/api/quiz/${this.state.searchContent}`;
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
		console.log(this.state.subscribed);
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
				 {place.Qname} 
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