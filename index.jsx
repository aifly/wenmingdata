import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory ,Link ,browserHistory } from 'react-router';
import ZmitiIndexApp from './index/index.jsx';
import ZmitiChartApp from './chart/index.jsx';

import $ from 'jquery';

class App extends React.Component{
  constructor(args) {
    super(...args);
    this.state = {
    }
  }
  render() {
    var apps = [
        {path: '/', app: ZmitiIndexApp},
        {path: '/chart', app: ZmitiChartApp},
    ];
    return (
      <Router history={hashHistory}>
        {apps.map((app, i) => {
          return <Route key={i} path={app.path} component={app.app}/>
        })}
      </Router>
      )
  }

  

  componentWillMount(){
    
  }
  
  componentDidMount() {

  }
}


ReactDOM.render(<App></App>, document.getElementById('fly-main-ui'));
