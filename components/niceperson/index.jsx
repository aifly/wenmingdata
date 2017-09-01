import React, {
	Component
} from 'react';
import {
	PubCom
} from '../public/pub.jsx';
import './css/index.css';
import ZmitiStar from '../../assets/libs/stars';
class ZmitiNicePersonApp extends Component {
	constructor(props) {
		super(props);
		this.state = {

		};
	}

	render() {

		var waitingStyle = {
			background: 'url(./assets/images/active-shadow2.png) no-repeat center top / cover'
		}


		return (
			<div className='zmiti-niceperson-main-ui' style={waitingStyle}>
				<h1 style={{height:'2vh'}}></h1>
	             <div className='zmiti-active-title'>
	                <aside>
	                  <div>{this.props.title}</div>
	                  <div>{this.props.daterange}</div>
	                </aside>
	                <aside>
						<section className='zmiti-line-shadow'></section>
						<img className={this.props.iNow === 0 ? 'zmiti-niceperson-item':''} src='./assets/images/active-shadow3.png'/>
	                    <div><img src='./assets/images/eye.png'/> <span>{this.props.formatNumber(this.props.person||0)}</span></div>
	                </aside>
	              </div>
			</div>
		);
	}



	componentDidMount() {

	}
}
export default PubCom(ZmitiNicePersonApp);