import React, { Component } from 'react';
import {PubCom} from '../components/public/pub.jsx';
import './assets/css/index.css';
import $ from 'jquery';

class ZmitiIndexApp extends Component {
	constructor(props) {
		super(props);
		this.state={
			count:'200,000,000'
		};
		this.viewW = document.documentElement.clientWidth;
		this.viewH = document.documentElement.clientHeight;
	}

	render() {


		return (
			<div style={{height:this.viewH,zIndex:this.props.showIndex?100:-1}} className='zmiti-index-main-ui' ref='zmiti-index-main-ui'>

				<section className='zmiti-index-scroll'>
					<div className='zmiti-index-title'>
						<img src='./assets/images/title.png'/>
						<section className='zmiti-index-title-content'>
							<div className="zmiti-index-title-img1">
								<img src='./assets/images/title_book2.png'/>
							</div>
							<div className="zmiti-index-title-text1">
								<div className="zmiti-index-title-inner1">
									<div>“领读者计划”是于世界读书日当天，由新华社联合中信书店、微信读书、中信出版集团、三联书店推出的系列读书活动，目前已有超两万人报名参加。</div>
									<div>活动主要包括“名人读夜读”,“微博接力”和“阅读大厦”，已接受邀请并参与的名人明星有俞敏洪、Angelababy、苏芒、苏芩、吴磊等。</div>
									<div>活动带动了一批热爱阅读的人入驻“阅读大厦”。</div>
								</div>
							</div>
							<div className="zmiti-index-title-navbar">
								<div className='zmiti-index-nav-header'>
									读书报名
								</div>
								<section className='zmiti-index-bm'>
									<div className='zmiti-read-btn'><a href="../read2">地方大厦</a></div>
									<div className='zmiti-read-btn'><a href="../read3">主题大厦</a></div>
								</section>
								{
								/*<div className='zmiti-index-nav-header'>
									进度查询
								</div>*/
								}
								{/*<section  className='zmiti-index-bm'>
																	<div  className='zmiti-read-btn' onTouchTap={this.entryResult.bind(this)}>进度查询</div>
																	<div  className='zmiti-read-btn' style={{opacity:0}}>进度查询</div>
																</section>*/}

							</div>
						</section>
						<div className='zmiti-read-count'>
							{this.state.count}
						</div>
					</div>
					<img src='./assets/images/main1.png'/>
				</section>

			</div>
		);
	}

	entryResult(){
		let {obserable } = this.props;
		obserable.trigger({
			type:'entryResult'
		});
	}

	loading(arr, fn, fnEnd){
		var arr = arr  || [];


        var len = arr.length;

        if(len <= 0){
        	fnEnd();
        	return;
        }
        var count = 0;
        var i = 0;
        
        function loadimg() {
            if (i === len) {
                return;
            }
            var img = new Image();
            img.onload = img.onerror = function(){
                count++;
                if (i < len - 1) {
                    i++;
                    loadimg();
                    fn && fn(i / (len - 1), img.src);
                } else {
                    fnEnd && fnEnd(img.src);
                }
            };
            img.src = arr[i];
        }
       loadimg();
    }


	componentDidMount() {
		let {IScroll } = this.props;
		this.scroll = new IScroll(this.refs['zmiti-index-main-ui'],{
			scrollbars:true,
			preventDefault:false
		});

		setTimeout(()=>{
			this.scroll.refresh();
		},400)
		var s = this;
		/*$.ajax({
			url:'http://api.zmiti.com/v2/book/get_usercount/',
			data:{},

		}).done((data)=>{
			if(data.getret === 0){
				s.setState({
					count:'200,000,000'
				})
			}
		})*/
	}
}
export default PubCom(ZmitiIndexApp);