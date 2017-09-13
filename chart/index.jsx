import React, {
  Component
} from 'react';
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

import ZmitiPvchartApp from '../components/pvchart/index.jsx'


import ZmitiRankingApp from '../components/ranking/index.jsx'

class ZmitiChartApp extends Component {
  constructor(props) {
    super(props);


    this.state = {

      hotnews: [{
        name: '中国好人榜”候选人点赞评议开始---中国文明网',
        company: '中国文明网',
        pv: 3926,
        channel: '身边好人_频道',
        href: 'http://www.wenming.cn/sbhr_pd/tt/201707/t20170731_4363866.shtml'
      }, {
        name: '湖北省第一届全国文明校园候选学校公示--中国文明网·湖北-湖北文明网',
        company: '中国文明网',
        pv: 11170,
        channel: '公示公告',
        href: 'http://hub.wenming.cn/wmxx/gg/201708/t20170809_4376812.shtml'
      }, {
        name: '头条 -贵州文明网',
        company: '中国文明网',
        pv: 3432,
        channel: '头条',
        href: 'http://gz.wenming.cn/toutiao/201708/t20170810_4378168.shtml?from=timeline&isappinstalled=0'
      }, {
        name: '中央文明办发布8月“中国好人榜”---中国文明网',
        company: '中国文明网',
        pv: 2959,
        channel: '身边好人_频道',
        href: 'http://www.wenming.cn/sbhr_pd/tt/201708/t20170831_4406952.shtml'
      }, {
        name: '禁区勇士”胡洪炜：“国家选中我 就要干到底”---中国文明网',
        company: '中国文明网',
        pv: 2689,
        channel: '专题库',
        href: 'http://www.wenming.cn/specials/sxdt/sixthmd/diliujie/jyfx2017/201708/t20170818_4390469.shtml'
      }],
      allListCount: 0,
      allHRCount: 10740, //好人总数
      lastMonthRecordCount: 2702546, //上月推荐总数
      PVinCountry: 139327001, //国内浏览量
      PVoutCountry: 596563, //国外浏览量
      PVinPC: 65892023, //pc端浏览量
      PVinMobile: 65699606, //移动端浏览量
      alexa: 57006,
      alexaorder: 1, //0下降 1上升 
      pvList: [{
        name: 'H5用户量',
        pv: 33872,
        img: './assets/images/h5.png',
        scale: .77,
        color: 'rgba(70,205,236,1)',
        bgcolor: 'rgba(70,205,236,.1)',
      }, {
        name: '微博用户量',
        pv: 468225,
        img: './assets/images/weibo.png',
        scale: .84,
        color: 'rgba(255,16,95,1)',
        bgcolor: 'rgba(255,16,95,.1)',
      }, {
        name: '微信用户量',
        pv: 703414,
        img: './assets/images/weixin.png',
        scale: .77,
        color: 'rgba(119,229,89,1)',
        bgcolor: 'rgba(119,229,89,.1)',
      }, {
        name: 'APP装机量',
        pv: 1205694,
        img: './assets/images/app.png',
        scale: .66,
        color: 'rgba(252,133,2,1)',
        bgcolor: 'rgba(252,133,2,.1)',
      }],
      editorRankingList: [{
        editor: '梁艳红',
        count: 19989,
        scale: .381
      }, {
        editor: '郑刚',
        count: 14625,
        scale: .28
      }, {
        editor: '何霄',
        count: 12521,
        scale: .239
      }, {
        editor: '张智萍',
        count: 10080,
        scale: .192
      }],
      seoList: [{
        name: '百度',
        count: 5310193,
        height: 30,
      }, {
        name: '谷歌',
        count: 404000,
        height: 50
      }, {
        name: '360',
        count: 3450000,
        height: 25
      }, {
        name: '搜狗',
        count: 7988396,
        height: 47
      }]



    }
    this.viewW = document.documentElement.clientWidth;
    this.viewH = document.documentElement.clientHeight;
    window.s = this;
  }

