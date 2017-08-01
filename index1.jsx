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

   fillDate(){
        var s = this;
        var zmitiTime = $('.zmiti-header-date div:eq(0)'),
            zmitiDate = $('.zmiti-header-date div:eq(1)');
        var arr = ['日','一','二','三','四','五','六']
        var date = new Date();
            var year = date.getFullYear();
            var month = date.getMonth()+1;
            var day = date.getDate();
            var week = date.getDay();
            var hours = date.getHours();
            var mins = date.getMinutes();
            var seconds = date.getSeconds();
            hours < 10 && (hours = '0'+hours);
            mins < 10 && (mins = '0'+mins);
            seconds < 10 && (seconds = '0'+seconds);
            this.setState({
              time:hours+"<span>:</span>"+mins,
              date:[year,month,day].join('/'),
              day:arr[week]
            })

        var t = setInterval(function(){
                date = new Date();
                hours = date.getHours();
                mins = date.getMinutes();
                seconds = date.getSeconds();
                hours<10 && (hours = '0'+hours);
                var week = date.getDay();
                mins<10 && (mins = '0'+mins);
                seconds<10 && (seconds = '0'+seconds);
                s.setState({
                  time:hours+"<span> : </span>"+mins,
                  date:[year,month,day].join('/'),
                  day:arr[week]
                })

                s.hours = hours;
                s.mins = mins;
                if(seconds === '00' && hours === '00' && mins === '00'){
                    year = date.getFullYear();
                    month = date.getMonth()+1;
                    day = date.getDate();
                    
                }
 
        },1000)

    }
  render() {


    var data ={
      mainStyle : {
        background:'url(./assets/images/bg1.jpg) no-repeat center left / cover',
      },
      headerStyle:{
        textAlign:'left'
      },
      shadowimg:'./assets/images/shadow1.png',
      date:<div className='zmiti-index-date'>
          <div className='zmiti-index-time' dangerouslySetInnerHTML={this.createMarkup()}></div>
          <div>{this.state.date}</div>
          <div style={{marginTop:-10}}>星期{this.state.day}</div>
      </div>,
      title:'数据融合平台'
    };

    return (
      <div className='zmiti-main-ui' >
        <ZmitiIndexApp {...data}></ZmitiIndexApp>
      </div>
    );
  }

  createMarkup(){
     return {__html:  this.state.time};
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
     this.fillDate();
  }

  

  request(){
    
  }

  beginSearch(){

  }


  
   
}


ReactDOM.render(<App></App>,document.getElementById('fly-main-ui'));

