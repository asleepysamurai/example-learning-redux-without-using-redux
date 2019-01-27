/**
 * Sidebar Container component
 */

import React, { Component } from 'react';

import Sidebar from './Sidebar';

class SidebarContainer extends Component {
    categorizeTodoList() {
        let { todoList = [] } = this.props;

        let completedTodoList = [];
        let partlyCompletedTodoList = [];
        let notStartedTodoList = [];

        todoList = todoList.map(todoItem => {
            const { tasks = [] } = todoItem;

            const completedTasksForThisTodoItem = tasks.filter(task => task.done);

            if (completedTasksForThisTodoItem.length === tasks.length) {
                todoItem = Object.assign({}, todoItem, { completionState: 'completed' });
                completedTodoList.push(todoItem);
            } else if (completedTasksForThisTodoItem.length === 0) {
                todoItem = Object.assign({}, todoItem, { completionState: 'notStarted' });
                notStartedTodoList.push(todoItem);
            } else {
                todoItem = Object.assign({}, todoItem, { completionState: 'partial' });
                partlyCompletedTodoList.push(todoItem);
            }

            return todoItem;
        });

        return { todoList, completedTodoList, partlyCompletedTodoList, notStartedTodoList };
    }

    render() {
        const {
            todoList,
            completedTodoList,
            partlyCompletedTodoList,
            notStartedTodoList
        } = this.categorizeTodoList();

        const component = (
            <Sidebar
                addTodo={this.props.addTodo}
                todoList={todoList}
                completedTodoList={completedTodoList}
                partlyCompletedTodoList={partlyCompletedTodoList}
                notStartedTodoList={notStartedTodoList}
                setVisibilityFilter={this.props.setVisibilityFilter}
                visibilityFilter={this.props.visibilityFilter} />
        );

        return component;
    }
};

export default SidebarContainer;
