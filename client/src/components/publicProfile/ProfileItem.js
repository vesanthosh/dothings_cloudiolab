import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import isEmpty from '../../validation/isEmpty';

class ProfileItem extends Component {
    render() {
        const { publicProfiles } = this.props; // This publicProfiles comes from PublicProfile.js as a parameter.

        return (
            <div className="card card-body bg-light mb-3">
                <div className="row">
                    <div className="col-2">
                        <img src={publicProfiles.user.avatar} alt="" className="rounded-circle" />
                    </div>
                    <div className="col-lg-6 col-md-4 col-8">
                        <h3>{publicProfiles.user.name}</h3>
                        <p>
                            {isEmpty(publicProfiles.location) ? null : (<span>{publicProfiles.location}</span>)}
                        </p>
                        <Link to={`/profile/${publicProfiles.handle}`} className="btn btn-info">View Profile</Link>
                    </div>
                </div>
            </div >
        );
    }
}

ProfileItem.propTypes = {
    publicProfiles: PropTypes.object.isRequired
};

export default ProfileItem;