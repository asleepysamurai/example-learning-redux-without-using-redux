/**
 * CheckableItem Component
 */

import React, { Component } from 'react';

class CheckableItem extends Component {
    toggleChecked = () => {
        this.props.onChange('checked', !this.props.checked);
    }

    onChange(fieldName) {
        return (ev) => {
            const { value } = ev.currentTarget;
            this.props.onChange(fieldName, value);
        };
    }

    renderDescription() {
        if (this.props.readOnly) {
            return (
                <span
                    className="description">
                    {this.props.description}
                </span>
            );
        } else {
            return (
                <textarea
                    className="description"
                    onChange={this.onChange('description')}
                    placeholder={this.props.placeholder || ''}
                    value={this.props.description || ''} />
            );
        }
    }

    render() {
        const description = this.renderDescription();

        const component = (
            <div
                onClick={this.props.onClick}
                className={this.props.className || ''}>
                <input
                    type="checkbox"
                    onChange={this.toggleChecked}
                    disabled={!this.props.checkable}
                    checked={this.props.checked || false} />
                {description}
            </div>
        );

        return component;
    }
};

export default CheckableItem;
