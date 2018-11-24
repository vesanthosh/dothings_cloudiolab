import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';
import PropTypes from 'prop-types';
import UpdateItemModal from './UpdateItemModal';

class ToDoList extends Component {

    componentDidMount() {
        this.props.getItems();
    }

    onDeleteClick = (_id) => {
        this.props.deleteItem(_id); // this id is different and it could be anything.
    }

    render() {
        const { items } = this.props.item;
        return (
            <Container>
                <ListGroup>
                    <TransitionGroup className="todo-list">
                        {items.map(({ _id, name, description }) => (
                            <CSSTransition key={_id} timeout={500} classNames="fade">
                                <ListGroupItem className="todo-content">
                                    {name} | {description}
                                    <div className="group-content">
                                        <UpdateItemModal _id={_id} name={name} description={description} />
                                        <Button
                                            className="remove-btn"
                                            color="danger"
                                            size="sm"
                                            onClick={this.onDeleteClick.bind(this, _id)}>
                                            &#10008;</Button></div>
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        );
    }
}

ToDoList.propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    item: state.item
});

export default connect(mapStateToProps, { getItems, deleteItem })(ToDoList);