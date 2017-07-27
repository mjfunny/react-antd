import React from 'react';
import { Button } from 'antd';
import ReactDOM from 'react-dom';

class MyComponent extends React.Component {
  render() {
    return <div className="app">Hello webpack</div>;
  }
}

ReactDOM.render(<MyComponent />, document.getElementById('root'));
