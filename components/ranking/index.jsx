import React, {
	Component
} from 'react';
import {
	PubCom
} from '../public/pub.jsx';
import './css/index.css';
class ZmitiRankingApp extends Component {
	constructor(props) {
		super(props);
		this.state = {

		};
	}

	render() {


		return (
			<div className='zmiti-ranking-main-ui'>
				<div>{this.props.editor}</div>
				<div>
					<div className='zmiti-ranking-slider'>
						<div className='zmiti-ranking-slider-bar' style={{width:this.props.scale*100+'%'}}></div>
					</div>
					<span>{this.props.formatNumber(this.props.count||0)}</span>
				</div>
			</div>
		);
	}



	componentDidMount() {

	}
}
export default PubCom(ZmitiRankingApp);