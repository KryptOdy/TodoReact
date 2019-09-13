import React, { Component } from 'react';

import Task from './Task';
import ValidDate from './validDate'
import HashHelper from './HashHelper'
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.currentDateString = ValidDate.getDefaultCurrentDateString();
    this.state = {
      newTask: {
        name: "",
        date: this.currentDateString,
        id: ""
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

    let newId = HashHelper(this.state.newTask.name, this.state.newTask.date);

    const newTask = {
      name: this.state.newTask.name,
      date: this.state.newTask.date,
      id: newId
    };

    this.setState({
      newTask: {
        name: "",
        date: this.currentDateString,
        id: ""
      },

      tasks: this.state.tasks.concat(newTask)
    })
  }

  handleDelete(taskId) {
    let newTasks = this.state.tasks.filter(task => task.id != taskId);
    this.setState(
      prevState => ({
        tasks: newTasks
      })
    )
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
          {/*key = {i} is undefined because map is asynchronous so you're not even setting the key at the right time*/}
          {this.state.tasks.map((task) => <Task name={task.name} id = {task.id} date={task.date} delete={(id) => this.handleDelete(id)}/>)}
        </React.Fragment>
    );

  }
}

export default App;
