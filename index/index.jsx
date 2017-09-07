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
      currentActiveCount: 2,
      currentWeekActiveCount: 2822114,
      currentMonthActiveCount: 24026969,
      allWaitingCount: 2815664, //中国好人榜右侧数据
      candidateCount: 302, //总候选人数
      takePartCount: 2700586, //参与人数
      nicepersonList: [{
        title: '中国好医生好护士投票活动',
        person: 53519628,
        daterange: '2017/7/1--2017/8/31'
      }, {
        title: '中国好人榜(8月)',
        person: 18389191,
        daterange: '2017/8/1--2017/8/31'
      }, {
        title: '中国好人榜(7月)',
        person: 28443227,
        daterange: '2017/7/1--2017/7/31'
      }],
      allPV: 131591629, //总浏览量
      pvList: [{
        name: '#好人365#总浏览量',
        count: 1445968794,
      }],
      tags: [{
        href: 'javascript:void(0)',
        name: '中国文明网'
      }, {
        href: 'javascript:void(0)',
        name: '习近平7.26讲话'
      }, {
        href: 'javascript:void(0)',
        name: '十九大'
      }, {
        href: 'javascript:void(0)',
        name: '法治中国'
      }, {
        href: 'javascript:void(0)',
        name: '将改革进行到底'
      }, {
        href: 'javascript:void(0)',
        name: '好人365'
      }, {
        href: 'javascript:void(0)',
        name: '习近平'
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
                      {this.props.formatNumber(this.state.currentActiveCount)}
                      <div>当前活动数</div>
                    </aside>
                    <aside>
                      {this.props.formatNumber(this.state.currentWeekActiveCount)}
                      <div>近一周</div>
                    </aside>
                    <aside>
                      {this.props.formatNumber(this.state.currentMonthActiveCount)}
                      <div>近一月</div>
                    </aside>
                </div>
            </div>
            <div className='zmiti-active-waiting-user' style={waitingStyle}>
              <h1 style={{height:30}}></h1>
              <div className='zmiti-active-title'>
                <aside>
                  <div>中国好人榜(9月)</div>
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
                    <span>候选人</span>
                      <label>{this.props.formatNumber(this.state.candidateCount||0)}</label>
                  </aside>
                  <aside>
                    <span>线索</span>
                    <label>{this.props.formatNumber(this.state.takePartCount||0)}</label>
                  </aside>
                </div>
              </div>
            </div>
            <div className='zmiti-niceperson-list'>
              {
                this.state.nicepersonList.map((item, i) => {
                  return <ZmitiNicePersonApp iNow={i} {...item} daterange={item.daterange} key={i}></ZmitiNicePersonApp>
               })}
            </div>
          </div>
        </aside>
        <aside>
          <div>
            <div className='zmiti-map' ref='map'></div>
             <div className='zmiti-pv-C'>
                <div className='zmiti-all-pv' style={allPVStyl}>
                    <label>网站总浏览量</label>
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
          return ''; // params.name + ' : ' + params.value[2];
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
        show: false,
        min: 0,
        max: 500,
        calculable: true,
        inRange: {
          color: ['rgba(240,245,116,.60)', '#f0f574']
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

      {
        name: "西城区",
        value: 888
      },

      {
        name: "东城区",
        value: 576
      },

      {
        name: "海淀区",
        value: 378
      },

      {
        name: "许昌市",
        value: 282
      },

      {
        name: "房山区",
        value: 246
      },

      {
        name: "长沙市",
        value: 235
      },

      {
        name: "朝阳区",
        value: 195
      },

      {
        name: "西宁市",
        value: 187
      },

      {
        name: "福州市",
        value: 147
      },

      {
        name: "银川市",
        value: 141
      },

      {
        name: "台湾省",
        value: 137
      },

      {
        name: "渝北区",
        value: 136
      },

      {
        name: "香港特別行政區",
        value: 115
      },

      {
        name: "石家庄市",
        value: 113
      },

      {
        name: "郑州市",
        value: 105
      },

      {
        name: "重庆市",
        value: 101
      },

      {
        name: "长春市",
        value: 93
      },

      {
        name: "西安市",
        value: 88
      },

      {
        name: "珠海市",
        value: 86
      },

      {
        name: "兰州市",
        value: 82
      },

      {
        name: "肇庆市",
        value: 78
      },

      {
        name: "拉萨市",
        value: 177
      },

      {
        name: "沈阳市",
        value: 71
      },

      {
        name: "杭州市",
        value: 66
      },

      {
        name: "成都市",
        value: 64
      },

      {
        name: "汕头市",
        value: 60
      },

      {
        name: "和平区",
        value: 257
      },

      {
        name: "哈尔滨市",
        value: 54
      },

      {
        name: "上海市",
        value: 54
      },

      {
        name: "中西區",
        value: 53
      },

      {
        name: "乌鲁木齐市",
        value: 53
      },

      {
        name: "南京市",
        value: 50
      },

      {
        name: "贵阳市",
        value: 149
      },

      {
        name: "海口市",
        value: 47
      },

      {
        name: "太原市",
        value: 42
      },

      {
        name: "天津市",
        value: 41
      },

      {
        name: "广州市",
        value: 41
      },

      {
        name: "昆明市",
        value: 40
      },

      {
        name: "合肥市",
        value: 38
      },

      {
        name: "佛山市",
        value: 36
      },

      {
        name: "南昌市",
        value: 33
      },

      {
        name: "呼和浩特市",
        value: 131
      },

      {
        name: "武汉市",
        value: 429
      },

      {
        name: "黄浦区",
        value: 24
      },

      {
        name: "绵阳市",
        value: 23
      },

      {
        name: "莆田市",
        value: 21
      },

      {
        name: "赣州市",
        value: 20
      },

      {
        name: "铜陵市",
        value: 220
      },

      {
        name: "襄阳市",
        value: 18
      },

      {
        name: "通州区",
        value: 18
      },

      {
        name: "嘉兴市",
        value: 16
      },

      {
        name: "石嘴山市",
        value: 13
      },

      {
        name: "厦门市",
        value: 13
      },

      {
        name: "株洲市",
        value: 12
      },

      {
        name: "漯河市",
        value: 11
      },

      {
        name: "芜湖市",
        value: 10
      },

      {
        name: "亳州市",
        value: 8
      },

      {
        name: "黄山市",
        value: 8
      },

      {
        name: "六安市",
        value: 8
      },

      {
        name: "绍兴市",
        value: 7
      },

      {
        name: "临沂市",
        value: 6
      },

      {
        name: "淮安市",
        value: 6
      },

      {
        name: "呼伦贝尔市",
        value: 5
      },

      {
        name: "上饶市",
        value: 5
      },

      {
        name: "邯郸市",
        value: 4
      },

      {
        name: "包头市",
        value: 4
      },

      {
        name: "白城市",
        value: 4
      },

      {
        name: "绥化市",
        value: 4
      },

      {
        name: "张家口市",
        value: 3
      },

      {
        name: "钦州市",
        value: 3
      },

      {
        name: "枣庄市",
        value: 3
      },

      {
        name: "荆州市",
        value: 3
      },

      {
        name: "黄石市",
        value: 3
      },

      {
        name: "固原市",
        value: 3
      },

      {
        name: "安阳市",
        value: 2
      },

      {
        name: "闵行区",
        value: 2
      },

      {
        name: "玉树藏族自治州",
        value: 2
      },

      {
        name: "十堰市",
        value: 2
      },

      {
        name: "长宁区",
        value: 2
      },

      {
        name: "昌平区",
        value: 2
      },

      {
        name: "延庆区",
        value: 2
      },

      {
        name: "宿迁市",
        value: 2
      },

      {
        name: "漳州市",
        value: 1
      },

      {
        name: "衡阳市",
        value: 1
      },

      {
        name: "恩施土家族苗族自治州",
        value: 1
      },

      {
        name: "丰台区",
        value: 1
      },

      {
        name: "济南市",
        value: 1
      },

      {
        name: "兴安盟",
        value: 1
      },

      {
        name: "无锡市",
        value: 1
      },

      {
        name: "鞍山市",
        value: 1
      },

      {
        name: "深圳市",
        value: 1
      },

      {
        name: "娄底市",
        value: 1
      },

      {
        name: "济宁市",
        value: 1
      },

      {
        name: "丽水市",
        value: 1
      },

      {
        name: "焦作市",
        value: 1
      },

      {
        name: "普洱市",
        value: 1
      }
    ];
    var geoCoordMap = {
      //"常德市":[111.7087330000,28.9399430000]
      "上海市": ["121.48", "31.22"],
      "上饶市": ["117.9282", "28.45717"],
      "东城区": ["116.407526", "39.90403"],
      "中西區": ["114.17", "22.27"],
      "丰台区": ["116.3207", "39.88342"],
      "临沂市": ["118.33647", "35.101498"],
      "丽水市": ["119.39273", "28.510925"],
      "乌鲁木齐市": ["87.68", "43.77"],
      "亳州市": ["115.77176", "33.84292"],
      "佛山市": ["113.11711", "23.021608"],
      "六安市": ["116.929", "31.46434"],
      "兰州市": ["103.73", "36.03"],
      "兴安盟": ["121.46003", "45.05508"],
      "包头市": ["109.815895", "40.6466"],
      "十堰市": ["110.7782", "32.63362"],
      "南京市": ["118.78", "32.04"],
      "南昌市": ["115.89", "28.68"],
      "厦门市": ["118.0875", "24.48261"],
      "台湾省": ["121.5", "25.14"],
      "合肥市": ["117.27", "31.86"],
      "呼伦贝尔市": ["117.43338", "49.580486"],
      "呼和浩特市": ["111.65", "40.82"],
      "和平区": ["117.2", "39.13"],
      "哈尔滨市": ["126.63", "45.75"],
      "嘉兴市": ["120.7512", "30.74889"],
      "固原市": ["105.69013", "35.97688"],
      "天津市": ["117.2", "39.13"],
      "太原市": ["112.53", "37.87"],
      "娄底市": ["112.0309", "27.74298"],
      "安阳市": ["114.82361", "35.693203"],
      "宿迁市": ["118.2285", "33.96496"],
      "广州市": ["113.23", "23.16"],
      "延庆区": ["115.9666", "40.47504"],
      "张家口市": ["115.20702", "40.381233"],
      "恩施土家族苗族自治州": ["109.12858", "29.672089"],
      "成都市": ["104.06", "30.67"],
      "房山区": ["116.407526", "39.90403"],
      "拉萨市": ["91.11", "29.97"],
      "无锡市": ["120.2786", "31.90034"],
      "昆明市": ["102.73", "25.04"],
      "昌平区": ["116.2799", "40.09803"],
      "普洱市": ["100.69891", "23.502153"],
      "朝阳区": ["116.3617", "39.89865"],
      "杭州市": ["120.19", "30.26"],
      "枣庄市": ["117.58045", "34.77013"],
      "株洲市": ["113.53471", "26.786093"],
      "武汉市": ["114.31", "30.52"],
      "汕头市": ["116.77925", "23.51265"],
      "沈阳市": ["123.38", "41.8"],
      "济南市": ["117.02494", "36.59619"],
      "济宁市": ["116.3425", "35.40723"],
      "海口市": ["110.35", "20.02"],
      "海淀区": ["116.46", "39.92"],
      "淮安市": ["119.01097", "33.015457"],
      "深圳市": ["114.1001", "22.54739"],
      "渝北区": ["106.54", "29.59"],
      "漯河市": ["113.92245", "33.834435"],
      "漳州市": ["117.43445", "23.699081"],
      "焦作市": ["113.23545", "35.215565"],
      "玉树藏族自治州": ["97.00945", "32.99465"],
      "珠海市": ["113.33", "22.13"],
      "白城市": ["122.7925", "45.61005"],
      "石嘴山市": ["106.37909", "38.984573"],
      "石家庄市": ["114.5408", "38.02492"],
      "福州市": ["119.3", "26.08"],
      "绍兴市": ["120.6115", "29.99108"],
      "绥化市": ["126.46015", "46.971336"],
      "绵阳市": ["104.6759", "31.46955"],
      "肇庆市": ["112.4708", "23.05152"],
      "芜湖市": ["118.35946", "31.272272"],
      "荆州市": ["112.4089", "29.7196"],
      "莆田市": ["119.09946", "25.296995"],
      "衡阳市": ["112.65263", "26.888277"],
      "襄阳市": ["112.098434", "32.05085"],
      "西城区": ["116.3618", "39.89861"],
      "西宁市": ["101.74", "36.56"],
      "西安市": ["108.95", "34.27"],
      "许昌市": ["113.8312", "34.02618"],
      "贵阳市": ["106.71", "26.57"],
      "赣州市": ["114.95182", "25.845785"],
      "通州区": ["116.46", "39.92"],
      "邯郸市": ["114.49739", "36.762943"],
      "郑州市": ["113.65", "34.76"],
      "重庆市": ["106.54", "29.59"],
      "钦州市": ["109.1989", "22.34192"],
      "铜陵市": ["117.8219", "30.93825"],
      "银川市": ["106.27", "38.47"],
      "长宁区": ["121.4147", "31.22008"],
      "长春市": ["125.35", "43.88"],
      "长沙市": ["113", "28.21"],
      "闵行区": ["121.31587", "31.194773"],
      "鞍山市": ["122.69765", "40.815674"],
      "香港特別行政區": ["114.17", "22.27"],
      "黄山市": ["118.3322", "29.7205"],
      "黄浦区": ["121.48", "31.22"],
      "黄石市": ["114.96465", "30.087086"],
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
      daterange: [year, 9, 1].join('/') + "--" // + [year, 8, 31].join('/')
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
    var mouseX = 1;
    var mouseY = 2;
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

      window.requestAnimationFrame(update)

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
      window.requestAnimationFrame(update)
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

        aA[i].style.left = mcList[i].cx + oDiv.offsetWidth / 2 - mcList[i].offsetWidth / 2 + 'px';
        aA[i].style.top = mcList[i].cy + oDiv.offsetHeight / 5 - mcList[i].offsetHeight / 2 + 'px';
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
        aAs.left = mcList[i].cx + l - mcList[i].offsetWidth / 2 + 10 + 'px';
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