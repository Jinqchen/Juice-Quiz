import React from 'react';
import { Component } from 'react';  
import './singlePlatForm.css'
import { Media } from 'reactstrap';
import Axios from "axios";
import { Link } from 'react-router-dom';

export default class singlePlatForm extends Component {
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
	this.get_ranklist();
	this.setState({rander:true});
	this.is_sub();
	this.is_coowner();
	this.is_owner();
	this.get_replimit();
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
 


	//申请和订阅在这里
	subscribe(){
   // const url = 'https://juice-quiz.herokuapp.com/api/platform/dosubscribe';
	   const url= 'http://localhost:3001/api/platform/dosubscribe';
	     
		  Axios.post(url, { 
			PID : this.state.PID,
			UID: localStorage.getItem("UID"),
		  }).then((response) => { 
		  console.log(response); 
		  this.setState({subscribed:true})
		  }); 
	 
	this.inital_reputation()	
	}


unsubscribe(){
if(this.state.owner){
	alert("You can't unsubscribe your own platform!")
}
else if(this.state.co_owner){
	console.log("co");
this.op_unsub();
this.op_uncoown();
}
else{
this.op_unsub();

}
}




op_unsub(){
  //  const url = `https://juice-quiz.herokuapp.com/api/platform/delSub/${this.state.PID}`;
	const url= `http://localhost:3001/api/platform/delSub/${this.state.PID}`;
	     
		  Axios.delete(url, { data:{UID: localStorage.getItem("UID")}}).then((response) => { 
		  console.log(response); 
		 
		  }); 
	 this.setState({subscribed:false})
}

op_uncoown(){
  //  const url = `https://juice-quiz.herokuapp.com/api/platform/delCoown/${this.state.PID}`;
	const url= `http://localhost:3001/api/platform/delCoown/${this.state.PID}`;
	     
		  Axios.delete(url, { data:{UID: localStorage.getItem("UID")}
			
		  }).then((response) => { 
		  console.log(response); 
		  
		  }); 
		  this.setState({co_owner:false})
}





	
	inital_reputation(){
	 //   const url = 'https://juice-quiz.herokuapp.com/api/platform/initalR';
	  const url= 'http://localhost:3001/api/platform/initalR';
	     
		  Axios.post(url, { 
			PID : this.state.PID,
			UID: localStorage.getItem("UID"),
		  }).then((response) => { 
		  console.log(response); 
		  this.setState({subscribed:true})
		  }); 


	}

// Apply function 
	do_apply(){
	//	 const url = `https://juice-quiz.herokuapp.com/api/platform/doapply`;
		   const url= `http://localhost:3001/api/platform/doapply`;
	     
		  Axios.post(url, { 
			PID : this.state.PID,
			UID: localStorage.getItem("UID"),
		  }).then((response) => { 
		  console.log(response); 
		  this.setState({co_owner:true})
		  }); 
	};
      
   apply(){
     if(!this.state.subscribed){
		 alert("You need to subscribe the platform first!")
	 }
	 else{
		 this.get_Urep();
		 if(this.state.Urep < this.state.replimit){
			 alert("You didn't reach the co-owner requirment")
		 }
		 else{
			 this.do_apply();
		 }
	 }
   }

   get_replimit(){
     //    const url = `https://juice-quiz.herokuapp.com/api/platform/${this.state.PID}/replimit`;
		 const url= `http://localhost:3001/api/platform/${this.state.PID}/replimit`;
		  Axios.get(url).then(res=>{return res.data})
		  .then((response) => {   
		  this.setState({replimit:response[0]['replimit']});
		  console.log(this.state.replimit)
		  });
   };

   get_Urep(){
	  //    const url = `https://juice-quiz.herokuapp.com/api/platform/userRep/${localStorage.getItem("UID")}`;
	const url= `http://localhost:3001/api/platform/userRep/${localStorage.getItem("UID")}`;
	    Axios.get(url,{
			params:{
			PID : this.state.PID,}
	   }).then(res=>{return res.data})
	   .then((response) => {   
	   this.setState({Urep:response[0]['Rpoint']});
	   });
   };

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

