import React, { Component } from 'react';
import {PubCom} from '../public/pub.jsx';
import './css/index.css';
import $ from 'jquery';

class ZmitiIndexApp extends Component {
	constructor(props) {
		super(props);
		this.state={
			
		};
		this.viewW = document.documentElement.clientWidth;
		this.viewH = document.documentElement.clientHeight;

	}

	render() {

		return (
			<div className='zmiti-index-main-ui' style={this.props.mainStyle}>
				{this.state.showimg && <img src={this.props.shadowimg}/>}
				<header style={this.props.headerStyle}>
					{this.props.title}
					{this.props.date}
					
				</header>
			</div>
		);
	}


	componentDidMount() {
		setTimeout(()=>{
			this.setState({
				showimg:true
			})
		},2000);
	}
}
export default PubCom(ZmitiIndexApp);