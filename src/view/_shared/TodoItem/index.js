/**
 * Todo Item Component
 */

import React, { Component } from 'react';

import CheckableItem from '../CheckableItem';
import { generateID } from '../../../utils';

class TodoItem extends Component {
    constructor(props) {
        super(props);

        this.state = this.getStateFromProps(props);
    }

    componentWillReceiveProps(nextProps) {
        this.setState(this.getStateFromProps(nextProps));
    }

    getStateFromProps(props) {
        const { description, tasks = [], done, id, readOnly, editable } = props;
        return {
            description,
            tasks,
            done,
            id,
            readOnly,
            editable
        };
    }

    onTaskChange(taskId) {
        return (fieldName, value) => {
            fieldName = fieldName === 'checked' ? 'done' : fieldName;

            let taskIndex = this.state.tasks.findIndex(taskItem => taskItem.id === taskId);
            taskIndex = taskIndex === -1 ? this.state.tasks.length : taskIndex;

            let task = Object.assign({}, (this.state.tasks[taskIndex] || {}), { id: taskId, [fieldName]: value });

            const tasks = [...this.state.tasks.slice(0, taskIndex), task, ...this.state.tasks.slice(taskIndex + 1)];
            this.setState({
                tasks
            });
        }
    }

    onTodoSave = () => {
        const { description, id, tasks } = this.state;

        const completedTasks = tasks.filter(task => task.done);
        const done = completedTasks.length == tasks.length;

        this.props.onSave({ description, id, done, tasks });
    }

    onTodoChange = (fieldName, value) => {
        fieldName = fieldName === 'checked' ? 'done' : fieldName;

        this.setState({
            [fieldName]: value
        });
    }

    toggleEditable = () => {
        this.setState({ editable: !this.state.editable });
    }

    renderTaskItems() {
        debugger;
        if (!this.props.showTasks)
            return;

        const tasks = this.state.editable ? this.state.tasks.concat([{
            id: generateID()
        }]) : this.state.tasks;

        const taskItems = tasks.map(taskItem => {
            return (
                <CheckableItem
                    key={taskItem.id}
                    onChange={this.onTaskChange(taskItem.id)}
                    className="task-item"
                    checked={taskItem.done}
                    checkable={!this.state.readOnly && !this.state.editable}
                    description={taskItem.description}
                    readOnly={taskItem.readOnly || !this.state.editable} />
            );
        });

        return (
            <div
                className="task-list">
                <div
                    className="caption">
                    Tasks
                </div>
                {taskItems}
            </div>
        );
    }

    renderSaveButton() {
        if (this.state.readOnly)
            return;

        return (
            <button
                onClick={this.onTodoSave}>
                Save
            </button>
        );
    }

    renderEditButton() {
        if (this.state.readOnly)
            return;

        return (
            <button
                onClick={this.toggleEditable}>
                {this.state.editable ? 'Reset' : 'Edit'}
            </button>
        );
    }

    render() {
        const taskItems = this.renderTaskItems();
        const saveButton = this.renderSaveButton();
        const editButton = this.renderEditButton();

        const component = (
            <div
                className="todo-item">
                <CheckableItem
                    className="header"
                    onChange={this.onTodoChange}
                    onClick={this.props.onClick}
                    checked={this.state.done}
                    checkable={false}
                    description={this.state.description}
                    readOnly={this.state.readOnly || !this.state.editable} />
                {taskItems}
                {editButton}
                {saveButton}
            </div>
        );

        return component;
    }
};

export default TodoItem;
