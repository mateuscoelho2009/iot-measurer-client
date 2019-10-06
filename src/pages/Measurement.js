import React from 'react';
import UserMenu from '../components/UserMenu';
import { UserProvider } from '../contexts/UserContext';

function Measurement(props) {
    const {
        match: {
            params: {
                id,
            },
        },
    } = props;

    return (
        <UserProvider>
            {id}
            <UserMenu />
        </UserProvider>
    );
}

export default Measurement;
