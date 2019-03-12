import React, { Component } from 'react';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Modal, ModalHeader } from 'reactstrap';
import { editUpcomingTodoItem } from '../../actions/itemActions';

class EditTodoItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            _id: this.props._id,
            name: this.props.name,
            description: this.props.description,
            isCompleted: this.props.isCompleted,
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

    onSubmit(e) {
        e.preventDefault();

        const newItemData = {
            name: this.state.name,
            description: this.state.description,
            isCompleted: this.state.isCompleted
        };
        this.props.editUpcomingTodoItem(this.state._id, newItemData);
        // Close modal
        this.toggle();
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const { errors } = this.state;

        return (
            <div className="add-todo-item">
                <button type="button" className="btn btn-warning btn-sm" onClick={this.toggle}>
                    <i className="fa fa-edit" />
                </button>
                <Modal isOpen={this.state.modal}>
                    <ModalHeader toggle={this.toggle}>Edit Todo Item</ModalHeader>
                    <div className="modal-body">
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
                            <input type="submit" value="Submit" className="btn btn-info float-right" />
                        </form>
                    </div>
                </Modal>
            </div >
        );
    }
}

EditTodoItem.propTypes = {
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    errors: state.errors
});

export default connect(mapStateToProps, { editUpcomingTodoItem })(EditTodoItem);