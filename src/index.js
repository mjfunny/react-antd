import React from 'react';
import { Button, Input } from 'antd';
import ReactDOM from 'react-dom';

class MyComponent extends React.Component {
  render() {
    return <div className="app test">
      <Button type="primary">按钮009</Button>
      <Input />
      </div>;
  }
}

ReactDOM.render(<MyComponent />, document.getElementById('root'));
