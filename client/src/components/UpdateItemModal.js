import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { updateItem } from '../actions/itemActions';

class UpdateItemModal extends Component {
    state = {
        modal: false,
        _id: this.props._id, // this.props._id can be anything and its just name that holds "_id" value.
        name: this.props.name,
        description: this.props.description
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();

        // // Update item via updateItem action
        this.props.updateItem(this.state);

        // Close modal
        this.toggle();
    }

    render() {
        return (
            <div>
                <Button
                    className="update-btn"
                    color="warning"
                    size="sm"
                    onClick={this.toggle}
                >&#10002;</Button>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Edit To-Do Item</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="item">Item</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    id="item"
                                    value={this.state.name}
                                    placeholder="Edit To-Do Item"
                                    onChange={this.onChange}
                                />
                                <Label for="description" style={{ marginTop: '1rem' }}>Description</Label>
                                <Input
                                    type="textarea"
                                    name="description"
                                    id="description"
                                    value={this.state.description}
                                    placeholder="Write something about your to-do list..."
                                    onChange={this.onChange}
                                />
                                <Button
                                    color="warning"
                                    className="float-right"
                                    style={{ marginTop: '1rem' }}
                                >Update Item</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    item: state.item
});

export default connect(mapStateToProps, { updateItem })(UpdateItemModal);