import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import IScroll from 'iscroll';
import './css/index.css';

import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/map';
import {
  PubCom
} from '../components/public/pub.jsx';
import '../assets/echarts/china';

import ZmitiCanvasApp from '../components/index/index.jsx'

class ZmitiChartApp extends Component {
  constructor(props) {
    super(props);


    this.state = {
      
      hotnews:[
         {
           name:'习近平等出席观看庆祝建军90周年文艺晚会',
           company:'中国文明网',
           pv:2023
         },{
           name:'第六届全国道德模范候选人公示 五类别 共322名',
           company:'中国文明网',
           pv:2023
         },{
           name:'中央文明办发布7月"中国好人榜" 102人上榜 名单',
           company:'中国文明网',
           pv:2023
         },{
           name:'习近平等出席观看庆祝建军90周年文艺晚会',
           company:'中国文明网',
           pv:2023
         },{
           name:'习近平等出席观看庆祝建军90周年文艺晚会',
           company:'中国文明网',
           pv:2023
         }
      ]
      
    }
    this.viewW = document.documentElement.clientWidth;
    this.viewH = document.documentElement.clientHeight;
    window.s = this;
  }

   fillDate(){
        var s = this;
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

        this.timer = setInterval(function(){
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
      date:<div></div>,
      title:'数据融合平台'
    };

    return (
      <div className='zmiti-chart-main-ui'>
        <ZmitiCanvasApp {...data}></ZmitiCanvasApp>
        <h2></h2>
        <section className='zmiti-chart-container' >
          <aside>
              <div className='zmiti-chart1'>
                <div className='zmiti-trend'>
                  <section></section>
                  <section>
                    <div></div>
                    <div></div>
                    <div></div>
                  </section>
                  <section></section>
                </div>
                <div className='zmiti-pv'></div>
              </div>
              <div className='zmiti-chart2'></div>
          </aside>
          <aside>
             
          </aside>
        </section>
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


  componentWillUnmount() {
  	clearInterval(this.timer)
  }
  

  format(date){
    var month = date.getMonth()+1;
    month < 10 && (month = '0'+month);
    var d = date.getDate();
    d < 10 && (d = '0'+d);
    return date.getFullYear()+"-"+month+"-"+d;
  }

  initEcharts(){
      var s = this;
      return;
      var clickCharts = echarts.init(this.refs['chart1']);

      clickCharts.setOption(this.clickConfig());

      var netCharts = echarts.init(this.refs['chart2']);

      netCharts.setOption(this.netConfig())
  }
 
  componentDidMount() {
     this.fillDate();
     this.initEcharts();
  }


  netConfig(){
    return {
          title: {
              text: '网络拥堵量',
              subtext: '',
               textStyle: {
                    color: '#fff',
                    fontWeight:'normal'
                }
          },
          tooltip: {
              trigger: 'axis'
          },
         
      
          xAxis:  {
              type: 'category',
              boundaryGap: false,
              axisLine:{
                lineStyle:{
                  color:'rgba(0,0,0,0)'
                }
              },
              splitLine:{
                  show:true,
                  lineStyle:{
                    color:'#999',
                    opacity:.3
                  }
              },
              
              data: [
                  {value:'06:00',
                   textStyle: {
                        fontSize: 12,
                        color: '#fff'
                    }
                  },
                  {
                  value:'09:00',
                   textStyle: {
                        fontSize: 12,
                        color: '#fff'
                    }
                },{value:'12:00',
                   textStyle: {
                        fontSize: 12,
                        color: '#fff'
                    }
                },{value:'15:00',
                   textStyle: {
                        fontSize: 12,
                        color: '#fff'
                    }
                },{value:'18:00',
                   textStyle: {
                        fontSize: 12,
                        color: '#fff'
                    }
                }
              ],
              axisPointer:{
                show:true,
                type:'line'
              }
          },
           yAxis: {
              type: 'value',
              show:true,
              axisLabel: {
                  formatter: '{value} ',
                  textStyle:{
                    color:"#fff"
                  },

              },
               axisTick:{
                show:false,
                lineStyle:{
                   color:'#999',
                  opacity:.3
                }
              },
              axisLine:{
                show:true,
                lineStyle:{
                   color:'#999',
                  opacity:.3
                }
              },
              splitLine :{
                lineStyle:{
                  color:'#999',
                  opacity:.3
                }
              }
          },
          series: [
              {

                itemStyle:{
                  normal:{
                     color:'rgba(0,0,0,0)'
                  }
                },

                lineStyle:{
                  normal:{
                    color:"#0a9573"
                  }
                },

                areaStyle:{
                   normal:{
                    color:{
                      type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0, color: 'rgba(86,183,206,.8)' // 0% 处的颜色
                        }, {
                            offset: 1, color: 'rgba(115,135,197,.9)' // 100% 处的颜色
                        }],
                        globalCoord: false // 缺省为 false
                    },
                    opacity:.2
                  }
                },

                smooth:true,



                name:'拥堵量',

                type:'line',
                data:[81, 34, 55, 152, 62],
                markPoint: {
                   
                },
                markLine: {
                    
                }
              }
            
          ]
      };

  }

  clickConfig(){

     var data = [];

    for(var i = 0; i < 7;i++){
      data.push({
        value:this.getDateStr(i-6),
        textStyle: {
          fontSize: 12,
          color: '#fff'
        }
      });
    }

    console.log(data);

    return {
          title: {
              text: '点击量趋势图',
              subtext: '',
               textStyle: {
                    color: '#fff',
                    fontWeight:'normal'
                }
          },
          tooltip: {
              trigger: 'axis'
          },
         
      
          xAxis:  {
              type: 'category',
              boundaryGap: false,
              axisLine:{
                lineStyle:{
                  color:'rgba(0,0,0,0)'
                }
              },
               splitLine:{
                  show:true,
                  lineStyle:{
                     color:'#999',
                      opacity:.3
                  }
              },
              
              data,
              axisPointer:{
                show:true,
                type:'line'
              }
          },
          yAxis: {
              type: 'value',
              show:true,
              axisLabel: {
                  formatter: '{value} ',
                  textStyle:{
                    color:"#fff"
                  },

              },
              axisTick:{
                show:false,
                lineStyle:{
                   color:'#999',
                   opacity:.3
                }
              },
              axisLine:{
                show:true,
                lineStyle:{
                   color:'#999',
                  opacity:.3
                }
              },
              splitLine :{
                lineStyle:{
                  color:'#999',
                  opacity:.3
                }
              }
          },
          series: [
              {

                itemStyle:{
                  normal:{
                    color:'rgba(0,0,0,0)'
                  }
                },

                lineStyle:{
                  normal:{
                    color:"#0a9573"
                  }
                },

                areaStyle:{
                   normal:{
                    color:"#0a9573",
                    opacity:.2
                  }
                },


                showAllSymbol:true,



                name:'点击量',

                type:'line',
                data:[12, 20,150, 16, 20, 20, 190],
                markPoint: {
                    data: [
                        {type: 'max', name: '最大值'},
                        {type: 'min', name: '最小值'}
                    ]
                },
                markArea:{
                  itemStyle:{
                    
                  }
                },
                markPoint:{
                  symbol:'circle'
                },
                markLine: {
                    show:false,
                    data: [
                        {type: 'average', name: '平均值'}
                    ],
                    lineStyle:{
                      normal:{
                        opacity:.5
                      }
                    }
                }
              }
            
          ],

      };

  }

 




   getDateStr(AddDayCount) { 
      var dd = new Date(); 
      dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
      //var y = dd.getFullYear(); 
      var m = dd.getMonth()+1;//获取当前月份的日期
      m < 10 && (m = '0'+m);
      var d = dd.getDate(); 
      d < 10 && (d = '0'+d);
      return d + '日'; 
  } 
}


export default PubCom(ZmitiChartApp);