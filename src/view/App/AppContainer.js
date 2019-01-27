/**
 * App Root Container Component
 */

import React, { Component } from 'react';

import './AppContainer.scss';

import Sidebar from '../Sidebar';
import Content from '../Content';
import { generateID } from '../../utils';
import { transitionState, getState, onStateTransition } from '../../state/store';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = getState();

        onStateTransition((newState) => {
            this.setState(newState);
        });
    }

    addTodo = () => {
        const newState = transitionState('addTodo', { id: generateID() });
        this.setState(newState);
    }

    saveTodo = () => {
        const newState = transitionState('saveExpandedTodo');
        this.setState(newState);
    }

    setVisibilityFilter = (visibilityFilter) => {
        const newState = transitionState('setVisibilityFilter', { visibilityFilter });
        this.setState(newState);
    }

    toggleEditable = () => {
        const newState = transitionState('toggleEditable');
        this.setState(newState);
    }

    renderExpandedTodo() {
        if (!this.state.expandedTodo)
            return null;

        return (
            <Content
                todo={this.state.expandedTodo}
                editable={this.state.expandedTodoEditable}
                saveTodo={this.saveTodo}
                toggleEditable={this.toggleEditable} />
        );
    }

    render() {
        const expandedTodo = this.renderExpandedTodo();

        const component = (
            <div
                className="app-container">
                <Sidebar
                    todoList={this.state.todoList}
                    addTodo={this.addTodo}
                    setVisibilityFilter={this.setVisibilityFilter}
                    visibilityFilter={this.state.visibilityFilter} />
                {expandedTodo}
            </div>
        );

        return component;
    }
};

export default App;
