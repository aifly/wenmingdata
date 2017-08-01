import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import $ from 'jquery';
injectTapEventPlugin();
import IScroll from 'iscroll';
import './assets/css/index.css';

 
 
import Obserable from './components/public/obserable';


import ZmitiToastApp from './components/toast/index.jsx'
import ZmitiIndexApp from './components/index/index.jsx'



var obserable = new Obserable();

 class App extends Component {
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
      <div className='zmiti-main-ui' >
        <ZmitiIndexApp {...data}></ZmitiIndexApp>
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

  

  request(){
    
  }

  beginSearch(){

  }


  
   
}


ReactDOM.render(<App></App>,document.getElementById('fly-main-ui'));

