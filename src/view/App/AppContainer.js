/**
 * App Root Container Component
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import './AppContainer.scss';

import Sidebar from '../Sidebar';
import Content from '../Content';
import { actionCreators } from '../../state/store';

class App extends Component {
    setVisibilityFilter = (visibilityFilter) => {
        this.props.setVisibilityFilter(visibilityFilter);
    }

    toggleEditable = () => {
        this.props.toggleEditable();
    }

    renderExpandedTodo() {
        if (!this.props.expandedTodo)
            return null;

        return (
            <Content
                todo={this.props.expandedTodo} />
        );
    }

    render() {
        const expandedTodo = this.renderExpandedTodo();

        const component = (
            <div
                className="app-container">
                <Sidebar
                    todoList={this.props.todoList} />
                {expandedTodo}
            </div>
        );

        return component;
    }
};

const { setVisibilityFilter, toggleEditable } = actionCreators;
const mapDispatchToProps = { setVisibilityFilter, toggleEditable };

const mapStateToProps = (state) => {
    const { expandedTodo, todoList } = state;
    return { expandedTodo, todoList };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
