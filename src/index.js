import React from 'react';
import { Button } from 'antd';
import ReactDOM from 'react-dom';
import './index.less';
import './app.css';

class MyComponent extends React.Component {
  render() {
    return <div className="app test">Hello webpack</div>;
  }
}

ReactDOM.render(<MyComponent />, document.getElementById('root'));
