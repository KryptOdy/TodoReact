import React, { Component } from 'react';

import Task from './Task';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      newTask: "",
      tasks: []
    };
  }

  handleChange(e) {
    this.setState({
      newTask: e.target.value
    })
  }

  addTask(e) {
    e.preventDefault();
    e.stopPropagation();

    if (!this.state.newTask) {
      return;
    }

    const newTask = {
      name: this.state.newTask
    };

    this.setState({
      newTask: "",
      tasks: this.state.tasks.concat(newTask)
    })
  }


  render() {
    return (
      <React.Fragment>

        <form onSubmit={(e) => this.addTask(e)}>
          <input onChange={(e) => this.handleChange(e)} value={this.state.newTask}/>
          <button type="submit">
            Submit
          </button>
        </form>


        {this.state.tasks.map( (task, i) => <Task key={i} name={task.name} />)}
      </React.Fragment>
    );

  }
}

export default App;
