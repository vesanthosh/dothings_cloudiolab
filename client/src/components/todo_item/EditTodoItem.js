import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { editTodoItem, getSingleTodoItem } from '../../actions/itemActions'; // TODO: create editTodoItem in itemActions.js

class EditTodoItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        this.props.getSingleTodoItem("5c65b07f38be4732f8b8ba8e");
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }

        if (nextProps.item.item) {
            const item = nextProps.item.item;
            // Set component fields state
            this.setState({
                name: item.name,
                description: item.description
            });
        }
    }

    onSubmit(e) {
        e.preventDefault();

        const newItemData = {
            name: this.state.name,
            description: this.state.description
        };
        this.props.editTodoItem(newItemData, this.props.history); // if you want to redirect, you need to pass this history in your action
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const { errors } = this.state;

        return (
            <div className="add-todo-item">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to="/dashboard" className="btn btn-light">Go Back</Link>
                            <h1 className="display-4 text-center">Edit Todo Item</h1>
                            <p className="lead text-center">Modify anything that you want to do.</p>
                            <small className="d-block pb-3">* = required fields</small>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    placeholder="* Todo Item Name"
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.onChange}
                                    error={errors.name}
                                />
                                <TextAreaFieldGroup
                                    placeholder="Description"
                                    name="description"
                                    value={this.state.description}
                                    onChange={this.onChange}
                                    error={errors.description}
                                />
                                <input type="submit" value="Submit" className="btn btn-info btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

EditTodoItem.propTypes = {
    getSingleTodoItem: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    item: state.item,
    errors: state.errors
});

export default connect(mapStateToProps, { getSingleTodoItem })(withRouter(EditTodoItem));