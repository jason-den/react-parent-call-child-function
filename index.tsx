import React, { Component, useState, useEffect } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import './style.css';

interface AppProps {}
interface AppState {
  name: string;
}

type TaskURL = { url: '/big-task' } | { url: '/small-task' };

const Child = ({ setCallbackOnTaskCreated }) => {
  const [taskURL, setTaskURL] = useState<TaskURL>({ url: '/big-task' });

  // log as simulation for history.push(redirectionRoute)
  const onTaskCreated = () => console.log('redirectionRoute:', taskURL);

  useEffect(() => {
    setCallbackOnTaskCreated(onTaskCreated);
  }, []);

  return (
    <div style={{ borderStyle: 'solid', margin: '5px', padding: '5px' }}>
      current Task URL: {taskURL.url}
      <button
        onClick={() =>
          setTaskURL(
            taskURL.url === '/big-task'
              ? { url: '/small-task' }
              : { url: '/big-task' }
          )
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
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        This is parent
        <button onClick={this.createTask}>create task</button>
        <div>
          This is Child.
          <Child setCallbackOnTaskCreated={this.setCallbackOnTaskCreated} />
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
