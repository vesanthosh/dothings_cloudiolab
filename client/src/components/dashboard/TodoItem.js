import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment'; // it is used to format the date from mongodb
import { deleteTodoItem } from '../../actions/itemActions';

class TodoItem extends Component {

    onDeleteClick(id) {
        this.props.deleteTodoItem(id);
    }

    onUpdateClick(id) {
        console.log("Item can be updated.")
    }

    render() {
        const todoItem = this.props.todoItem.map(item => (
            <div className="list-group">
                <a href="#" className="list-group-item list-group-item-action flex-column align-items-start">
                    <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">{item.name}</h5>
                        <small>
                            <button className="btn btn-warning btn-sm" onClick={this.onUpdateClick.bind(this, item._id)}>
                                <i className="fa fa-edit" />
                            </button>{' '}
                            <button className="btn btn-danger btn-sm" onClick={this.onDeleteClick.bind(this, item._id)}>
                                <i className="fa fa-trash" />
                            </button>
                        </small>
                    </div>
                    <p className="mb-1">{item.description}</p>
                    <small>
                        <Moment fromNow>{item.date}</Moment>
                    </small>
                </a>
            </div>
        ));

        return (
            < div >
                <h4 className="mb-4">List of things you have to do</h4>
                {todoItem}
            </div >
        );
    }
}

TodoItem.propTypes = {
    deleteTodoItem: PropTypes.func.isRequired
};

export default connect(null, { deleteTodoItem })(TodoItem);