import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment'; // used to format the date from mongodb
import { deleteCompletedTodoItem } from '../../actions/itemActions';

class CompletedTodoItem extends Component {

    onDeleteClick(id) {
        this.props.deleteCompletedTodoItem(id);
    }

    render() {
        const completedTodos = this.props.completedTodos.map(completedTodos => ( // TODO: Found profile problems and need to resolve this. till so far not problem
            <div key={completedTodos._id} className="list-group">
                <a href="#/" className="list-group-item list-group-item-action flex-column align-items-start">
                    <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id={completedTodos._id} />
                                <label className="custom-control-label" htmlFor={completedTodos._id}><del>{completedTodos.name}</del></label>
                            </div>
                        </h5>
                        <small>
                            <div className="row">
                                <div className="col-md-6">
                                    <button className="btn btn-danger btn-sm custom-button-width" onClick={this.onDeleteClick.bind(this, completedTodos._id)}>
                                        <i className="fa fa-trash" />
                                    </button>
                                </div>
                            </div>
                        </small>
                    </div>
                    <p className="mb-1"><del>{completedTodos.description}</del></p>
                    <small>
                        <Moment fromNow>{completedTodos.date}</Moment>
                    </small>
                </a>
            </div >
        ));

        return (
            <div className="mb-4">
                <h4>Tasks Completed</h4>
                <p className="mb-1">You have no upcoming tasks to do.</p>
                {completedTodos}
            </div>
        );
    }
}

CompletedTodoItem.propTypes = {
    deleteCompletedTodoItem: PropTypes.func.isRequired
};

export default connect(null, { deleteCompletedTodoItem })(CompletedTodoItem);