  fillDate() {
    var s = this;
    var arr = ['日', '一', '二', '三', '四', '五', '六']
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var week = date.getDay();
    var hours = date.getHours();
    var mins = date.getMinutes();
    var seconds = date.getSeconds();
    hours < 10 && (hours = '0' + hours);
    mins < 10 && (mins = '0' + mins);
    seconds < 10 && (seconds = '0' + seconds);
    this.setState({
      time: hours + "<span>:</span>" + mins,
      date: [year, month, day].join('/'),
      day: arr[week]
    })

    this.timer = setInterval(function() {
      date = new Date();
      hours = date.getHours();
      mins = date.getMinutes();
      seconds = date.getSeconds();
      hours < 10 && (hours = '0' + hours);
      var week = date.getDay();
      mins < 10 && (mins = '0' + mins);
      seconds < 10 && (seconds = '0' + seconds);
      s.setState({
        time: hours + "<span> : </span>" + mins,
        date: [year, month, day].join('/'),
        day: arr[week]
      })

      s.hours = hours;
      s.mins = mins;
      if (seconds === '00' && hours === '00' && mins === '00') {
        year = date.getFullYear();
        month = date.getMonth() + 1;
        day = date.getDate();

      }

    }, 1000)

  }
  render() {


    var data = {
      mainStyle: {
        background: 'url(./assets/images/bg1.jpg) no-repeat center left / cover',
      },
      headerStyle: {
        textAlign: 'left'
      },
      shadowimg: './assets/images/shadow1.png',
      date: <div></div>,
      title: '数据融合平台',
      className: ''
    };

    var pvStyle = {
      background: 'url(./assets/images/chart-shadow1.png) no-repeat left top / contain',
    }

    return (
      <div className='zmiti-chart-main-ui'>
        <ZmitiCanvasApp {...data}></ZmitiCanvasApp>
        <h2></h2>
        <section className='zmiti-chart-container' >
          <aside>
              <div className='zmiti-chart1'>
                <div className='zmiti-trend'>
                  <section>
                    <div className='title'>ALEXA</div>
                    <div>{this.state.alexa} <span><img src='./assets/images/ar.png' style={{marginTop:this.state.alexaorder===1?5:0,transform:'rotate('+(this.state.alexaorder===1?0:'180deg')+')'}}/></span></div>
                  </section>
                  <section>
                    <div>
                      <section><img src='./assets/images/user.png'/></section>
                      <section>{this.props.formatNumber(this.state.allHRCount||0)}</section>
                      <section>好人总数</section>
                    </div>
                    <div>
                       <section><img src='./assets/images/like.png'/></section>
                      <section>{this.props.formatNumber(this.state.lastMonthRecordCount||0)}</section>
                      <section>上月推荐总数</section>
                    </div>
                  </section>
                  <section>
                    <div className='title'>点击量趋势图</div>
                    <div ref='clickCharts'></div>
                  </section>
                </div>
                <div className='zmiti-pv' style={pvStyle}>
                    <section className='title'>浏览量</section>
                    <section>
                        <div>
                          <div>国内：<span>{this.props.formatNumber(this.state.PVinCountry||0)}</span></div>
                          <div>国外：<span>{this.props.formatNumber(this.state.PVoutCountry||0)}</span></div>
                        </div>
                        <div></div>
                        <div>
                          <section className='zmiti-pc-pv'>
                            <div>{this.props.formatNumber(this.state.PVinPC)}</div>
                            <div><img src='./assets/images/pc.png'/>PC端浏览量</div>
                          </section>
                          <section className='zmiti-mobile-pv'>
                            <div>{this.props.formatNumber(this.state.PVinMobile)}</div>
                            <div><img src='./assets/images/mobile.png'/>移动端浏览量</div>
                          </section>
                        </div>
                    </section>
                     <section className='zmiti-pv-list'>
                      {this.state.pvList.map((item,i)=>{
                        return <ZmitiPvchartApp allListCount={this.state.allListCount} key={i} {...item}></ZmitiPvchartApp>
                      })}
                    </section>
                </div>
              </div>
              <div className='zmiti-chart2'>
                  <div className='zmiti-site-send'>
                     <div className='title'>网站发稿量</div>
                     <div className='zmiti-site' ref='zmiti-site'>11</div>
                  </div>
                  <div className='zmiti-channel-send'>
                    <div className='title'>栏目发稿量</div>
                    <div className='zmiti-channel' ref='zmiti-channel'></div>
                  </div>
              </div>
          </aside>
          <aside>
            <div className='zmiti-news-C'>
              <div className='zmiti-new-ranking'>
                <div className='title'>
                    热点新闻排行
                    <ul>
                      <li className='active'>当日</li>
                      <li>近一周</li>
                      <li>近一月</li>
                    </ul>
                </div>
                <div className='zmiti-hotnews-list'>
                  <ul>
                    <li>
                      <div>频道</div>
                      <div>名称</div>
                      <div>所属单位</div>
                      <div>点击量</div>
                    </li>
                    {this.state.hotnews.map((news,i)=>{
                      return <li key={i}>
                        <div>{news.channel}</div>
                        <div className='zmiti-text-overflow'>{news.name}</div>
                        <div>{news.company}</div>
                        <div className='zmiti-news-pv'>{this.props.formatNumber(news.pv||0)}</div>
                      </li>
                    })}
                  </ul>  
                </div>
              </div>
              <div className='zmiti-active-ranking'>
                  <section>
                    <div className='title'>
                      编辑贡献排行
                      <ul>
                        <li className='active'>当日</li>
                        <li>近一周</li>
                        <li>近一月</li>
                      </ul>
                    </div>
                    <ol>
                      {this.state.editorRankingList.map((editor,i)=>{
                        return <ZmitiRankingApp key={i} {...editor}></ZmitiRankingApp>
                      })}
                    </ol>
                  </section>
                  <section>
                    <div className='title'>热门活动排行</div>
                    <div className='zmiti-hot-active-pie' ref='hotactive'></div>
                  </section>
              </div>
            </div>
            <div className='zmiti-seo'>
                <div className='title'>搜索引擎收录量</div>
                <div className='zmiti-seo-info' ref='zmiti-seo-info'>
                  {this.state.seoList.map((seo,i)=>{
                    return <div ref={'point'+i} key={i} style={{visibility:'visible'}}>
                              <div className="zmiti-p"></div>
                              <span className='zmiti-include-count'>{this.props.formatNumber(seo.count||0)}</span>
                          </div>
                  })}
                  
                  <canvas ref='seo' height='0'></canvas>
                </div>
            </div>
          </aside>
        </section>
      </div>
    );
  }

