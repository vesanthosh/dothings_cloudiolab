import React, { Component } from 'react';
import isEmpty from '../../validation/isEmpty';

class ProfileHeader extends Component {
    render() {
        const { publicUserProfile } = this.props;
        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="card card-body bg-info text-white mb-3">
                        <div className="row">
                            <div className="col-4 col-md-3 m-auto">
                                <img className="rounded-circle" src={publicUserProfile.user.avatar} alt="" />
                            </div>
                        </div>
                        <div className="text-center">
                            <h1 className="display-4 text-center">{publicUserProfile.user.name}</h1>
                            {isEmpty(publicUserProfile.location) ? null : (<p>{publicUserProfile.location}</p>)}
                            <p>
                                {isEmpty(publicUserProfile.social && publicUserProfile.social.twitter) ? null : (
                                    <a className="text-white p-2" href={publicUserProfile.social.twitter} target="_blank" rel="noopener noreferrer">
                                        <i className="fab fa-twitter fa-2x"></i>
                                    </a>
                                )}
                                {isEmpty(publicUserProfile.social && publicUserProfile.social.facebook) ? null : (
                                    <a className="text-white p-2" href={publicUserProfile.social.facebook} target="_blank" rel="noopener noreferrer">
                                        <i className="fab fa-facebook fa-2x"></i>
                                    </a>
                                )}
                                {isEmpty(publicUserProfile.social && publicUserProfile.social.linkedin) ? null : (
                                    <a className="text-white p-2" href={publicUserProfile.social.linkedin} target="_blank" rel="noopener noreferrer">
                                        <i className="fab fa-linkedin fa-2x"></i>
                                    </a>
                                )}
                                {isEmpty(publicUserProfile.social && publicUserProfile.social.instagram) ? null : (
                                    <a className="text-white p-2" href={publicUserProfile.social.instagram} target="_blank" rel="noopener noreferrer">
                                        <i className="fab fa-instagram fa-2x"></i>
                                    </a>
                                )}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProfileHeader;