import React, { Component, useState, useEffect } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import './style.css';

interface AppProps {}
interface AppState {
  name: string;
}

type TaskURL = '/big-task' | '/small-task';

const Child = ({ setCallbackOnTaskCreated }) => {
  const [taskURL, setTaskURL] = useState<TaskURL>('/big-task');

  // log as simulation for history.push(redirectionRoute)
  const onTaskCreated = () => console.log('redirectionRoute:', taskURL);

  useEffect(() => {
    setCallbackOnTaskCreated(onTaskCreated);
  }, []);
  return (
    <div style={{ borderStyle: 'solid', margin: '5px', padding: '5px' }}>
      current Task URL: {taskURL}
      <button
        onClick={() =>
          setTaskURL(taskURL === '/big-task' ? '/small-task' : '/big-task')
        }
      >
        toggle task type
      </button>
    </div>
  );
};

class App extends Component<AppProps, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      name: 'React',
      onTaskCreated: null,
    };
  }
  setCallbackOnTaskCreated = (callback: any) =>
    this.setState({ onTaskCreated: callback });
  createTask = () => {
    const { onTaskCreated } = this.state;
    if (onTaskCreated instanceof Function) onTaskCreated();
  };

  render() {
    const { onTaskCreated } = this.state;
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        This is parent
        <button onClick={this.createTask}>create task</button>
        <div>onTaskCreated: {JSON.stringify(onTaskCreated)}</div>
        <div>
          This is Child.
          <Child setCallbackOnTaskCreated={this.setCallbackOnTaskCreated} />
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
