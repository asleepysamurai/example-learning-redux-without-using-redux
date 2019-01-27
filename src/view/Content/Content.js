/**
 * Content Component
 */

import React, { Component } from 'react';

import TodoItem from '../_shared/TodoItem';

class Content extends Component {
    onTodoChange(fieldName) {
        return (ev) => {
            const { value } = ev.currentTarget;

            const todo = Object.assign({}, this.props.todo, {
                [fieldName]: value
            });

            this.props.onTodoChange({ todo });
        };
    }

    render() {
        const component = (
            <div
                className="content-container">
                <TodoItem
                    onSave={this.props.saveTodo}
                    {...this.props.todo}
                    showTasks={true}
                    editable={this.props.editable}
                    onChange={this.props.onTodoChange} />
            </div>
        );

        return component;
    }
};

export default Content;
