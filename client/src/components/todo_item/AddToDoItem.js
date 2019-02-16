import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addTodoItem } from '../../actions/itemActions';
import { Modal, ModalHeader } from 'reactstrap';

class AddToDoItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            name: '',
            description: '',
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    onSubmit(e) {
        e.preventDefault();

        const itemData = {
            name: this.state.name,
            description: this.state.description
        };
        this.props.addTodoItem(itemData);
        // TODO: Before close we have to clear the state and prevent closing the modal with error message
        this.toggle();
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const { errors } = this.state;

        return (
            <div className="add-todo-item">
                <button type="button" className="btn btn-primary btn-success" onClick={this.toggle}>
                    <i className="fas fa-plus" />{' '}Add Item
                </button>
                <Modal isOpen={this.state.modal}>
                    <ModalHeader toggle={this.toggle}>Add Todo Item</ModalHeader>
                    <div className="modal-body">
                            <p className="lead text-center">Add anything that you want to do.</p>
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
                            <input type="submit" value="Submit" className="btn btn-info float-right" />
                            </form>
                        </div>
                </Modal>
            </div >
        );
    }
}

AddToDoItem.propTypes = {
    addTodoItem: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
});

export default connect(mapStateToProps, { addTodoItem })(withRouter(AddToDoItem));