    async get_ranklist(){
	   // const url = `https://juice-quiz.herokuapp.com/api/platform/ranklist/${this.state.PID}`;
		const url= `http://localhost:3001/api/platform/ranklist/${this.state.PID}`;
		const res = await Axios.get(url)
		.then(res=>{return res.data})
		.then( result =>{
			if(this._isMounted){
			console.log(result);
			this.setState({rank:result},()=>{console.log(this.state.rank);});
			this.setState({rankList:this.state.rank});}          
		 });
	};

	 is_sub(){
		
    //	   const url = 'https://juice-quiz.herokuapp.com/api/platform/subscribe';
	 const url= `http://localhost:3001/api/platform/subscribe`;
         Axios.post(url, {
			PID : this.state.PID,
			UID: localStorage.getItem("UID"),
		  }).then((response) => {
			console.log(response.data);
			this.setState({subscribed: response.data["subscribe"]})
		  });
	};
   
	is_coowner(){
		console.log("start")
		// const url = 'https://juice-quiz.herokuapp.com/api/platform/coowner';
		const url= `http://localhost:3001/api/platform/coowner`;
		Axios.post(url, {
		   PID : this.state.PID,
		   UID: localStorage.getItem("UID"),
		 }).then((response) => {
		   console.log(response.data);
		   this.setState({co_owner: response.data["coowner"]})
		 });
    };

	is_owner(){
		console.log("start")
	//	 const url = 'https://juice-quiz.herokuapp.com/api/platform/owner';
		const url= `http://localhost:3001/api/platform/owner`;
		Axios.post(url, {
		   PID : this.state.PID,
		   UID: localStorage.getItem("UID"),
		 }).then((response) => {
		   console.log(response.data);
		   this.setState({owner: response.data["owner"]})
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
           <div>
				 
				<div className="rankBoard"> 
				<div className="rankBoardTitle"> reputation rank  </div>
				<div className="rankMenu">{menu}</div>
				</div> 
            <div className="header"> 
			</div> 
			  <div className="singlePlatformsearch"> 
			<input className='singlePlatformsearchContent' required onChange={this.handleChangeSearch.bind(this)}></input>
			<button className='singlePlatformsearchButton'onClick={()=>this.search()}>Search </button>
			</div>     
            
			<div className="platFormButton"> 
                <img src= {'https://juicequiztest.s3.amazonaws.com'+this.state.Pcover}  className='icon'></img> 
            <label className='singlePlatFormName'>{this.state.Pname}</label>
			
			
		 
			{!this.state.subscribed&&<button className='platformaccount'  onClick={()=>this.subscribe()}>subscribe</button>||<button className='platformaccount' onClick={()=>this.unsubscribe()} >subscribed √</button>}
			{!this.state.co_owner&&<button className='platformaccount'  onClick={()=>this.apply()}>Apply to be co-owner</button>||<button className='platformaccount' >Co-Owner</button>}
		
			<Link  className='newQuizLink' to={'/quizInit'}>
			<span>{"Release New Quiz"}</span> 
            </Link>
			{/* {this.state.co_owner&&
			<Link  className='newQuizLink' to={'/quizInit'}>
			<span>{"Release New Quiz"}</span> 
            </Link>}  */}

					{/* <Link  className='newQuizLink' to={'/quizEdit'}>
			<span>{"QuizEdit"}</span> 
                    </Link> */}
           
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
		 
			<div className="SinglePlatformitem">  
			 <div >
				<Link className='SinglePlatformtitle' style={{textDecoration: "none"}} to={"/platform/"+this.state.PID+"/answer/"+place.QID } onClick={()=>this.store(place)}>  {place.Qname}  
				<div className='rate'>⭐: {place.ave_rate} 🔥：{place.hot}</div> 
			
				</Link> </div >
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