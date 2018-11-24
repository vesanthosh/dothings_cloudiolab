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
import { addItem } from '../actions/itemActions';

class ItemModal extends Component {
    state = {
        modal: false,
        name: '',
        description: ''
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

        const newItem = {
            name: this.state.name,
            description: this.state.description
        };

        // Add item via addItem action
        this.props.addItem(newItem);

        // Close modal
        this.toggle();
    }

    render() {
        return (
            <div>
                <Button
                    color='success'
                    style={{ marginBottom: '1rem' }}
                    onClick={this.toggle}
                >&#10010; Add List</Button>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Add To-Do List</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="item" className="addItemModalLabel">Todo Name</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    id="item"
                                    placeholder="Name the to-do list"
                                    onChange={this.onChange}
                                />
                                <Label for="description" className="addItemModalLabel" style={{ marginTop: '1rem' }}>Description</Label>
                                <Input
                                    type="textarea"
                                    name="description"
                                    id="description"
                                    placeholder="Write something about your to-do list..."
                                    onChange={this.onChange}
                                />
                                <Button
                                    color="success"
                                    className="float-right"
                                    style={{ marginTop: '1rem' }}
                                >Add List</Button>
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

export default connect(mapStateToProps, { addItem })(ItemModal);