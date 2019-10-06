import React from 'react';
import UserMenu from '../components/UserMenu';
import { connect } from 'react-redux';

function Measurement(props) {
    const {
        match: {
            params: {
                id,
            },
        },
        userId,
    } = props;

    return (
        <>
            <UserMenu />
            Measurement {id}
        </>
    );
}

const mapStateToProps = store => ({
    userId: store.userState.userId,
});

export default connect(mapStateToProps)(Measurement);