  createMarkup() {
    return {
      __html: this.state.time
    };
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


  componentWillUnmount() {
    clearInterval(this.timer)
  }


  format(date) {
    var month = date.getMonth() + 1;
    month < 10 && (month = '0' + month);
    var d = date.getDate();
    d < 10 && (d = '0' + d);
    return date.getFullYear() + "-" + month + "-" + d;
  }

  initEcharts() {
    var s = this;

    var clickCharts = echarts.init(this.refs['clickCharts']);

    clickCharts.setOption(this.clickConfig());

    var siteChart = echarts.init(this.refs['zmiti-site']);

    siteChart.setOption(this.siteConfig());

    var channelChart = echarts.init(this.refs['zmiti-channel'])
    channelChart.setOption(this.channelConfig());

    var activeRankingChart = echarts.init(this.refs['hotactive']);
    activeRankingChart.setOption(this.activeRankingConfig());



    return;
    /* var netCharts = echarts.init(this.refs['chart2']);

     netCharts.setOption(this.netConfig())*/


  }

  initCreatejs() {
    var canvas = this.refs['seo'];
    var p = this.refs['zmiti-seo-info'];
    canvas.width = p.offsetWidth;
    canvas.height = p.offsetHeight;
    var stage = new createjs.Stage(canvas);

    var width = canvas.width,
      height = canvas.height;

    var line = new createjs.Shape();
    var shape = line.graphics.beginStroke('#e4e4e4');
    var containers = [];
    this.state.seoList.map((seo, i) => {
      var dom = this.refs['point' + i];
      var domElement = new createjs.DOMElement(dom);
      var x = width * (i * 2 + 1) / 8 - 10;
      domElement.x = x;
      domElement.y = seo.height;
      shape[i === 0 ? 'moveTo' : 'lineTo'](width * (i * 2 + 1) / 8, seo.height + 10);
      var container = $(dom);

      var text = new createjs.Text(seo.name, '10px Arial', '#e4e4e4');

      stage.addChild(text);
      text.x = x;
      text.y = height - 20;

      containers.push(container);
      stage.addChild(domElement);
    })

    stage.addChild(line);



    stage.update();



    var data = {
      left: .6 * document.documentElement.clientWidth / 10 / 2,
      top: 30,
      timespan: 1000
    }

    function Halo(obj, left, top) {
      var left = 10;
      var top = 10;
      containers.forEach((obj, i) => {
        obj.append('<div class="dot" style="top:' + top + 'px;left:' + left + 'px;"></div>')
        setTimeout(function() {
          obj.find('.dot:first-of-type').remove();
        }, 2500 + (i * 100));
      })
    }



    var container = $(this.refs['point']);



    function loop() {
      var time = 200;
      setTimeout(function() {
        Halo(container, data.left, data.top);
      }, time)

      setTimeout(function() {
        Halo(container, data.left, data.top);
      }, time + data.timespan)

    }
    loop();
    setInterval(function() {
      loop();
    }, 2500);


  }

  componentDidMount() {
    //this.fillDate();
    this.initEcharts();
    this.initCreatejs();
    this.computScale();
    this.socket();
    this.fillData();

  }

  fillData() { //填充请求过来的数据

    var {
      request
    } = this.props;
    request(data => {

      this.setState({
        alexa: data.list[0].alexa,
        allHRCount: data.list[0].niceperson365,
        PVinCountry: data.list[0].pvincountry,
        PVoutCountry: data.list[0].pvoutcountry,
        PVinPC: data.list[0].pvinpc,
        alexaorder: data.list[0].alexaorder,
        PVinMobile: data.list[0].pvinmobile
      })
    });
  }


  socket() {
    var socket = io('http://socket.zmiti.com:2120');
    var s = this;
    var socketEvent = function(msg) {
      if (!msg) {
        return;
      }
      msg = msg.replace(/&quot;/g, "\"");


      console.log(msg)
      var data = JSON.parse(msg);


      s.setState({
        alexa: data.alexa
      })

    }

    socket.off('wenming-alexa');

    socket.on('wenming-alexa', socketEvent);


    var baiIncludeFn = function(msg) {
      if (!msg) {
        return;
      }
      msg = msg.replace(/&quot;/g, "\"");
      console.log(msg);
      var data = JSON.parse(msg);

      s.state.seoList[0].count = data.include;
      s.forceUpdate();
    }
    socket.off('wenming-baidu-include');

    socket.on('wenming-baidu-include', baiIncludeFn);


  }


  computScale() {
    var all = 0;

    this.state.pvList.map((list, i) => {
      all += list.pv
    });
    this.state.pvList.forEach((list, i) => {
      list.scale = list.pv / all;

    });

    this.forceUpdate();
  }


  netConfig() {
    return {
      title: {
        text: '网络拥堵量',
        subtext: '',
        textStyle: {
          color: '#e4e4e4',
          fontWeight: 'normal'
        }
      },
      tooltip: {
        trigger: 'axis'
      },


      xAxis: {
        type: 'category',
        boundaryGap: false,
        axisLine: {
          lineStyle: {
            color: 'rgba(0,0,0,0)'
          }
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#999',
            opacity: .3
          }
        },

        data: [{
          value: '06:00',
          textStyle: {
            fontSize: 12,
            color: '#e4e4e4'
          }
        }, {
          value: '09:00',
          textStyle: {
            fontSize: 12,
            color: '#e4e4e4'
          }
        }, {
          value: '12:00',
          textStyle: {
            fontSize: 12,
            color: '#e4e4e4'
          }
        }, {
          value: '15:00',
          textStyle: {
            fontSize: 12,
            color: '#e4e4e4'
          }
        }, {
          value: '18:00',
          textStyle: {
            fontSize: 12,
            color: '#e4e4e4'
          }
        }],
        axisPointer: {
          show: true,
          type: 'line'
        }
      },
      yAxis: {
        type: 'value',
        show: true,
        axisLabel: {
          formatter: '{value} ',
          textStyle: {
            color: "#e4e4e4"
          },

        },
        axisTick: {
          show: false,
          lineStyle: {
            color: '#999',
            opacity: .3
          }
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#999',
            opacity: .3
          }
        },
        splitLine: {
          lineStyle: {
            color: '#999',
            opacity: .3
          }
        }
      },
      series: [{

          itemStyle: {
            normal: {
              color: 'rgba(0,0,0,0)'
            }
          },

          lineStyle: {
            normal: {
              color: "#0a9573"
            }
          },

          areaStyle: {
            normal: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0,
                  color: 'rgba(86,183,206,.8)' // 0% 处的颜色
                }, {
                  offset: 1,
                  color: 'rgba(115,135,197,.9)' // 100% 处的颜色
                }],
                globalCoord: false // 缺省为 false
              },
              opacity: .2
            }
          },

          smooth: true,



          name: '拥堵量',

          type: 'line',
          data: [81, 34, 55, 152, 62],
          markPoint: {

          },
          markLine: {

          }
        }

      ]
    };

  }

  activeRankingConfig() {
    return {
      color: ['#00fff2', '#ffe747', '#049ff2', '#ff5f44', '#fdaf58'],
      title: {
        show: false,
        text: '',
        subtext: '纯属虚构',
        x: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        show: false,
        orient: 'vertical',
        left: 'left',
        data: ['四个一百', '好人榜8月', '好医生好护士', '好人榜7月', '好人榜6月']
      },
      series: [{
        name: '参与人数',
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        data: [{
          value: 71103519,
          name: '四个一百'
        }, {
          value: 18389191,
          name: '好人榜8月'
        }, {
          value: 53519628,
          name: '好医生好护士'
        }, {
          value: 28443227,
          name: '好人榜7月'
        }, {
          value: 22508727,
          name: '好人榜6月'
        }],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }]
    };



  }

  clickConfig() {

    var data = [];

    for (var i = 0; i < 7; i++) {
      data.push({
        value: this.getDateStr(i - 7),
        textStyle: {
          fontSize: 12,
          color: '#e4e4e4'
        }
      });
    }


    return {
      title: {
        show: false,
        text: '点击量趋势图',
        subtext: '',
        textStyle: {
          color: '#00fff2',
          fontWeight: 'bold'
        }
      },
      tooltip: {
        trigger: 'axis'
      },
      grid: {
        left: '3%',
        right: '0%',
        bottom: '5%',
        width: 300,
        containLabel: true
      },

      xAxis: {
        type: 'category',
        boundaryGap: false,
        nameGap: 40,
        axisLine: {
          lineStyle: {
            color: 'rgba(0,0,0,0)'
          }
        },

        minInterval: 21,
        splitLine: {
          show: true,
          lineStyle: {
            color: '#999',
            opacity: .3

          }
        },
        data,
        axisPointer: {
          show: true,
          type: 'line'
        }
      },
      yAxis: {
        type: 'value',
        show: true,
        axisLabel: {
          formatter: '{value} ',
          textStyle: {
            color: "#e4e4e4"
          },

        },
        axisTick: {
          show: false,
          lineStyle: {
            color: '#999',
            opacity: .3
          }
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#999',
            opacity: .3
          }
        },
        splitLine: {
          lineStyle: {
            color: '#999',
            opacity: .3
          }
        }
      },
      series: [{

          itemStyle: {
            normal: {
              color: 'rgba(0,0,0,0)'
            }
          },

          lineStyle: {
            normal: {
              color: "#0a9573"
            }
          },

          areaStyle: {
            normal: {
              color: "#0a9573",
              opacity: .2
            }
          },


          showAllSymbol: true,



          name: '点击量',

          type: 'line',
          data: [560241, 551586, 546852, 782425, 798082, 600485, 798522],
          markPoint: {
            data: [{
              type: 'max',
              name: '最大值'
            }, {
              type: 'min',
              name: '最小值'
            }]
          },
          markArea: {
            itemStyle: {

            }
          },
          markPoint: {
            symbol: 'circle'
          },
          markLine: {
            show: false,
            data: [{
              type: 'average',
              name: '平均值'
            }],
            lineStyle: {
              normal: {
                opacity: .5
              }
            }
          }
        }

      ],

    };

  }

  siteConfig() {

    var data = [];
    var arr = ['中国文明网', '时事报告', '党建网']
    for (var i = 0; i < 3; i++) {
      data.push({
        value: arr[i],
        textStyle: {
          fontSize: 12,
          color: '#e4e4e4'
        }
      })
    }
    return {
      color: [new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        offset: 0,
        color: 'rgba(0,245,233,1)'
      }, {
        offset: 1,
        color: 'rgba(0,245,233,.01)'
      }])],
      tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'line' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [{
        type: 'category',
        data: data,
        axisTick: {
          alignWithLabel: true
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#999',
            opacity: .3

          }
        }
      }],
      yAxis: [{
        type: 'value',
        axisLabel: {
          formatter: '{value} ',
          textStyle: {
            color: "#e4e4e4"
          },

        },
        splitLine: {
          lineStyle: {
            color: '#00fff2',
            opacity: .3
          }
        }
      }],
      series: [{
        name: '发稿量',
        type: 'bar',
        barWidth: '60%',
        data: [254, 55, 93]
      }]
    };

  }

  channelConfig() {
    var data = [];
    var arr = ['身边好人', '好人365', '中宣党建']
    for (var i = 0; i < 3; i++) {
      data.push({
        value: arr[i],
        textStyle: {
          fontSize: 12,
          color: '#e4e4e4'
        }
      })
    }
    return {
      color: [new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        offset: 0,
        color: 'rgba(242,228,105,1)'
      }, {
        offset: 1,
        color: 'rgba(242,228,105,.01)'
      }])],
      tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'line' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [{
        type: 'category',
        data: data,
        axisTick: {
          alignWithLabel: true
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#999',
            opacity: .3

          }
        }
      }],
      yAxis: [{
        type: 'value',
        axisLabel: {
          formatter: '{value} ',
          textStyle: {
            color: "#e4e4e4"
          },

        },
        splitLine: {
          lineStyle: {
            color: '#f1e369',
            opacity: .3
          }
        }
      }],
      series: [{
        name: '发稿量',
        type: 'bar',
        barWidth: '60%',
        data: [18, 12, 31]
      }]
    };
  }



  getDateStr(AddDayCount) {
    var dd = new Date();
    dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期
    //var y = dd.getFullYear(); 
    var m = dd.getMonth() + 1; //获取当前月份的日期
    m < 10 && (m = '0' + m);
    var d = dd.getDate();
    d < 10 && (d = '0' + d);
    return d + '日';
  }
}


export default PubCom(ZmitiChartApp);