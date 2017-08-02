import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import IScroll from 'iscroll';
import './css/index.css';

import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/map';

import '../assets/echarts/china';

import ZmitiCanvasApp from '../components/index/index.jsx'

export default class ZmitiMapApp extends Component {
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
      date:<div className='zmiti-index-date'>
          <div className='zmiti-index-time' dangerouslySetInnerHTML={this.createMarkup()}></div>
          <div>{this.state.date}</div>
          <div style={{marginTop:-10}}>星期{this.state.day}</div>
      </div>,
      title:'数据融合平台'
    };

    return (
      <div>
        <ZmitiCanvasApp {...data}></ZmitiCanvasApp>
        <section className='zmiti-map-container' >
        	<aside>
            <div ref='map'></div> 
          </aside>
        	<aside>
              <div></div>
              <div className='zmiti-hot-news-rank'>
                  <header>
                      热点新闻排行
                  </header>
                  <ul>
                     <li className=''>
                        <section>名称</section>
                        <section>所属单位</section>
                        <section>点击量</section>
                     </li>
                     {this.state.hotnews.map((news,i)=>{
                      return <li key={i}>
                            <section>{news.name}</section>
                            <section>{news.company}</section>
                            <section>{news.pv}</section>
                      </li>
                     })}
                  </ul>

                  <section className='zmiti-charts-C'>
                    <aside ref='chart1'>
                        
                    </aside>
                    <aside ref='chart2'>

                    </aside>
                  </section>
              </div> 
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
     
      var myChart = echarts.init(this.refs['map']);
          

          var userData = [
                //  {name: "常德市", value: 1023,key:'asa'},
              ];
          var geoCoordMap = {
              //"常德市":[111.7087330000,28.9399430000]
          };
          this.userData = userData;
          this.geoCoordMap = geoCoordMap;


            //geoCoordMap = localStorage.getItem('geoCoordMap'+worksid) || '{}';
          //geoCoordMap = JSON.parse(geoCoordMap);

       

         this.myChart = myChart;

          myChart.setOption(this.dataConfig(userData), true);
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
                type:'shadow'
              }
          },
          yAxis: {
              type: 'value',
              
              axisLabel: {
                  formatter: '{value} ',
                  textStyle:{
                    color:"#fff"
                  },

              }
          },
          series: [
              {

                itemStyle:{
                  normal:{
                    color:'#0a9573'
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

                smooth:true,



                name:'拥堵量',

                type:'line',
                data:[81, 34, 55, 152, 62],
                markPoint: {
                    data: [
                        {type: 'max', name: '最大值'},
                        {type: 'min', name: '最小值'}
                    ]
                },
                markLine: {
                    data: [
                        {type: 'average', name: '平均值'}
                    ]
                }
              }
            
          ]
      };

  }

  clickConfig(){
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
              
              data: [
                  {value:'周日',
                   textStyle: {
                        fontSize: 12,
                        color: '#fff'
                    }
                  },
                  {
                  value:'周一',
                   textStyle: {
                        fontSize: 12,
                        color: '#fff'
                    }
                },{value:'周二',
                   textStyle: {
                        fontSize: 12,
                        color: '#fff'
                    }
                },{value:'周三',
                   textStyle: {
                        fontSize: 12,
                        color: '#fff'
                    }
                },{value:'周四',
                   textStyle: {
                        fontSize: 12,
                        color: '#fff'
                    }
                },{value:'周五',
                   textStyle: {
                        fontSize: 12,
                        color: '#fff'
                    }
                },{value:'周六',
                   textStyle: {
                        fontSize: 12,
                        color: '#fff'
                    }
                }
              ],
              axisPointer:{
                show:true,
                type:'shadow'
              }
          },
          yAxis: {
              type: 'value',
              
              axisLabel: {
                  formatter: '{value} ',
                  textStyle:{
                    color:"#fff"
                  },

              }
          },
          series: [
              {

                itemStyle:{
                  normal:{
                    color:'#0a9573'
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



                name:'点击量',

                type:'line',
                data:[11, 34, 15, 13, 62, 13, 10],
                markPoint: {
                    data: [
                        {type: 'max', name: '最大值'},
                        {type: 'min', name: '最小值'}
                    ]
                },
                markLine: {
                    data: [
                        {type: 'average', name: '平均值'}
                    ]
                }
              }
            
          ]
      };

  }

  dataConfig(userData){
        var s = this;
        return  {
            backgroundColor: 'transparent',
            title: {
                text: '',
                subtext: '',
                sublink: '',
                x:'center',
                textStyle: {
                    color: '#fff'
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: function (params) {
                    return params.name + ' : ' + params.value[2];
                }
            },
            legend: {
                orient: 'vertical',
                y: 'top',
                x:'left',
                data:[''],
                textStyle: {
                    color: '#fff'
                }
            },
            visualMap: {
                min: 0,
                max: 500,
                calculable: true,
                inRange: {
                    color: ['#ff684e',  '#d32000']
                },
                textStyle: {
                    color: '#fff'
                }
            },
            geo: {
                map: 'china',
                roam: true,
                label: {
                    emphasis: {
                        show: true
                    }
                },
                center:[
                   106.6308452923,39.4701180437
                ],
                itemStyle: {
                    normal: {
                        areaColor: '#377891',//地图的背景颜色 
                        borderColor: '#2ed3c1'//地图边框颜色。
                    },
                    emphasis: {
                        areaColor: '#ffef98'
                    }
                }
            },
            series: [
                {
                    name: '',
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    symbol: '',
                    data:s.convertData(userData),
                    symbolSize: function(val){
                         return val[2] /50 ;//100
                    },
                    label: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show:false
                        }
                    },
                    itemStyle: {
                        emphasis: {
                            borderColor: 'transparent',
                            borderWidth: 3,
                            color:'#f90'
                        },
                        normal: {
                            color: '#f90'
                        }
                    }
                }
            ]
        };
  }

  convertData(data){
      var res = [];
      for (var i = 0; i < data.length; i++) {
          var geoCoord = this.geoCoordMap[data[i].name];
          if (geoCoord) {
              res.push({
                  name: data[i].name,
                  value: geoCoord.concat(data[i].value)
              });
          }
      }

      return res;
  }
}


