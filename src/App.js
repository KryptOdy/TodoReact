import React, { Component } from 'react';

import Task from './Task';
import ValidDate from './validDate'
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.currentDateString = ValidDate.getDefaultCurrentDateString();
    this.state = {
      newTask: {
        name: "",
        date: this.currentDateString
      },
      tasks: []
    };
  }

  handleTaskNameChange(e) {
    this.setState({
      newTask: {name: e.target.value, date: this.state.newTask.date}
    })
  }

  handleTaskDateNameChange(e) {
    // alert("boing")
    this.setState({
      newTask: {name: this.state.newTask.name, date: e.target.value}
    })
  }

  isValidDate(dateString) {
    if (!ValidDate.validDateRegex(dateString)) {
      alert('Cannot parse Invalid Date String');
      return false;
    }
    let valid = new ValidDate(dateString);
    if (!valid.isValidDate()) {
      alert('Cannot parse Invalid Date String: Date is in the past');
      return false;
    }
    return true;
  }

  addTask(e) {
    e.preventDefault();
    e.stopPropagation();

    if (!this.state.newTask) {
      return;
    }

    if (this.state.newTask.name === "") {
      return;
    }

    if (!this.isValidDate(this.state.newTask.date)) {
      return;
    }

    const newTask = {
      name: this.state.newTask.name,
      date: this.state.newTask.date
    };

    this.setState({
      newTask: {
        name: "",
        date: this.currentDateString
      },

      tasks: this.state.tasks.concat(newTask)
    })
  }

  render() {
    return (
        <React.Fragment>
          <h1> Your TODO list </h1>
          <form onSubmit={(e) => this.addTask(e)}>
            {"Add a new Task: "}
            <input onChange={(e) => this.handleTaskNameChange(e)} value={this.state.newTask.name}/>

            <br></br>
            {"Add a new Date: dd/mm/yyyy "}
            <input onChange={(e) => this.handleTaskDateNameChange(e)} value={this.state.newTask.date} placeholder={this.currentDateString}/>

            <button type="submit">
              Submit
            </button>
          </form>

          {this.state.tasks.map((task, i) => <Task key={i} name={task.name} date={task.date}/>)}
        </React.Fragment>
      // </div>
    );

  }
}

export default App;
