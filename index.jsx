import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory ,Link ,browserHistory } from 'react-router';
import ZmitiIndexApp from './index/index.jsx';
import ZmitiMapApp from './map/index.jsx';

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
        {path: '/map', app: ZmitiMapApp},
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
