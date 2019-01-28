/**
 * Todo list component
 */

import React, { Component } from 'react';

import TodoItem from '../TodoItem';
import { store } from '../../../state/store';

class TodoList extends Component {
    openTodo = (todo) => {
        store.dispatch({ type: 'setExpandedTodo', todo });
    }

    renderTodoListChildren() {
        if (this.props.todoList.length === 0) {
            return (
                <div
                    className="message">
                    No Todos Added Yet.
                </div>
            );
        }

        const todoItems = (this.props.todoList).map(todoItem => {
            console.log(this.props.readOnly);
            return (
                <TodoItem
                    key={todoItem.id}
                    {...todoItem}
                    onClick={this.openTodo.bind(null, todoItem)}
                    readOnly={true}
                />
            );
        });

        return todoItems;
    }

    render() {
        const todoListChildren = this.renderTodoListChildren();

        const component = (
            <div
                className="todo-list">
                {todoListChildren}
            </div>
        );

        return component;
    }
};

export default TodoList;
