/**
 * Todo Item Component
 */

import React, { Component } from 'react';

import CheckableItem from '../CheckableItem';
import { generateID } from '../../../utils';
import { transitionState } from '../../../state/store';

class TodoItem extends Component {
    static get defaultProps() {
        return {
            tasks: []
        };
    }

    onTaskChange = (taskId, fieldName, value) => {
        transitionState('taskChange', { taskId, fieldName, value });
    }

    onTodoChange = (fieldName, value) => {
        transitionState('todoChange', { fieldName, value });
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
