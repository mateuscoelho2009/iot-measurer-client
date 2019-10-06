import React from 'react';
import UserMenu from '../components/UserMenu';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

function Measurement(props) {
    const {
        match: {
            params: {
                id,
            },
        },
        username,
        history,
    } = props;

    if (!username) {
        history.push('/');
    }

    return (
        <>
            <UserMenu />
            Measurement {id}
        </>
    );
}

const mapStateToProps = store => ({
    username: store.userState.username,
});

export default withRouter(connect(mapStateToProps)(Measurement));
