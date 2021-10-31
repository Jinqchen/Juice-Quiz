import React from 'react';
import { Media } from 'reactstrap';
import './platFormMedia.css'; 

class PlatFormList extends React.Component {
	constructor(props){
		super(props);
		
		this.state = {};
	}
	
	render(){
		
		const menu = this.props.places.map((place) => {
			return(
			 
                <div className="list">  
                
                <Media left>
			 	<Media object src={place.Pcover} alt={place.Pname} />
                 
                 <div className="platFormName">{place.Pname}</div>
				 		</Media>   
                </div>
                
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