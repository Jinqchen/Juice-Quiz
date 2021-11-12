import React from 'react';
import { Component } from 'react';  
import './singlePlatForm.css'
import { Media } from 'reactstrap';
import Axios from "axios";
<<<<<<< HEAD

// const places = 
// 	[
// 		{
// 			id: 0,
// 			name: 'user1',
// 			image: './account.jpg', 
// 			reputation:2
			 
// 		} ,
// 		{
// 			id: 0,
// 			name: 'user3',
// 			image: './popMusic.jpg',
// 			reputation:2
// 		} ,{
// 			id: 0,
// 			name: 'user2',
// 			image: './classicMusic.jpg',
// 			reputation:2
// 		}  	];

=======
const places = 
	[
		{
			id: 0,
			name: 'user1',
			image: './account.jpg', 
			reputation:2
			 
		} ,
		{
			id: 0,
			name: 'user3',
			image: './popMusic.jpg',
			reputation:2
		} ,{
			id: 0,
			name: 'user2',
			image: './classicMusic.jpg',
			reputation:2
		}  	];

const PID = localStorage.getItem('PID')
// const url = 'https://juice-quiz.herokuapp.com/api/platform/quizlist';
// const url= `http://localhost:3001/api/platform/quizlist/${PID}`;
// const res = await Axios.get(url)
//       .then(res=>{return res.data})
// console.log(res)
var isrander=false;
>>>>>>> f5af9878e263f22bf6e36d3300fc5f62cce26920
export default class singlePlatForm extends Component {
	_isMounted = false;
	constructor(props) {
		super(props);
		this.state = {
			//决定是否显示subscribe按钮和订阅按钮
			subscribed:false,
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
<<<<<<< HEAD
			rankList:[{}],
			rank:''
=======
			rankList:{places}
>>>>>>> f5af9878e263f22bf6e36d3300fc5f62cce26920
		};
        
	}
    

	
 componentDidMount=()=>{
	this.get() ;
	this.get_ranklist();
	this.setState({rander:true});
	this.is_sub();
	

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

	   const url = 'https://juice-quiz.herokuapp.com/api/platform/dosubscribe';
	   //const url= 'http://localhost:3001/api/platform/dosubscribe';
	     
		  Axios.post(url, { 
			PID : this.state.PID,
			UID: localStorage.getItem("UID"),
		  }).then((response) => { 
		  console.log(response); 
		  this.setState({subscribed:true})
		  }); 
	 
	this.inital_reputation()	

	}

	inital_reputation(){
	   const url = 'https://juice-quiz.herokuapp.com/api/platform/initalR';
	   //const url= 'http://localhost:3001/api/platform/initalR';
	     
		  Axios.post(url, { 
			PID : this.state.PID,
			UID: localStorage.getItem("UID"),
		  }).then((response) => { 
		  console.log(response); 
		  this.setState({subscribed:true})
		  }); 


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
       const url = `https://juice-quiz.herokuapp.com/api/platform/quizlist/${this.state.PID}`;
		 //const url= `http://localhost:3001/api/platform/quizlist/${this.state.PID}`;
      const res = await Axios.get(url)
      .then(res=>{return res.data})
      .then( result =>{
		  if(this._isMounted){
		  //console.log(result);
          this.setState({places:result},()=>{console.log(this.state.places);});
          this.setState({renderList:this.state.places});}          
       });
    }
    

    async get_ranklist(){
		const url = `https://juice-quiz.herokuapp.com/api/platform/ranklist/${this.state.PID}`;
		//const url= `http://localhost:3001/api/platform/ranklist/${this.state.PID}`;
		const res = await Axios.get(url)
		.then(res=>{return res.data})
		.then( result =>{
			if(this._isMounted){
			console.log(result);
			this.setState({rank:result},()=>{console.log(this.state.rank);});
			this.setState({rankList:this.state.rank});}          
		 });
	}

<<<<<<< HEAD


	 is_sub(){
		 console.log("start")
          const url = 'https://juice-quiz.herokuapp.com/api/platform/subscribe';
		 //const url= `http://localhost:3001/api/platform/subscribe`;
         Axios.post(url, {
			PID : this.state.PID,
			UID: localStorage.getItem("UID"),
		  }).then((response) => {
			console.log(response.data);
			console.log("end")
			this.setState({subscribed: response.data["subscribe"]})
		  });
	}
=======
	handleChangeSearch(e) {  
		this.setState({searchContent: e.target.value});   
	} 

	search(){
		alert(this.state.searchContent)
		}

>>>>>>> f5af9878e263f22bf6e36d3300fc5f62cce26920
   

	handleChangeSearch(e) {  
		this.setState({searchContent: e.target.value});   
	} 

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
			
<<<<<<< HEAD
			  console.log(result);
			  this.setState({places:result},()=>{console.log(this.state.places);});
			  this.setState({renderList:this.state.places});        
		   });
		
		}
=======
	// 	);
	// });}

	const menu = this.state.rankList.places.map((place) => {
		return(
			
						<div className="rankList">   
					
				<div> 
				<img src={place.image} className="rankIcon" />
			 
					<h4 class="rankName">{place.name}</h4> 
					<h4 class="rankRepo">reputation:{place.reputation}{}</h4> 
					
					<div class="reputationValue"> 
					 
			</div>
			</div>
 
			</div>
		   
		);
	});
>>>>>>> f5af9878e263f22bf6e36d3300fc5f62cce26920
		
		}





	render() {     
		const menu = this.state.rankList.map((place) => {
			return(
				
							<div className="rankList">   
						
					<div> 
					<img src={'../'+place.pic} className="rankIcon" />
				 
						<h4 class="rankName">{place.Uname}</h4> 
						<h4 class="rankRepo">reputation:{place.Rpoint}{}</h4> 
						
						<div class="reputationValue"> 
						 
				</div>
				</div>
	 
				</div>
			   
			);
		});
		console.log(this.state.subscribed);
		return (
<<<<<<< HEAD
           <div>
				 
=======
            <div> 
>>>>>>> f5af9878e263f22bf6e36d3300fc5f62cce26920
				<div className="rankBoard"> 
				<div className="rankBoardTitle"> reputation rank  </div>
				<div>{menu}</div>
				</div> 
<<<<<<< HEAD
            <div className="header"> 
			</div> 
			<div className="search"> 
			<input className='searchContent' required onChange={this.handleChangeSearch.bind(this)}></input>
			<button className='searchButton'onClick={()=>this.search()}>Search </button>
			</div>   
            
=======
            <div className="header">
                
            </div>

			<div className="search"> 
			<input className='searchContent' required onChange={this.handleChangeSearch.bind(this)}></input>
			<button className='searchButton'onClick={()=>this.search()}>Search </button>
			</div>

>>>>>>> f5af9878e263f22bf6e36d3300fc5f62cce26920
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