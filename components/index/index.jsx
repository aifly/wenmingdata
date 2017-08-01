import React, { Component } from 'react';
import {PubCom} from '../public/pub.jsx';
import './css/index.css';
import  ZmitiStar from '../../assets/libs/stars';

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
				<canvas width={this.viewW} height={this.viewH/3*2} ref='canvas'></canvas>
			</div>
		);
	}


	componentDidMount() {
		setTimeout(()=>{
			this.setState({
				showimg:true
			});
		},2000);

		var canvas = this.refs['canvas'];

		var context = canvas.getContext('2d');
		var img = new Image();
		var width = canvas.width,
			height = canvas.height;
		var arr = [];
		img.onload = function(){

			for(var i=0;i<100;i++){
				var star = new ZmitiStar({
					context,
					img,
					x:Math.random()*this.viewW|0,
					y:Math.random()*this.viewH|0
				});
				star.timer =0;
				star.iNow = Math.random()*70+40;
				star.speed = 0;
				arr.push(star);

				star.init();
				
			}
		}.bind(this);

		img.src= './assets/images/star.png'

		var render = function(){

			context.clearRect(0,0,width,height)
			arr.map((star,i)=>{

				star.timer += star.iNow;
				if(star.timer>200){
					star.timer=0;
					star.speed+=1;
					star.update(star.speed%7);
				}
			})
			window.requestAnimationFrame(render);
		}.bind(this);

		render();
		
	}
}
export default PubCom(ZmitiIndexApp);