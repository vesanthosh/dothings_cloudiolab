import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment'; // used to format the date from mongodb
import { deleteUpcomingTodoItem, setTodoItemAsCompleted } from '../../actions/itemActions';
import EditTodoItem from './EditTodoItem';

class TodoOverview extends Component {

    constructor(props) {
        super(props);
        this.state = {
            criticalCount: 0,
            importantCount: 0,
            normalCount: 0,
            lowCount: 0
        };
    }

    onChange() {
        console.log("Typing on search...");
    }

    onClick(categoryName) {
        this.setState({
            criticalCount: this.props.upcomingTodos.filter(data => data.category === categoryName).filter(subData => subData.priority === 'Critical').length,
            importantCount: this.props.upcomingTodos.filter(data => data.category === categoryName).filter(subData => subData.priority === 'Important').length,
            normalCount: this.props.upcomingTodos.filter(data => data.category === categoryName).filter(subData => subData.priority === 'Normal').length,
            lowCount: this.props.upcomingTodos.filter(data => data.category === categoryName).filter(subData => subData.priority === 'Low').length
        });
    }

    render() {
        const categoryList = ['Personal', 'Work Related', 'Shopping', 'Others'];
        const priorityLevels = ['Critical', 'Important', 'Normal', 'Low'];
        return (
            <div className="mb-3">
                <input className="form-control" id="myInput" type="text" placeholder="Need to change these to our UI.." />
                <br></br>
                Category
                <div className="row">
                    <div className="col-md-3">
                        <div className="col-auto my-1">
                            <div className="custom-control custom-checkbox mr-sm-2">
                                <input type="checkbox" className="custom-control-input" id="customControlAutosizing" />
                                <label className="custom-control-label" for="customControlAutosizing">Remember 1</label>
                            </div>
                            <div className="custom-control custom-checkbox mr-sm-2">
                                <input type="checkbox" className="custom-control-input" id="customControlAutosizing" />
                                <label className="custom-control-label" for="customControlAutosizing">Remember 2</label>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="col-auto my-1">
                            <div className="custom-control custom-checkbox mr-sm-2">
                                <input type="checkbox" className="custom-control-input" id="customControlAutosizing" />
                                <label className="custom-control-label" for="customControlAutosizing">Remember 3</label>
                            </div>
                            <div className="custom-control custom-checkbox mr-sm-2">
                                <input type="checkbox" className="custom-control-input" id="customControlAutosizing" />
                                <label className="custom-control-label" for="customControlAutosizing">Remember 4</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

TodoOverview.propTypes = {
};

export default connect(null, {})(TodoOverview);