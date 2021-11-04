import React from 'react';
import { Component } from 'react';  
import './singlePlatForm.css'
import { Media } from 'reactstrap';
const places = 
	[
		{
			id: 0,
			name: '1',
			image: './classicMusic.jpg',
			owner: 'A',
			discrpiton:'abababaaba',
            rate:1000,
			hot:10
		} ,
		{
			id: 1,
			name: '122',
			image: './classicMusic.jpg',
			owner: 'A',
			discrpiton:'abababaaba',
            rate:10,
			hot:5
		} ,{
			id: 2,
			name: '1',
			image: './classicMusic.jpg',
			owner: 'A',
			discrpiton:'abababaaba',
            rate:1010,
			hot:2
		} ,{
			id: 3,
			name: '1',
			image: './classicMusic.jpg',
			owner: 'A',
			discrpiton:'abababaaba',
            rate:10100,
			hot:1
		} ,
  

	
	];
export default class singlePlatForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			//决定是否显示subscribe按钮和订阅按钮
			subscribed:false,
			authority:false,
			places: "",
            renderList:{places}
		};
    
        
	}

	sortByHot(){ 
		places.sort(function(a, b){return -a.hot + b.hot}); 
		console.log(places)
		this.setState({renderList: {places} })
	}

	sortByRate(){
		places.sort(function(a, b){return -a.rate + b.rate}); 
		console.log(places)
		this.setState({renderList: {places} })

	}
	//申请和订阅在这里
	subscribe(){
		this.setState({subscribed:true})

	}
	apply(){
		this.setState({apply:true})
	}
    
 
 



	render() {     
		 const menu = this.state.renderList.places.map((place) => {
		return(
		 
			<div className="item">  
			 <div className='title'>
				 {place.name} 
				 <div className='rate'>⭐: {place.rate} 🔥：{place.hot}</div> 
			 </div >
			 	<div className='content'> 
				 <div className='discription'>{place.discrpiton}</div>
			 	<Media object src={place.image} alt={place.id} className='userIcon'/> 
				 </div>
			</div>
			
		);
	});
		return (
            <div> 
            <div className="header">
                
            </div>
			<div className="platFormButton">
				{/* 此处读取平台的图片！ */}
                <img src='./icon.jpg' className='icon'></img> 
            <h className='platFormName'>Platform Name</h>
			{!this.state.subscribed&&<button className='platformaccount'  onClick={()=>this.subscribe()}>subscribe</button>||<button className='platformaccount' >subscribed √</button>}
			{!this.state.apply&&<button className='platformaccount'  onClick={()=>this.apply()}>Apply to be co-owner</button>||<button className='platformaccount' >apply has been sent</button>}
          
		     
            </div>
			<div className="sort">

			
			<button className='sortButton'onClick={()=>this.sortByRate()}>⭐ Rate </button>
            <button className='sortButton' onClick={()=>this.sortByHot()}>🔥 Hot </button>
			</div>
 
			<div className='platFormlist'> 
			<div>{menu}</div>
			 </div>
		</div>
		)
	}
    
}

