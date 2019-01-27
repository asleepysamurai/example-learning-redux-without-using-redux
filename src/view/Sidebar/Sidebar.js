/**
 * Sidebar component
 */

import React, { Component } from 'react';

import './Sidebar.scss';
import TodoList from '../_shared/TodoList';

const headerPrefixByVisibilityFilter = {
    all: 'All',
    none: 'Not Started',
    partial: 'Partly Completed',
    done: 'Completed'
};

class Sidebar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visibilityFilter: 'all'
        };
    }

    setVisibilityFilter(filter) {
        return (ev) => {
            this.setState({ visibilityFilter: filter });
        };
    }

    renderHeader() {
        const component = (
            <div
                className="header">
                <span>{headerPrefixByVisibilityFilter[this.state.visibilityFilter]} Todos </span>
                <button
                    onClick={this.props.addTodo}>
                    Add Todo
                </button>
            </div>
        );

        return component;
    }

    renderFooter() {
        const component = (
            <div
                className="footer">
                <span>Show todos: </span>
                <button
                    onClick={this.setVisibilityFilter('all')} >
                    All
                </button>
                <button
                    onClick={this.setVisibilityFilter('none')} >
                    Not Started
                </button>
                <button
                    onClick={this.setVisibilityFilter('partial')} >
                    Partly Done
                </button>
                <button
                    onClick={this.setVisibilityFilter('done')} >
                    Completed
                </button>
            </div>
        );

        return component;
    }

    renderTodoList() {
        let todoListItems;

        if (this.state.visibilityFilter === 'all')
            todoListItems = this.props.todoList;
        else if (this.state.visibilityFilter === 'none')
            todoListItems = this.props.notStartedTodoList;
        else if (this.state.visibilityFilter === 'partial')
            todoListItems = this.props.partlyCompletedTodoList;
        else if (this.state.visibilityFilter === 'done')
            todoListItems = this.props.completedTodoList;

        const component = (
            <TodoList
                readOnly={true}
                openTodo={this.props.openTodo}
                todoList={todoListItems} />
        );

        return component;
    }

    render() {
        const header = this.renderHeader();
        const footer = this.renderFooter();
        const todoList = this.renderTodoList();

        const component = (
            <div
                className="sidebar">
                {header}
                {todoList}
                {footer}
            </div>
        );

        return component;
    }
};

export default Sidebar;
