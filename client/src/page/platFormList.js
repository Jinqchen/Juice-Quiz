import React from 'react';
import { Media } from 'reactstrap';
import './platFormMedia.css'; 
import { BrowserRouter as Router, Route,Routes, Link } from 'react-router-dom';
class PlatFormList extends React.Component {
	constructor(props){
		super(props);
		
		this.state = {};
	}
	

    store=(place)=>{
		console.log(place);
		localStorage.setItem('Pcover', place['Pcover']);
		localStorage.setItem('Pname', place['Pname']);
		localStorage.setItem('PID', place['PID']);
		localStorage.setItem('tag', place['tag']);
	}

	render(){
		
		const menu = this.props.places.map((place) => {
	       
			return(
			    <Link to={'/platform/'+place.Pname} onClick={()=>this.store(place)}>
                <div className="list">  
                
                <Media left>
			 	<Media object src={place.Pcover} alt={place.Pname} />
                 
                 <div className="platFormName">{place.Pname}</div>
				 		</Media>   
                </div>
                </Link>
			);
		});
		
		return(
			<div className="container">
				<div className="row">
					<Media>
						{menu}
					</Media>
				</div>
			</div>
		);
	}
}
 


export default PlatFormList;