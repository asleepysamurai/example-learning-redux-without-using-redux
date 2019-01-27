/**
 * Todo Item Component
 */

import React, { Component } from 'react';

import CheckableItem from '../CheckableItem';
import { generateID } from '../../../utils';

class TodoItem extends Component {
    static get defaultProps() {
        return {
            tasks: []
        };
    }

    onTaskChange = (taskId, fieldName, value) => {
        debugger;
        fieldName = fieldName === 'checked' ? 'done' : fieldName;

        let taskIndex = this.props.tasks.findIndex(taskItem => taskItem.id === taskId);
        taskIndex = taskIndex === -1 ? this.props.tasks.length : taskIndex;

        let task = Object.assign({}, (this.props.tasks[taskIndex] || {}), { id: taskId, [fieldName]: value });

        const tasks = [...this.props.tasks.slice(0, taskIndex), task, ...this.props.tasks.slice(taskIndex + 1)];

        const completedTasks = tasks.filter(task => task.done);
        const done = (completedTasks.length === tasks.length);

        this.props.onChange({
            tasks,
            done
        });
    }

    onTodoChange = (fieldName, value) => {
        fieldName = fieldName === 'checked' ? 'done' : fieldName;

        let tasks = this.props.tasks;

        if (fieldName === 'done') {
            tasks = this.props.tasks.map(taskItem => {
                return Object.assign({}, taskItem, { done: value });
            });
        }

        this.props.onChange({
            [fieldName]: value,
            tasks
        });
    }

    renderTaskItems() {
        if (!this.props.showTasks)
            return;

        const tasks = this.props.editable ? this.props.tasks.concat([{
            id: generateID()
        }]) : this.props.tasks;

        const taskItems = tasks.map(taskItem => {
            return (
                <CheckableItem
                    key={taskItem.id}
                    onChange={this.onTaskChange.bind(null, taskItem.id)}
                    className="task-item"
                    checked={taskItem.done}
                    checkable={!this.props.editable}
                    description={taskItem.description}
                    readOnly={taskItem.readOnly || !this.props.editable} />
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
        if (this.props.readOnly)
            return;

        return (
            <button
                onClick={this.props.onSave}>
                Save
            </button>
        );
    }

    renderEditButton() {
        if (this.props.readOnly)
            return;

        return (
            <button
                onClick={this.props.toggleEditable}>
                {this.props.editable ? 'Reset' : 'Edit'}
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
                    checked={this.props.done}
                    checkable={!this.props.readOnly}
                    description={this.props.description}
                    readOnly={this.props.readOnly || !this.props.editable} />
                {taskItems}
                {editButton}
                {saveButton}
            </div>
        );

        return component;
    }
};

export default TodoItem;
