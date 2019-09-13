import React from 'react';

class Task extends React.Component {
    render() {
        return (
            <div>
                <h1>{this.props.name}</h1>
                <h5>Due Date: {this.props.date}</h5>
                <button onClick={() => this.props.delete(this.props.id)}>Delete Task</button>
            </div>
        );
    }
}

export default Task;
