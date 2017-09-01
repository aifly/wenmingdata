import React, {
  Component
} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import IScroll from 'iscroll';
import './assets/css/index.css';

import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/map';

import '../assets/echarts/china';
import {
  PubCom
} from '../components/public/pub.jsx';

import ZmitiNicePersonApp from '../components/niceperson/index.jsx'



import ZmitiCanvasApp from '../components/index/index.jsx'

class ZmitiIndexApp extends Component {
  constructor(props) {
    super(props);


    this.state = {
      currentActiveCount: 155,
      currentWeekActiveCount: 565,
      currentMonthActiveCount: 8543,
      allWaitingCount: 145733000, //中国好人榜右侧数据
      candidateCount: 143433400, //总候选人数
      takePartCount: 1245300, //参与人数
      nicepersonList: [{
        title: '中国好人榜',
        person: 13534534
      }, {
        title: '中国好人榜',
        person: 13534534
      }, {
        title: '中国好人榜',
        person: 13534534
      }],
      allPV: 620125000, //总浏览量
      pvList: [{
        name: '总发稿量',
        count: 23423000,
      }, {
        name: '总活动场数',
        count: 23423000,
      }, {
        name: '网民参与数',
        count: 23423000,
      }],
      tags: [{
        href: 'javascript:void(0)',
        name: '文明'
      }, {
        href: 'javascript:void(0)',
        name: '好人好事'
      }, {
        href: 'javascript:void(0)',
        name: '身边好人'
      }, {
        href: 'javascript:void(0)',
        name: '身边文明事'
      }, {
        href: 'javascript:void(0)',
        name: '好人365'
      }, {
        href: 'javascript:void(0)',
        name: '好人365'
      }, {
        href: 'javascript:void(0)',
        name: '身边文明事'
      }, {
        href: 'javascript:void(0)',
        name: '文明'
      }, {
        href: 'javascript:void(0)',
        name: '身边好人'
      }, {
        href: 'javascript:void(0)',
        name: '好人好事'
      }, {
        href: 'javascript:void(0)',
        name: '文明'
      }]

    }
    this.viewW = document.documentElement.clientWidth;
    this.viewH = document.documentElement.clientHeight;
    window.s = this;
  }
  render() {

    var data = {
      mainStyle: {
        background: 'url(./assets/images/bg.jpg) no-repeat center right / cover'
      },
      headerStyle: {
        textAlign: 'right'
      },
      shadowimg: './assets/images/shadow.png',
      title: '中国文明网'
    }

    var headerStyle = {
      background: 'url(./assets/images/active-shadow1.png) no-repeat center top / cover'
    }

    var waitingStyle = {
      background: 'url(./assets/images/active-shadow2.png) no-repeat center top / cover'
    }

    var allPVStyl = {
      background: 'url(./assets/images/pv-bg.png) no-repeat left top / contain'
    }
    return (
      <div className='zmiti-page1-main-ui'>
        <ZmitiCanvasApp {...data}></ZmitiCanvasApp>
        <aside>
          <div className='zmiti-active-C'>
            <div className='zmiti-active-header-C' style={headerStyle}>
                <header>活动</header>
                <div className='zmiti-active-count'>
                    <aside>
                      {this.state.currentActiveCount}
                      <div>当前活动人数</div>
                    </aside>
                    <aside>
                      {this.state.currentWeekActiveCount}
                      <div>近一周</div>
                    </aside>
                    <aside>
                      {this.state.currentMonthActiveCount}
                      <div>近一月</div>
                    </aside>
                </div>
            </div>
            <div className='zmiti-active-waiting-user' style={waitingStyle}>
              <h1 style={{height:30}}></h1>
              <div className='zmiti-active-title'>
                <aside>
                  <div>中国好人榜</div>
                  <div>{this.state.daterange}</div>
                </aside>
                <aside>
                     <div><img src='./assets/images/eye.png'/> <span>{this.props.formatNumber(this.state.allWaitingCount||0)}</span></div>
                </aside>
              </div>
              <div className='zmiti-active-takeuser'>
                <div className='zmiti-active-slider'>
                    <div className='zmiti-active-slider-bar'></div>
                </div>
                <div className='zmiti-active-waiting-user-count-C'>
                  <aside>
                    <span>候选总人数</span>
                      <label>{this.props.formatNumber(this.state.candidateCount||0)}</label>
                  </aside>
                  <aside>
                    <span>参与人数</span>
                    <label>{this.props.formatNumber(this.state.takePartCount||0)}</label>
                  </aside>
                </div>
              </div>
            </div>
            <div className='zmiti-niceperson-list'>
               {this.state.nicepersonList.map((item,i)=>{
                  return <ZmitiNicePersonApp iNow={i} {...item} daterange={this.state.daterange} key={i}></ZmitiNicePersonApp>
               })}
            </div>
          </div>
        </aside>
        <aside>
          <div>
            <div className='zmiti-map' ref='map'></div>
             <div className='zmiti-pv-C'>
                <div className='zmiti-all-pv' style={allPVStyl}>
                    <label>总浏览量</label>
                    {
                      this.props.formatNumber(this.state.allPV || 0).split('').map((item, i) => {
                        return <span key={i}>{item}</span>
                      })
                    }
                </div>
                <ul className='zmiti-pv-list'>
                  {this.state.pvList.map((list,i)=>{
                    return <li key={i}>
                        <aside>{list.name}</aside>
                        <aside>{this.props.formatNumber(list.count||0)}</aside>
                    </li>
                  })}
                </ul>
            </div>

            <div className='zmiti-tag' ref='tag'>

                {this.state.tags.map((tag,i)=>{
                  return <a key={i} className={'zmiti-tag-'+(i+1)} href={tag.href}>{tag.name}</a>
                })}

            </div>
          </div>
        </aside>
      </div>
    );
  }

