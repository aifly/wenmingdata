import React, {
	Component
} from 'react';
import {
	PubCom
} from '../public/pub.jsx';
import './css/index.css';
import ZmitiStar from '../../assets/libs/stars';
class ZmitiPvchartApp extends Component {
	constructor(props) {
		super(props);
		this.state = {

		};
	}

	render() {

		this.draw();
		return (
			<div className='zmiti-pvchart-main-ui'>
				<canvas ref='canvas' width='70' height='70' style={{height:70}}></canvas>
				<div className='zmiti-pvchart-info'>
					<div>{this.props.name}</div>
					<div style={{color:this.props.color}}>{this.props.formatNumber(this.props.pv)}</div>
				</div>
			</div>
		);
	}



	componentDidMount() {
		this.draw();
	}
	draw() {
		var canvas = this.refs['canvas'];
		if (!canvas) {
			return;
		}
		var context = canvas.getContext('2d');
		var x = canvas.width / 2,
			y = canvas.height / 2,
			r = 25;
		context.lineWidth = 6;
		context.strokeStyle = this.props.bgcolor;

		context.beginPath();
		context.arc(x, y, r, 0, Math.PI * 2, false)
		context.closePath();
		context.stroke();

		context.strokeStyle = this.props.color;
		context.lineWidth = 6;
		context.lineJoin = 'round';
		context.beginPath();
		context.arc(x, y, r, -Math.PI / 2, 2 * Math.PI * this.props.scale - Math.PI / 2, false)
		context.stroke();

		var img = new Image();
		img.onload = function() {
			context.drawImage(this, (canvas.width - 32) / 2, (canvas.height - 26) / 2);
		}
		img.src = this.props.img;
	}
}
export default PubCom(ZmitiPvchartApp);