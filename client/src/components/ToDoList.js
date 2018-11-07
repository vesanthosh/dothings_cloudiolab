import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import uuid from 'uuid';

class ToDoList extends Component {
    state = {
        items: [
            { id: uuid(), name: 'Iphone', description: 'My first iphone.'},
            { id: uuid(), name: 'Samsung', description: 'My second iphone.'},
            { id: uuid(), name: 'Nokia', description: 'My thirs iphone.'}
        ]
    }

    render() {
        const { items } = this.state;
        return(
            <Container>
                <Button 
                color = "dark" 
                style = {{marginBottom: '2rem'}} 
                onClick = {() => {
                    const name = prompt('Enter Item');
                    if(name) {
                        this.setState(state => ({
                            items: [...state.items, { id: uuid(), name, description: 'Testing' }]
                        }));
                    }}}>Add Item</Button>
                    {/* <ListGroup>
                        <TransitionGroup className="todo-list">
                        {items.map(({ id, name, description}) => (
                            <CSSTransition key={id} timeout={500} classNames="fade">
                            <ListGroupItem>
                            <Button
                            className="remove-btn"
                            color="danger"
                            size="sm"
                            onClick={() => {
                                this.setState(state => ({
                                    items: state.items.filter(item => item.id !== id)
                                }));
                            }}>
                            &times;</Button>
                            {name}</ListGroupItem>
                            </CSSTransition>
                        ))}
                        </TransitionGroup>
                    </ListGroup> */}
                    
            </Container>
        );
    }
}

export default ToDoList;