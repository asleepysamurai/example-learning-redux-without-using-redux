/**
 * App Root Container Component
 */

import React, { Component } from 'react';

import './AppContainer.scss';

import Sidebar from '../Sidebar';
import Content from '../Content';
import { generateID } from '../../utils';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            todoList: []
        };
    }

    addTodo = () => {
        this.setState({
            expandedTodo: {
                id: generateID()
            },
            expandedTodoEditable: true
        });
    }

    saveTodo = (todo) => {
        let todoIndex = this.state.todoList.findIndex(todoItem => todoItem.id === todo.id);
        todoIndex = todoIndex === -1 ? this.state.todoList.length : todoIndex;

        const todoList = [...this.state.todoList.slice(0, todoIndex), todo, ...this.state.todoList.slice(todoIndex + 1)];
        this.setState({
            todoList,
            expandedTodo: todo,
            expandedTodoEditable: false
        });
    }

    openTodo = (todo) => {
        this.setState({ expandedTodo: todo, expandedTodoEditable: false });
    }

    renderExpandedTodo() {
        if (!this.state.expandedTodo)
            return null;

        return (
            <Content
                todo={this.state.expandedTodo}
                editable={this.state.expandedTodoEditable}
                saveTodo={this.saveTodo} />
        );
    }

    render() {
        const expandedTodo = this.renderExpandedTodo();

        const component = (
            <div
                className="app-container">
                <Sidebar
                    todoList={this.state.todoList}
                    openTodo={this.openTodo}
                    addTodo={this.addTodo} />
                {expandedTodo}
            </div>
        );

        return component;
    }
};

export default App;
