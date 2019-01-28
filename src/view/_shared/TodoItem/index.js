/**
 * Todo Item Component
 */

import React, { Component } from 'react';

import CheckableItem from '../CheckableItem';
import { generateID } from '../../../utils';
import { store, getContextItem } from '../../../state/store';

class TodoItem extends Component {
    static get defaultProps() {
        return {
            tasks: []
        };
    }

    onTaskChange = (taskId, fieldName, value) => {
        store.dispatch({ type: 'taskChange', taskId, fieldName, value });
    }

    onTodoChange = (fieldName, value) => {
        store.dispatch({ type: 'todoChange', fieldName, value });
    }

    renderTaskItems() {
        if (!this.props.showTasks)
            return;

        const editable = getContextItem('expandedTodoEditable');

        const tasks = editable ? this.props.tasks.concat([{
            id: generateID()
        }]) : this.props.tasks;

        const taskItems = tasks.map(taskItem => {
            return (
                <CheckableItem
                    key={taskItem.id}
                    onChange={this.onTaskChange.bind(null, taskItem.id)}
                    className="task-item"
                    checked={taskItem.done}
                    checkable={!editable}
                    description={taskItem.description}
                    readOnly={taskItem.readOnly || !editable} />
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
                onClick={getContextItem('saveTodo')}>
                Save
            </button>
        );
    }

    renderEditButton() {
        if (this.props.readOnly)
            return;

        return (
            <button
                onClick={getContextItem('toggleEditable')}>
                {getContextItem('expandedTodoEditable') ? 'Reset' : 'Edit'}
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
                    readOnly={this.props.readOnly || !getContextItem('expandedTodoEditable')} />
                {taskItems}
                {editButton}
                {saveButton}
            </div>
        );

        return component;
    }
};

export default TodoItem;