  createMarkup() {
    return {
      __html: this.state.notice
    };
  }


  dataConfig(userData) {
    var s = this;
    return {
      backgroundColor: 'transparent',
      title: {
        text: '',
        subtext: '',
        sublink: '',
        x: 'center',
        textStyle: {
          color: '#fff'
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: function(params) {
          return params.name + ' : ' + params.value[2];
        }
      },
      legend: {
        orient: 'vertical',
        y: 'top',
        x: 'left',
        data: [''],
        textStyle: {
          color: '#fff'
        }
      },
      visualMap: {
        show:false,
        min: 0,
        max: 500,
        calculable: true,
        inRange: {
          color: ['#ff684e', '#d32000']
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
        center: [
          106.6308452923, 39.4701180437
        ],
        itemStyle: {
          normal: {
            areaColor: '#377891', //地图的背景颜色 
            borderColor: '#2ed3c1' //地图边框颜色。
          },
          emphasis: {
            areaColor: '#ffef98'
          }
        }
      },
      series: [{
        name: '',
        type: 'effectScatter',
        coordinateSystem: 'geo',
        symbol: '',
        data: s.convertData(userData),
        symbolSize: function(val) {
          return val[2] / 50; //100
        },
        label: {
          normal: {
            show: false
          },
          emphasis: {
            show: false
          }
        },
        itemStyle: {
          emphasis: {
            borderColor: 'transparent',
            borderWidth: 3,
            color: '#f90'
          },
          normal: {
            color: '#f90'
          }
        }
      }]
    };
  }

  convertData(data) {
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


  showToast(msg) {
    this.setState({
      toast: msg
    });

    setTimeout(() => {
      this.setState({
        toast: ''
      });
    }, 2000)
  }

  initChart() {
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
  }



  format(date) {
    var month = date.getMonth() + 1;
    month < 10 && (month = '0' + month);
    var d = date.getDate();
    d < 10 && (d = '0' + d);
    return date.getFullYear() + "-" + month + "-" + d;
  }

  componentDidMount() {
    this.getDateRange();
    this.initChart();
    this.tagMove()
  }

  getDateRange() {
    var D = new Date();
    var year = D.getFullYear();
    var month = D.getMonth();
    var day = D.getDate();

    this.setState({
      daterange: [year, month, day].join('/') + "--" + [year, month + 1, day].join('/')
    })
  }

  tagMove() {
    var radius = 90;
    var sa = 0,
      ca = 0,
      sb = 0,
      cb = 0,
      sc = 0,
      cc = 0;
    var d = 200;
    var dtr = Math.PI / 180;
    var mcList = [];
    var lasta = 1;
    var lastb = 1;
    var distr = true;
    var tspeed = 11;
    var size = 200;
    var mouseX = 0;
    var mouseY = 1;
    var howElliptical = 1;
    var aA = null;
    var oDiv = null;
    var per = 0;
    var i = 0;
    var oTag = null;
    oDiv = this.refs['tag'];
    aA = oDiv.getElementsByTagName('a');
    for (i = 0; i < aA.length; i++) {
      oTag = {};
      aA[i].onmouseover = (function(obj) {
        return function() {
          obj.on = true;
          this.style.zIndex = 9999;
          this.style.color = '#fff';
          this.style.background = '#0099ff';
          this.style.padding = '5px 5px';
          this.style.filter = "alpha(opacity=100)";
          this.style.opacity = 1;
        }
      })(oTag)
      aA[i].onmouseout = (function(obj) {
        return function() {
          obj.on = false;
          this.style.zIndex = obj.zIndex;
          this.style.color = '#fff';
          this.style.background = '#9933FF';
          this.style.padding = '5px';
          this.style.opacity = obj.alpha;
          this.style.zIndex = obj.zIndex;
        }
      })(oTag)
      oTag.offsetWidth = aA[i].offsetWidth;
      oTag.offsetHeight = aA[i].offsetHeight;
      mcList.push(oTag);
      sineCosine(0, 0, 0);
      positionAll();
      setInterval(() => {
        update();
      }, 17)
    };

    function update() {
      var a, b, c = 0;
      a = (Math.min(Math.max(-mouseY, -size), size) / radius) * tspeed;
      b = (-Math.min(Math.max(-mouseX, -size), size) / radius) * tspeed;
      lasta = a;
      lastb = b;
      if (Math.abs(a) <= 0.01 && Math.abs(b) <= 0.01) {
        return;
      }
      sineCosine(a, b, c);
      for (var i = 0; i < mcList.length; i++) {
        if (mcList[i].on) {
          continue;
        }
        var rx1 = mcList[i].cx;
        var ry1 = mcList[i].cy * ca + mcList[i].cz * (-sa);
        var rz1 = mcList[i].cy * sa + mcList[i].cz * ca;

        var rx2 = rx1 * cb + rz1 * sb;
        var ry2 = ry1;
        var rz2 = rx1 * (-sb) + rz1 * cb;

        var rx3 = rx2 * cc + ry2 * (-sc);
        var ry3 = rx2 * sc + ry2 * cc;
        var rz3 = rz2;

        mcList[i].cx = rx3;
        mcList[i].cy = ry3;
        mcList[i].cz = rz3;

        per = d / (d + rz3);

        mcList[i].x = (howElliptical * rx3 * per) - (howElliptical * 2);
        mcList[i].y = ry3 * per;
        mcList[i].scale = per;
        var alpha = per;
        alpha = (alpha - 0.6) * (10 / 6);
        mcList[i].alpha = alpha * alpha * alpha - 0.2;
        mcList[i].zIndex = Math.ceil(100 - Math.floor(mcList[i].cz));
      }
      doPosition();
    }

    function depthSort() {
      var i = 0;
      var aTmp = [];
      for (i = 0; i < aA.length; i++) {
        aTmp.push(aA[i]);
      }
      aTmp.sort(
        function(vItem1, vItem2) {
          if (vItem1.cz > vItem2.cz) {
            return -1;
          } else if (vItem1.cz < vItem2.cz) {
            return 1;
          } else {
            return 0;
          }
        }
      );
      for (i = 0; i < aTmp.length; i++) {
        aTmp[i].style.zIndex = i;
      }
    }

    function positionAll() {
      var phi = 0;
      var theta = 0;
      var max = mcList.length;
      for (var i = 0; i < max; i++) {
        if (distr) {
          phi = Math.acos(-1 + (2 * (i + 1) - 1) / max);
          theta = Math.sqrt(max * Math.PI) * phi;
        } else {
          phi = Math.random() * (Math.PI);
          theta = Math.random() * (2 * Math.PI);
        }
        //坐标变换
        mcList[i].cx = radius * Math.cos(theta) * Math.sin(phi);
        mcList[i].cy = radius * Math.sin(theta) * Math.sin(phi);
        mcList[i].cz = radius * Math.cos(phi);

        aA[i].style.left = mcList[i].cx + oDiv.offsetWidth / 3 - mcList[i].offsetWidth / 2 + 'px';
        aA[i].style.top = mcList[i].cy + oDiv.offsetHeight / 10 - mcList[i].offsetHeight + 'px';
      }
    }

    function doPosition() {
      var l = oDiv.offsetWidth / 2;
      var t = oDiv.offsetHeight / 2;
      for (var i = 0; i < mcList.length; i++) {
        if (mcList[i].on) {
          continue;
        }
        var aAs = aA[i].style;
        if (mcList[i].alpha > 0.1) {
          if (aAs.display != '')
            aAs.display = '';
        } else {
          if (aAs.display != 'none')
            aAs.display = 'none';
          continue;
        }
        aAs.left = mcList[i].cx + l - mcList[i].offsetWidth / 2 + 'px';
        aAs.top = mcList[i].cy + t - mcList[i].offsetHeight / 2 + 'px';
        //aAs.fontSize = Math.ceil(12 * mcList[i].scale / 2) + 6 + 'px';
        //aAs.filter="progid:DXImageTransform.Microsoft.Alpha(opacity="+100*mcList[i].alpha+")";
        aAs.zIndex = mcList[i].zIndex;
        aAs.opacity = mcList[i].alpha;
      }
    }

    function sineCosine(a, b, c) {
      sa = Math.sin(a * dtr);
      ca = Math.cos(a * dtr);
      sb = Math.sin(b * dtr);
      cb = Math.cos(b * dtr);
      sc = Math.sin(c * dtr);
      cc = Math.cos(c * dtr);
    }
  }
}

export default PubCom(ZmitiIndexApp);