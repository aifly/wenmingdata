import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import $ from 'jquery';
injectTapEventPlugin();
import IScroll from 'iscroll';
import './assets/css/index.css';

 
 
 

import ZmitiCanvasApp from '../components/index/index.jsx'

export default class ZmitiIndexApp extends Component {
  constructor(props) {
    super(props);


    this.state = {
      
    }
    this.viewW = document.documentElement.clientWidth;
    this.viewH = document.documentElement.clientHeight;
    window.s = this;
  }
  render() {

  	var data ={
  		mainStyle : {
	      background:'url(./assets/images/bg.jpg) no-repeat center right / cover'
	    },
	    headerStyle:{
	        textAlign:'right'
	    },
	    shadowimg:'./assets/images/shadow.png',
	    title:'中国文明网'
  	}
    
    return (
      <div>
        <ZmitiCanvasApp {...data}></ZmitiCanvasApp>
      </div>
    );
  }

  createMarkup(){
     return {__html:  this.state.notice};
  }

  

  showToast(msg){
    this.setState({
          toast:msg
        });

        setTimeout(()=>{
      this.setState({
            toast:''
          });           
        },2000)
  }

  

  format(date){
    var month = date.getMonth()+1;
    month < 10 && (month = '0'+month);
    var d = date.getDate();
    d < 10 && (d = '0'+d);
    return date.getFullYear()+"-"+month+"-"+d;
  }
 
  componentDidMount() {
    
  }
}
