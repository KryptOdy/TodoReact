import React from 'react';

class Task extends React.Component {
    render() {
        return (
            <div>
                <h1>{this.props.name}</h1>
                <h5>Due Date: Tomorrow</h5>
            </div>
        );
    }
}

export default Task;