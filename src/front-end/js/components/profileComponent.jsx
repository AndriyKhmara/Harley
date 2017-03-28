import React, { PropTypes } from 'react';
import {FormGroup, ControlLabel, FormControl, Radio, Button, ButtonGroup, Modal, Tabs, Tab} from "react-bootstrap";

const UserProfile = ({ secretData, user }) => (
    <div className="container">
        {secretData &&
            <div>
                <h2 style={{ fontSize: '16px', color: 'green' }}>Hi {user}</h2>
                <div>
                    {secretData}
                </div>
                <a href="/logout">Log out</a>
            </div>
        }
    </div>
);

UserProfile.propTypes = {
    secretData: PropTypes.string.isRequired
};

export default UserProfile;