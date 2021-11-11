import React from 'react';
import { Component } from 'react';  
import './singlePlatForm.css'
import { Media } from 'reactstrap';
import Axios from "axios";
// const places = 
// 	[
// 		{
// 			id: 0,
// 			name: '1',
// 			image: './classicMusic.jpg',
// 			owner: 'A',
// 			discrpiton:'abababaaba',
//             rate:1000,
// 			hot:10
// 		} ,
// 		{
// 			id: 1,
// 			name: '122',
// 			image: './classicMusic.jpg',
// 			owner: 'A',
// 			discrpiton:'abababaaba',
//             rate:10,
// 			hot:5
// 		} ,{
// 			id: 2,
// 			name: '1',
// 			image: './classicMusic.jpg',
// 			owner: 'A',
// 			discrpiton:'abababaaba',
//             rate:1010,
// 			hot:2
// 		} ,{
// 			id: 3,
// 			name: '1',
// 			image: './classicMusic.jpg',
// 			owner: 'A',
// 			discrpiton:'abababaaba',
//             rate:10100,
// 			hot:1
// 		} ,	];

const PID = localStorage.getItem('PID')
// const url = 'https://juice-quiz.herokuapp.com/api/platform/quizlist';
// const url= `http://localhost:3001/api/platform/quizlist/${PID}`;
// const res = await Axios.get(url)
//       .then(res=>{return res.data})
// console.log(res)
var isrander=false;
export default class singlePlatForm extends Component {
	_isMounted = false;
	constructor(props) {
		super(props);
		this.state = {
			//决定是否显示subscribe按钮和订阅按钮
			subscribed:false,
			authority:false,
			places: '',
            renderList:[{}],
			hotac:true,
			rateac:true,
			Pname :localStorage.getItem('Pname'),
			Pcover:localStorage.getItem('Pcover'),
			PID: localStorage.getItem('PID'),
			rander:false,
			searchContent:""
		};
        
	}
    

	
 componentDidMount=()=>{
	this.get() ;
	this.setState({rander:true})
}






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
 





	//申请和订阅在这里
	subscribe(){

	   
		this.setState({subscribed:true})

	}


	apply(){
		this.setState({apply:true})
	};
    
	// async get(){	
	// 		// const url = 'https://juice-quiz.herokuapp.com/api/platform/quizlist';
	// 		 const url= `http://localhost:3001/api/platform/quizlist/${this.state.PID}`;
	// 		 await Axios.get(url, 
	// 		  ).then(res=>{return res.data})
	// 		  .then((response) => {
    //           this.setState({places:response},() => console.log(this.state.places)) 	   
	// 		 });
			 
					   
	// }
	
	async get(){
		this._isMounted = true;
       // const url = 'https://juice-quiz.herokuapp.com/api/platform/quizlist';
		 const url= `http://localhost:3001/api/platform/quizlist/${this.state.PID}`;
      const res = await Axios.get(url)
      .then(res=>{return res.data})
      .then( result =>{
		  if(this._isMounted){
		  //console.log(result);
          this.setState({places:result},()=>{console.log(this.state.places);});
          this.setState({renderList:this.state.places});}          
       });
    }

	handleChangeSearch(e) {  
		this.setState({searchContent: e.target.value});   
	} 

	search(){
		alert(this.state.searchContent)
		}

   

	render() {     
		
		
	// 	if(this.state.rander){const menu = this.state.renderList.map((place) => {
	// 	console.log(this.state.places)	
	// 	return(
		 
	// 		<div className="item">  
	// 		 <div className='title'>
	// 			 {place.name} 
	// 			 <div className='rate'>⭐: {place.rate} 🔥：{place.hot}</div> 
	// 		 </div >
	// 		 	<div className='content'> 
	// 			 <div className='discription'>{place.discrpiton}</div>
	// 		 	<Media object src={'../'+place.image} alt={place.id} className='userIcon'/> 
	// 			 </div>
	// 		</div>
			
	// 	);
	// });}
		
		return (
            <div> 
            <div className="header">
                
            </div>

			<div className="search"> 
			<input className='searchContent' required onChange={this.handleChangeSearch.bind(this)}></input>
			<button className='searchButton'onClick={()=>this.search()}>Search </button>
			</div>

			<div className="platFormButton">
				{/* 此处读取平台的图片！ */}
                <img src= {'../'+this.state.Pcover}  className='icon'></img> 
            <h className='platFormName'>{this.state.Pname}</h>
			{!this.state.subscribed&&<button className='platformaccount'  onClick={()=>this.subscribe()}>subscribe</button>||<button className='platformaccount' >subscribed √</button>}
			{!this.state.apply&&<button className='platformaccount'  onClick={()=>this.apply()}>Apply to be co-owner</button>||<button className='platformaccount' >apply has been sent</button>}
          
		     
            </div>
			<div className="sort">

			
			<button className='sortButton'onClick={()=>this.sortByRate()}>⭐ Rate </button>
            <button className='sortButton' onClick={()=>this.sortByHot()}>🔥 Hot </button>
			</div>
 
			<div className='platFormlist'> 
			<div>
			{this.state.rander&&this.state.renderList.map((place) => {
		console.log(this.state.places)	
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